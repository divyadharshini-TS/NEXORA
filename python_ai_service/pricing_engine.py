"""
NEXORA-AI — Dynamic Pricing & Budget Recommendation Engine
Module 4 Implementation
Calculates:
- Cost-plus, competitor benchmark, and demand-elasticity pricing
- Unit economics (Cost per customer / unit, fixed cost allocation)
- Recommended selling price, price bounds [min, max]
- Gross profit margin (%) and Net profit margin (%)
- Investment suitability score (Underfunded, Optimal, Overcapitalized)
- Budget-based business model suggestions
"""

import numpy as np
import pandas as pd


# Benchmark industry unit economics and margin targets
CATEGORY_BENCHMARKS = {
    'saas': {
        'default_unit_cost': 12.0,      # Hosting, storage, API per active seat/month
        'target_gross_margin': 0.82,    # 80-85% gross margin standard for SaaS
        'target_net_margin': 0.35,      # 30-40% net margin after CAC and R&D
        'competitor_low': 19.0,
        'competitor_median': 49.0,
        'competitor_high': 99.0,
        'pricing_unit': 'per user / month (Subscription)',
        'capital_thresholds': {'min': 20000, 'optimal': 80000, 'scale': 300000},
        'budget_recommendations': [
            {'range': '$15k - $30k', 'model': 'Lean Micro-SaaS targeting single niche workflow with self-serve onboarding'},
            {'range': '$30k - $100k', 'model': 'Vertical B2B SaaS with automated integration APIs and tiered enterprise plans'},
            {'range': '>$100k', 'model': 'AI-Native Enterprise Platform with dedicated security compliance and direct sales team'}
        ]
    },
    'ecommerce': {
        'default_unit_cost': 18.0,      # COGS + packaging + 3PL fulfillment
        'target_gross_margin': 0.58,    # 55-65% gross margin for D2C brands
        'target_net_margin': 0.18,      # 15-22% net margin after marketing & returns
        'competitor_low': 25.0,
        'competitor_median': 45.0,
        'competitor_high': 85.0,
        'pricing_unit': 'per product / order',
        'capital_thresholds': {'min': 15000, 'optimal': 60000, 'scale': 200000},
        'budget_recommendations': [
            {'range': '$10k - $25k', 'model': 'Curated niche dropship / private label with pre-order crowdfunding batching'},
            {'range': '$25k - $80k', 'model': 'Direct-to-Consumer brand with custom sustainable packaging and omnichannel distribution'},
            {'range': '>$80k', 'model': 'Omnichannel brand with automated warehousing, retail partnerships, and pan-national ad spend'}
        ]
    },
    'healthtech': {
        'default_unit_cost': 45.0,      # Regulatory compliance, doctor rev share, encryption
        'target_gross_margin': 0.68,
        'target_net_margin': 0.28,
        'competitor_low': 60.0,
        'competitor_median': 120.0,
        'competitor_high': 250.0,
        'pricing_unit': 'per consultation / diagnostic scan',
        'capital_thresholds': {'min': 40000, 'optimal': 150000, 'scale': 500000},
        'budget_recommendations': [
            {'range': '$25k - $60k', 'model': 'Teleconsultation and digital triage portal with partner clinic lab integrations'},
            {'range': '$60k - $200k', 'model': 'Proprietary IoT bio-monitoring companion with clinic subscription hardware tiers'},
            {'range': '>$200k', 'model': 'Certified Medical Device & Clinical AI platform with multi-center hospital trials'}
        ]
    },
    'fintech': {
        'default_unit_cost': 22.0,      # Banking partner gateway, KYC checks, escrow fees
        'target_gross_margin': 0.72,
        'target_net_margin': 0.32,
        'competitor_low': 35.0,
        'competitor_median': 85.0,
        'competitor_high': 199.0,
        'pricing_unit': 'per month + 0.8% transaction fee',
        'capital_thresholds': {'min': 50000, 'optimal': 180000, 'scale': 600000},
        'budget_recommendations': [
            {'range': '$30k - $75k', 'model': 'Financial analytics and accounting dashboard integrating bank aggregators'},
            {'range': '$75k - $250k', 'model': 'Embedded invoice discounting or neo-banking portal under licensed NBFC partner'},
            {'range': '>$250k', 'model': 'Proprietary algorithmic underwriting engine and automated institutional treasury desk'}
        ]
    },
    'edtech': {
        'default_unit_cost': 15.0,      # Streaming CDN, instructor royalties, grading compute
        'target_gross_margin': 0.75,
        'target_net_margin': 0.30,
        'competitor_low': 29.0,
        'competitor_median': 69.0,
        'competitor_high': 149.0,
        'pricing_unit': 'per learner / course cohort',
        'capital_thresholds': {'min': 15000, 'optimal': 50000, 'scale': 180000},
        'budget_recommendations': [
            {'range': '$10k - $30k', 'model': 'Cohort-based live workshop bootcamps leveraging community-driven peer reviews'},
            {'range': '$30k - $90k', 'model': 'Adaptive micro-learning platform with gamified simulation and vernacular support'},
            {'range': '>$90k', 'model': 'Accredited university diploma gateway with guaranteed corporate apprenticeship placement'}
        ]
    },
    'agritech': {
        'default_unit_cost': 30.0,      # Hardware sensor maintenance, satellite imagery pass
        'target_gross_margin': 0.62,
        'target_net_margin': 0.24,
        'competitor_low': 45.0,
        'competitor_median': 95.0,
        'competitor_high': 180.0,
        'pricing_unit': 'per acre / season',
        'capital_thresholds': {'min': 25000, 'optimal': 85000, 'scale': 250000},
        'budget_recommendations': [
            {'range': '$15k - $40k', 'model': 'Software-only farm advisory app with weather forecasting and mandi spot rates'},
            {'range': '$40k - $120k', 'model': 'Drone spraying as-a-service and soil moisture IoT telemetry hub for farmer FPOs'},
            {'range': '>$120k', 'model': 'End-to-end farm procurement and export cold-chain infrastructure with quality robotics'}
        ]
    }
}


def compute_dynamic_pricing(category, investment_budget, stage='idea', custom_unit_cost=None):
    """
    Computes transparent, data-driven pricing models, unit economics,
    and budget suitability based on entered startup parameters.
    """
    cat = str(category).lower().strip()
    benchmarks = CATEGORY_BENCHMARKS.get(cat, CATEGORY_BENCHMARKS['saas'])
    
    budget = float(investment_budget or 30000)
    
    # 1. Cost Analysis
    unit_cost = float(custom_unit_cost) if custom_unit_cost else benchmarks['default_unit_cost']
    
    # 2. Recommended Selling Price via Target Margin Formula:
    # Price = Unit_Cost / (1 - Target_Gross_Margin)
    cost_plus_price = unit_cost / (1.0 - benchmarks['target_gross_margin'])
    
    # Market competitor weighting based on business stage:
    # Early idea -> penetration pricing (closer to low/median)
    # Revenue/proven -> value pricing (closer to median/high)
    comp_low = benchmarks['competitor_low']
    comp_med = benchmarks['competitor_median']
    comp_high = benchmarks['competitor_high']
    
    if stage in ['idea', 'prototype']:
        market_benchmark = (comp_low * 0.40) + (comp_med * 0.60)
        strategy = "Market Penetration Pricing (Lower barrier to encourage early user adoption & feedback)"
    else:
        market_benchmark = (comp_med * 0.70) + (comp_high * 0.30)
        strategy = "Value-Based Premium Pricing (Capitalizing on proven product differentiation & moats)"
        
    recommended_price = float(np.round((cost_plus_price * 0.45) + (market_benchmark * 0.55), 2))
    min_suggested_price = float(np.round(unit_cost * 1.35, 2))  # Minimum 35% margin floor
    max_suggested_price = float(np.round(max(recommended_price * 1.55, comp_high * 1.1), 2))
    
    # 3. Transparent Margin Calculations
    gross_profit_per_unit = recommended_price - unit_cost
    gross_margin_pct = float(np.round((gross_profit_per_unit / recommended_price) * 100, 1))
    estimated_net_margin_pct = float(np.round(gross_margin_pct * 0.45, 1))
    
    # 4. Investment Suitability Analysis
    thresholds = benchmarks['capital_thresholds']
    if budget < thresholds['min']:
        suitability = "Underfunded for Category"
        suitability_score = 48
        suitability_advice = (
            f"Your entered budget (${budget:,.0f}) is below the standard minimum entry threshold "
            f"(${thresholds['min']:,.0f}) for {cat.upper()}. Focus on non-dilutive government seed grants "
            f"(e.g., SISFS / TANSEED) or narrow initial MVP scope to a single killer feature."
        )
    elif budget <= thresholds['optimal']:
        suitability = "Lean & Optimal Seed Runway"
        suitability_score = 86
        suitability_advice = (
            f"Your budget (${budget:,.0f}) aligns well with a 9-12 month lean seed runway. "
            f"Allocate 45% to product/engineering, 35% to customer acquisition, and 20% to operational contingency."
        )
    elif budget <= thresholds['scale']:
        suitability = "Well-Capitalized for Growth"
        suitability_score = 94
        suitability_advice = (
            f"Your capital (${budget:,.0f}) gives a significant moat against early-stage competitors. "
            f"Invest heavily into proprietary data moats, patent/IP protection, and rapid organic distribution."
        )
    else:
        suitability = "Late-Stage Seed / Series-A Readiness"
        suitability_score = 90
        suitability_advice = (
            f"High capital readiness (${budget:,.0f}). Prioritize high-caliber team recruitment and national scaling."
        )
        
    return {
        'category': cat,
        'pricing_unit': benchmarks['pricing_unit'],
        'unit_cost': unit_cost,
        'recommended_price': recommended_price,
        'min_suggested_price': min_suggested_price,
        'max_suggested_price': max_suggested_price,
        'gross_profit_per_unit': round(gross_profit_per_unit, 2),
        'gross_margin_pct': gross_margin_pct,
        'estimated_net_margin_pct': estimated_net_margin_pct,
        'pricing_strategy': strategy,
        'competitor_price_benchmarks': {
            'budget_entry': comp_low,
            'market_median': comp_med,
            'premium_tier': comp_high
        },
        'investment_suitability': {
            'status': suitability,
            'score': suitability_score,
            'analysis': suitability_advice,
            'budget_entered': budget,
            'category_minimum': thresholds['min'],
            'category_optimal': thresholds['optimal']
        },
        'budget_tier_recommendations': benchmarks['budget_recommendations']
    }
