"""
NEXORA-AI — Financial Calculator & Break-Even Analysis Engine
Module 6 Implementation
Computes mathematically verified financial metrics:
- Startup investment estimation (CapEx + OpEx + Working Capital)
- Fixed costs & variable costs breakdown
- Revenue estimation (Unit Price * Projected Volume)
- Gross Profit, Operating Expenses, and Net Profit
- Profit Margin (% Gross & % Net)
- Break-Even Analysis: Break-even Units = FC / (P - VC), Break-even Revenue = Units * P
- Cash Flow Projection (12-month trajectory with ramp-up curve using NumPy)
- Return on Investment (ROI % = Net Profit / Total Investment * 100)
- Investment recovery / Payback period in months
"""

import numpy as np


def compute_financial_plan(
    total_investment=30000.0,
    unit_price=49.0,
    variable_cost_per_unit=12.0,
    monthly_fixed_costs=2500.0,
    projected_monthly_units=150.0,
    category="saas"
):
    """
    Executes precise mathematical calculations for startup viability,
    cash flow modeling, and break-even thresholds.
    """
    total_inv = float(max(1000.0, total_investment))
    price = float(max(1.0, unit_price))
    vc = float(max(0.0, variable_cost_per_unit))
    fc = float(max(100.0, monthly_fixed_costs))
    target_units = float(max(1.0, projected_monthly_units))
    
    # 1. Startup Investment Breakdown Estimation
    capex_pct = 0.35 if category in ['ecommerce', 'agritech', 'healthtech'] else 0.20
    opex_pct = 0.45
    working_capital_pct = 1.0 - (capex_pct + opex_pct)
    
    investment_breakdown = {
        'capital_expenditure_capex': round(total_inv * capex_pct, 2),
        'operating_reserve_opex': round(total_inv * opex_pct, 2),
        'working_capital_buffer': round(total_inv * working_capital_pct, 2),
        'total_startup_capital': round(total_inv, 2)
    }
    
    # 2. Unit Contribution Margin
    # Contribution Margin per unit = Price - Variable Cost
    contribution_margin = price - vc
    contribution_margin_ratio = (contribution_margin / price) if price > 0 else 0.0
    
    # 3. Mathematically Exact Break-Even Analysis
    if contribution_margin <= 0:
        # Cannot break even if variable cost exceeds or equals price
        break_even_units_monthly = 999999
        break_even_revenue_monthly = 999999
        is_break_even_achievable = False
        break_even_note = "Warning: Variable unit cost equals or exceeds selling price. Unit economics are negative."
    else:
        # Break-Even Units = Fixed Costs / Contribution Margin
        break_even_units_monthly = int(np.ceil(fc / contribution_margin))
        break_even_revenue_monthly = round(break_even_units_monthly * price, 2)
        is_break_even_achievable = True
        break_even_note = f"Break-even is achieved at {break_even_units_monthly:,} units sold/month (${break_even_revenue_monthly:,.2f} monthly run-rate)."
        
    # 4. Steady-State Monthly Economics (At Target Volume)
    monthly_gross_revenue = target_units * price
    monthly_cogs = target_units * vc
    monthly_gross_profit = monthly_gross_revenue - monthly_cogs
    monthly_net_profit = monthly_gross_profit - fc
    
    gross_margin_pct = (monthly_gross_profit / monthly_gross_revenue * 100) if monthly_gross_revenue > 0 else 0.0
    net_profit_margin_pct = (monthly_net_profit / monthly_gross_revenue * 100) if monthly_gross_revenue > 0 else 0.0
    
    # 5. 12-Month Month-by-Month Cash Flow Ramp Simulation
    # Models adoption S-curve (starting at 15% capacity in Month 1 ramping to 100% by Month 12)
    ramp_multipliers = np.linspace(0.18, 1.0, 12)
    monthly_units_curve = (target_units * ramp_multipliers).astype(int)
    
    cash_flow_projection = []
    cumulative_cash = -total_inv
    payback_month = None
    annual_gross_revenue = 0.0
    annual_net_profit = 0.0
    
    for month_idx in range(12):
        m_num = month_idx + 1
        m_units = int(monthly_units_curve[month_idx])
        m_rev = float(m_units * price)
        m_vc = float(m_units * vc)
        m_fc = float(fc)
        m_net = float(m_rev - m_vc - m_fc)
        
        cumulative_cash += m_net
        annual_gross_revenue += m_rev
        annual_net_profit += m_net
        
        if cumulative_cash >= 0 and payback_month is None:
            payback_month = m_num
            
        cash_flow_projection.append({
            'month': f"M{m_num}",
            'units': m_units,
            'revenue': round(m_rev, 2),
            'expenses': round(m_vc + m_fc, 2),
            'net_cash_flow': round(m_net, 2),
            'cumulative_balance': round(cumulative_cash, 2)
        })
        
    # 6. ROI & Investment Recovery Metrics
    roi_pct = (annual_net_profit / total_inv) * 100 if total_inv > 0 else 0.0
    
    if payback_month:
        recovery_timeline = f"Month {payback_month} (Full principal capital recovered within Year 1)"
    else:
        # Approximate months based on run rate
        if monthly_net_profit > 0:
            remaining_deficit = abs(cumulative_cash)
            extra_months = int(np.ceil(remaining_deficit / monthly_net_profit))
            est_month = 12 + extra_months
            recovery_timeline = f"Month {est_month} (~{est_month / 12:.1f} years based on steady run-rate)"
        else:
            recovery_timeline = "Exceeds 36 Months (Operating net profit currently negative)"
            
    return {
        'inputs': {
            'total_investment': total_inv,
            'unit_price': price,
            'variable_cost_per_unit': vc,
            'monthly_fixed_costs': fc,
            'projected_monthly_units': target_units,
            'category': category
        },
        'startup_capital_allocation': investment_breakdown,
        'unit_economics': {
            'contribution_margin_dollar': round(contribution_margin, 2),
            'contribution_margin_ratio': round(contribution_margin_ratio * 100, 1),
            'gross_margin_pct': round(gross_margin_pct, 1),
            'net_profit_margin_pct': round(net_profit_margin_pct, 1)
        },
        'break_even_analysis': {
            'is_achievable': is_break_even_achievable,
            'break_even_units_monthly': break_even_units_monthly,
            'break_even_revenue_monthly': break_even_revenue_monthly,
            'break_even_summary': break_even_note
        },
        'annual_projections': {
            'year_1_gross_revenue': round(annual_gross_revenue, 2),
            'year_1_net_profit': round(annual_net_profit, 2),
            'roi_pct': round(roi_pct, 1),
            'investment_recovery_timeline': recovery_timeline,
            'payback_month': payback_month
        },
        'monthly_cash_flows': cash_flow_projection
    }
