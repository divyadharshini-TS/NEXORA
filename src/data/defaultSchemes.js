export const DEFAULT_SCHEMES = [
  {
    _id: 'sisfs-01',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    description: 'DPIIT-backed grants up to ₹20 lakh for proof-of-concept/prototyping, plus up to ₹50 lakh in convertible debt for market entry, routed through 300+ approved incubators.',
    eligibility: 'DPIIT-recognised, incorporated within 2 years, ≥51% Indian promoter ownership, not received >₹10 lakh from other govt schemes.',
    fundingAmount: 'Up to ₹20 lakh (grant) / ₹50 lakh (debt)',
    applicableCategories: ['saas', 'ecommerce', 'healthtech', 'edtech', 'fintech', 'other'],
    applicableStages: ['idea', 'prototype'],
    officialLink: 'https://seedfund.startupindia.gov.in',
    region: 'Pan-India',
    note: 'Application windows open periodically — verify current status on the official portal before applying.'
  },
  {
    _id: 'pmmy-02',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    description: 'Collateral-free loans (Shishu ≤₹50k, Kishore ≤₹5L, Tarun ≤₹10L, Tarun Plus ≤₹20L) for non-farm micro/small enterprises via banks, NBFCs, and MFIs.',
    eligibility: 'Indian citizens aged 18–65 running or starting a non-farm income-generating business.',
    fundingAmount: '₹50,000 – ₹20 lakh',
    applicableCategories: ['ecommerce', 'other'],
    applicableStages: ['idea', 'prototype', 'revenue'],
    officialLink: 'https://www.mudra.org.in',
    region: 'Pan-India',
    note: 'No fixed interest rate — depends on lending bank policy.'
  },
  {
    _id: 'standup-03',
    name: 'Stand-Up India Scheme',
    description: 'Bank loans between ₹10 lakh–₹1 crore for greenfield enterprises by women, SC/ST entrepreneurs, in manufacturing, trading, or services.',
    eligibility: 'Women or SC/ST entrepreneurs above 18, greenfield (first-time) project.',
    fundingAmount: '₹10 lakh – ₹1 crore',
    applicableCategories: ['saas', 'ecommerce', 'other'],
    applicableStages: ['idea', 'prototype'],
    officialLink: 'https://www.standupmitra.in',
    region: 'Pan-India',
    note: ''
  },
  {
    _id: 'tanseed-04',
    name: 'TANSEED (Tamil Nadu Startup Seed Grant)',
    description: "StartupTN's flagship equity-linked seed grant (up to ₹10–15 lakh depending on sector) plus a year-long accelerator, for startups based in or relocating to Tamil Nadu.",
    eligibility: 'Registered/willing to register in Tamil Nadu, early-stage, innovative product with growth potential.',
    fundingAmount: 'Up to ₹10–15 lakh (equity-linked, ~3% stake)',
    applicableCategories: ['saas', 'healthtech', 'edtech', 'fintech', 'other'],
    applicableStages: ['idea', 'prototype', 'revenue'],
    officialLink: 'https://startuptn.in',
    region: 'Tamil Nadu',
    note: 'Cohort-based — cycles open and close periodically; check StartupTN portal for the current round.'
  },
  {
    _id: 'startuptn-women-05',
    name: 'StartupTN Women Entrepreneurs Seed Fund',
    description: 'Seed funding (up to ₹2 lakh) and incubation support specifically for early-stage women entrepreneurs in Tamil Nadu.',
    eligibility: 'Women-led early-stage startups based in Tamil Nadu.',
    fundingAmount: 'Up to ₹2 lakh',
    applicableCategories: ['saas', 'ecommerce', 'healthtech', 'edtech', 'fintech', 'other'],
    applicableStages: ['idea', 'prototype'],
    officialLink: 'https://startuptn.in',
    region: 'Tamil Nadu',
    note: ''
  }
];
