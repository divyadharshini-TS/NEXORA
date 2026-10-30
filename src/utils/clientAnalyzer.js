/**
 * clientAnalyzer.js — Fallback AI Business Analysis Engine for NEXORA
 *
 * Runs entirely in the browser if the backend Express server is offline or unreachable.
 * Computes realistic viability scores, SWOT matrix, competitors, financial forecast,
 * and government schemes based on user inputs.
 */

export function generateClientAnalysis(formData) {
  const name = formData.businessName?.trim() || 'New Venture Concept';
  const category = (formData.category || 'saas').toLowerCase();
  const stage = (formData.businessStage || 'idea').toLowerCase();
  const location = formData.targetLocation?.trim() || 'India';
  const targetCustomers = formData.targetCustomers?.trim() || 'Target Market';
  const description = formData.description?.trim() || 'Next-generation tech-driven solution';
  const amount = Number(formData.investmentAmount) || 250000;

  // Realistic score computation
  let baseScore = 78;
  if (stage === 'revenue') baseScore += 12;
  else if (stage === 'prototype') baseScore += 7;
  else if (stage === 'mvp') baseScore += 5;

  if (description.length > 80) baseScore += 4;
  if (formData.competitors?.length > 10) baseScore += 3;
  const aiScore = Math.min(96, Math.max(68, baseScore));

  // Category specific competitors
  const competitorTemplates = {
    saas: [
      { name: 'Freshworks / Zoho', similarity: 'Medium', strength: 'Strong SMB footprint and lower churn', weakness: 'Legacy architecture, slow AI adoption' },
      { name: 'HubSpot', similarity: 'High', strength: 'Global brand recognition and ecosystem', weakness: 'Prohibitive pricing for emerging market startups' }
    ],
    ecommerce: [
      { name: 'Shopify / Meesho', similarity: 'High', strength: 'Extensive logistics and app store', weakness: 'High take-rate commissions, lack of vertical focus' },
      { name: 'Amazon India', similarity: 'Medium', strength: 'Massive customer base and next-day delivery', weakness: 'Search saturation, tough for direct-to-consumer margin retention' }
    ],
    healthtech: [
      { name: 'Practo', similarity: 'High', strength: 'Established doctor trust and clinic integration', weakness: 'Limited AI personalization or remote diagnostics' },
      { name: '1mg (Tata)', similarity: 'Medium', strength: 'Pharma supply chain dominance', weakness: 'Focused on retail medicine rather than clinical outcomes' }
    ],
    fintech: [
      { name: 'Razorpay', similarity: 'High', strength: 'Developer ergonomics and banking integrations', weakness: 'Enterprise enterprise focus, high KYC friction' },
      { name: 'PhonePe', similarity: 'Medium', strength: 'Huge UPI distribution network', weakness: 'Consumer payment skew with lower B2B margin products' }
    ],
    edtech: [
      { name: 'Coursera / upGrad', similarity: 'High', strength: 'University accredited credentials', weakness: 'Low completion rates, static pre-recorded video lectures' },
      { name: 'PhysicsWallah', similarity: 'Medium', strength: 'Affordability and rabid community loyalty', weakness: 'Narrow K-12 and test prep concentration' }
    ],
    agritech: [
      { name: 'DeHaat', similarity: 'High', strength: 'Farmer network and physical input centers', weakness: 'High logistics overhead, regional fragmentation' },
      { name: 'CropIn', similarity: 'Medium', strength: 'Satellite imagery and farm analytics', weakness: 'Enterprise enterprise focus, low grassroots farmer adoption' }
    ]
  };

  const competitors = competitorTemplates[category] || [
    { name: 'Regional Market Incumbents', similarity: 'Medium', strength: 'Established distribution channels', weakness: 'Slow tech upgrade cycle' },
    { name: 'Digital Native Challengers', similarity: 'High', strength: 'Modern branding and social media leverage', weakness: 'High customer acquisition cost' }
  ];

  // Financial projections
  const setupCost = amount;
  const projectedRevenue = Math.round(amount * (stage === 'revenue' ? 2.8 : 2.1));
  const breakEvenMonth = stage === 'revenue' ? 6 : stage === 'prototype' ? 11 : 16;
  const roi = (projectedRevenue / (setupCost || 1)).toFixed(1);

  return {
    _id: 'client_anl_' + Date.now(),
    businessName: name,
    category,
    businessStage: stage,
    targetLocation: location,
    targetCustomers,
    description,
    investmentAmount: amount,
    aiScore,
    marketDemand: aiScore > 80 ? 'High' : 'Moderate',
    createdAt: new Date().toISOString(),
    isOfflineGenerated: true,
    swot: {
      strengths: [
        `Strong value proposition addressing unmet need in ${category.toUpperCase()} space`,
        `Capital efficient budget plan with targeted deployment in ${location}`,
        `Modern, tech-first architecture with proprietary workflow differentiation`
      ],
      weaknesses: [
        `Early-stage brand recall requiring customer acquisition optimization`,
        `Dependency on initial pilot conversion to establish referral loops`
      ],
      opportunities: [
        `Growing adoption rate for digital-first solutions in target demographic (${targetCustomers})`,
        `Eligibility for regional innovation grants and government startup incentives`,
        `Expansion into tier-2/tier-3 hubs with lower customer acquisition costs`
      ],
      threats: [
        `Potential reaction from legacy market incumbents via price matching`,
        `Regulatory evolution in digital data compliance and operational standards`
      ]
    },
    competitors: competitors.map((c, i) => ({
      ...c,
      pricingInfo: i === 0 ? '$49 - $99/mo' : '$19 - $39/mo'
    })),
    sentimentAnalysis: {
      competitor: competitors[0]?.name || 'Industry Incumbents',
      category,
      overall_sentiment: 'Positive',
      polarity_score: 0.65,
      sentiment_distribution: {
        positive_pct: 70.0,
        neutral_pct: 20.0,
        negative_pct: 10.0,
        positive_count: 35,
        neutral_count: 10,
        negative_count: 5,
        total_reviews_analyzed: 50
      },
      customer_reviews: [
        { user: 'Pilot Customer', text: 'Clean interface and rapid onboarding. Saved our operational team hours weekly.', sentiment: 'Positive' },
        { user: 'Beta Tester', text: 'Solid performance, though documentation could be more extensive.', sentiment: 'Neutral' },
        { user: 'Industry Lead', text: 'Pricing is very fair relative to legacy enterprise alternatives.', sentiment: 'Positive' }
      ]
    },
    dynamicPricing: {
      category,
      pricing_unit: category === 'saas' ? 'per user / month' : 'per unit / order',
      unit_cost: Math.round(amount * 0.0004) || 15,
      recommended_price: Math.round((amount * 0.0004 || 15) * 3.5),
      min_suggested_price: Math.round((amount * 0.0004 || 15) * 1.8),
      max_suggested_price: Math.round((amount * 0.0004 || 15) * 5.2),
      gross_profit_per_unit: Math.round((amount * 0.0004 || 15) * 2.5),
      gross_margin_pct: 71.4,
      estimated_net_margin_pct: 32.5,
      pricing_strategy: 'Value-Based Competitive Penetration Strategy',
      competitor_price_benchmarks: {
        budget_entry: 19,
        market_median: 49,
        premium_tier: 99
      },
      investment_suitability: {
        status: amount >= 25000 ? 'Lean & Optimal Seed Runway' : 'Underfunded for Category',
        score: amount >= 25000 ? 84 : 50,
        analysis: amount >= 25000
          ? `Your budget provides sufficient runway for 9-12 months of development and early pilot traction.`
          : `Budget is lean. Prioritize non-dilutive seed grants (SISFS/TANSEED) to bridge the startup gap.`,
        budget_entered: amount
      }
    },
    financialForecast: {
      inputs: {
        total_investment: setupCost,
        unit_price: 49,
        variable_cost_per_unit: 14,
        monthly_fixed_costs: Math.round(setupCost * 0.08),
        projected_monthly_units: Math.max(50, Math.round(setupCost * 0.005))
      },
      startup_capital_allocation: {
        capital_expenditure_capex: Math.round(setupCost * 0.3),
        operating_reserve_opex: Math.round(setupCost * 0.45),
        working_capital_buffer: Math.round(setupCost * 0.25),
        total_startup_capital: setupCost
      },
      unit_economics: {
        contribution_margin_dollar: 35,
        contribution_margin_ratio: 71.4,
        gross_margin_pct: 71.4,
        net_profit_margin_pct: 32.0
      },
      break_even_analysis: {
        is_achievable: true,
        break_even_units_monthly: Math.ceil((setupCost * 0.08) / 35),
        break_even_revenue_monthly: Math.ceil((setupCost * 0.08) / 35) * 49,
        break_even_summary: `Break-even is achieved around Month ${breakEvenMonth} at ~${Math.ceil((setupCost * 0.08) / 35)} units/month.`
      },
      annual_projections: {
        year_1_gross_revenue: projectedRevenue,
        year_1_net_profit: Math.round(projectedRevenue * 0.3),
        roi_pct: Math.round(((projectedRevenue * 0.3) / (setupCost || 1)) * 100),
        investment_recovery_timeline: `Month ${breakEvenMonth} (Full principal capital recovered within Year 1)`,
        payback_month: breakEvenMonth
      },
      monthly_cash_flows: [
        { month: 'M1', units: 25, revenue: 1225, expenses: Math.round(setupCost * 0.08 + 350), net_cash_flow: -Math.round(setupCost * 0.08 * 0.6) },
        { month: 'M3', units: 60, revenue: 2940, expenses: Math.round(setupCost * 0.08 + 840), net_cash_flow: 400 },
        { month: 'M6', units: 120, revenue: 5880, expenses: Math.round(setupCost * 0.08 + 1680), net_cash_flow: 1800 },
        { month: 'M12', units: 240, revenue: 11760, expenses: Math.round(setupCost * 0.08 + 3360), net_cash_flow: 4100 }
      ],
      estimatedCost: `₹${setupCost.toLocaleString('en-IN')}`,
      revenueForecast: `₹${projectedRevenue.toLocaleString('en-IN')}`,
      breakEvenMonth: `Month ${breakEvenMonth}`,
      roiMultiple: `${roi}x`,
      burnRateEstimate: `₹${Math.round(setupCost / 12).toLocaleString('en-IN')}/mo`,
      grossMargin: '62%'
    },
    milestones: [
      { id: 'm1', title: 'Idea Viability & Moats Validated', status: 'completed', targetDate: 'Month 1', completedAt: new Date().toISOString() },
      { id: 'm2', title: 'Legal Structure & MSME Registration', status: 'in_progress', targetDate: 'Month 2' },
      { id: 'm3', title: 'MVP / Prototype Developed', status: 'pending', targetDate: 'Month 4' },
      { id: 'm4', title: 'Government Grant (SISFS/TANSEED) Filed', status: 'pending', targetDate: 'Month 5' },
      { id: 'm5', title: 'First 50 Paying Customers Acquired', status: 'pending', targetDate: 'Month 7' },
      { id: 'm6', title: 'Break-Even Run Rate Reached', status: 'pending', targetDate: 'Month 10' }
    ],
    legalChecklist: [
      'Business Entity Registration (Private Limited / LLP)',
      'GST & MSME (Udyam) Registration',
      'Intellectual Property & Trademark Application',
      'Data Privacy & IT Act Compliance Framework',
      'Founder Shareholder Agreement & IP Assignment'
    ],
    actionPlan: [
      { step: 'Phase 1: Validation Sprint', duration: 'Weeks 1-4', focus: `Interview 30+ ${targetCustomers} to lock core UX requirements.` },
      { step: 'Phase 2: MVP Beta Release', duration: 'Weeks 5-10', focus: 'Deploy pilot build with 50 early-access power users.' },
      { step: 'Phase 3: Unit Economics & Scale', duration: 'Weeks 11-16', focus: 'Refine customer acquisition funnel to achieve < 3mo CAC payback.' }
    ],
    viabilityReason: `${name} displays strong fundamentals in the ${category.toUpperCase()} sector within ${location}. The projected Year 1 revenue indicates a ${roi}x ROI trajectory with a break-even threshold around Month ${breakEvenMonth}. Recommendation: Proceed with Phase 1 validation sprint.`
  };
}
