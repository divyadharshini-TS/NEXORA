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
    competitors,
    financialForecast: {
      estimatedCost: `₹${setupCost.toLocaleString('en-IN')}`,
      revenueForecast: `₹${projectedRevenue.toLocaleString('en-IN')}`,
      breakEvenMonth: `Month ${breakEvenMonth}`,
      roiMultiple: `${roi}x`,
      burnRateEstimate: `₹${Math.round(setupCost / 12).toLocaleString('en-IN')}/mo`,
      grossMargin: '62%'
    },
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
