import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import Analysis from '../models/Analysis.js';
import Scheme from '../models/Scheme.js';

const inMemoryAnalyses = [];

const getSharedSchemes = () => {
  if (!globalThis.__nexoraSchemes) {
    globalThis.__nexoraSchemes = [];
  }
  return globalThis.__nexoraSchemes;
};

export const setInMemorySchemes = (schemes = []) => {
  const shared = getSharedSchemes();
  shared.length = 0;
  schemes.forEach((scheme) => shared.push({ ...scheme, _id: scheme._id || scheme.id || randomUUID() }));
};

export const getMatchingSchemes = async (category, businessStage) => {
  const normalizedCategory = String(category || '').trim().toLowerCase();
  const normalizedStage = String(businessStage || '').trim().toLowerCase();

  if (mongoose.connection.readyState === 1) {
    try {
      const items = await Scheme.find({
        $or: [
          { applicableCategories: normalizedCategory },
          { applicableCategories: 'other' }
        ]
      });
      return items;
    } catch (e) {
      // fallback
    }
  }

  const all = getSharedSchemes();
  if (all.length > 0) {
    return all.filter((s) => 
      (s.applicableCategories || []).includes(normalizedCategory) || 
      (s.applicableCategories || []).includes('other')
    );
  }

  return [];
};

// AI Decision Engine & Evaluation Model
const evaluateIdea = async (data, apiKeyOverride) => {
  const desc = String(data.description || '').trim();
  const name = String(data.businessName || '').trim();
  const category = String(data.category || 'saas').trim().toLowerCase();
  const stage = String(data.businessStage || 'idea').trim().toLowerCase();
  const amount = Number(data.investmentAmount || 0);
  const location = String(data.targetLocation || 'Global').trim();
  const customers = String(data.targetCustomers || 'General Users').trim();

  // 1. DECISION ENGINE: Validity & Feasibility Check
  const isTooShort = desc.length < 15;
  const isGibberish = /^[^a-zA-Z0-9\s]+$/.test(desc) || (desc.length > 5 && !/\s/.test(desc) && desc.length > 25);
  
  if (isTooShort || isGibberish) {
    return {
      isViable: false,
      viabilityReason: 'Weak / Invalid Business Idea: The description is too vague, brief, or lacks actionable value proposition and market context.',
      aiScore: Math.floor(Math.random() * 15) + 15,
      marketDemand: 'Low',
      riskProfile: 'High',
      breakdown: { marketFit: 15, customerMatch: 20, financials: 25 },
      strengths: [],
      risks: [
        'Description lacks clear problem statement or value proposition.',
        'Unvalidated market demand and customer target.',
        'High risk of execution failure due to undefined business model.'
      ],
      improvements: [
        'Define the target customer demographic clearly.',
        'Explain what core problem your product solves and how it generates revenue.',
        'Provide a realistic 12-month milestone plan.'
      ],
      competitors: [],
      financialForecast: { estimatedCost: '$0', revenueForecast: '$0' },
      legalChecklist: ['Business Registration (LLP/Pvt Ltd)', 'PAN & TAN Application']
    };
  }

  // 2. GEMINI API INTEGRATION (if API Key provided)
  const apiKey = apiKeyOverride || process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.length > 10) {
    try {
      const prompt = `Analyze this startup idea as a senior venture capital analyst and output raw JSON (no markdown fence):
Business Name: ${name}
Category: ${category}
Description: ${desc}
Investment Budget: $${amount}
Location: ${location}
Target Customers: ${customers}
Stage: ${stage}

Return JSON with exact keys:
{
  "isViable": true,
  "viabilityReason": "summary of viability",
  "aiScore": number between 40-98,
  "marketDemand": "High" | "Moderate" | "Low",
  "riskProfile": "Low" | "Moderate" | "High",
  "breakdown": { "marketFit": number, "customerMatch": number, "financials": number },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "risks": ["risk 1", "risk 2", "risk 3"],
  "improvements": ["improvement 1", "improvement 2"],
  "competitors": [{"name": "Comp 1", "similarity": "High", "strength": "Market Lead"}],
  "financialForecast": { "estimatedCost": "$XX,XXX", "revenueForecast": "$XX,XXX" },
  "legalChecklist": ["Registration", "GST", "IP Patent"]
}`;

      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      if (resp.ok) {
        const json = await resp.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed && typeof parsed.aiScore === 'number') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Gemini API call error, falling back to NLP Heuristic Engine:', e.message);
    }
  }

  // 3. SMART NLP HEURISTIC ENGINE (Fallback when no Gemini API key set)
  const baseStageScore = stage === 'revenue' ? 82 : stage === 'prototype' ? 74 : 66;
  const descWords = desc.split(/\s+/).filter(Boolean).length;
  const descBonus = Math.min(12, Math.round(descWords / 8));
  const amountBonus = amount > 100000 ? 6 : amount > 20000 ? 4 : 2;
  const computedScore = Math.min(96, Math.max(45, baseStageScore + descBonus + amountBonus));

  const setupCost = amount > 0 ? amount : 30000;
  const roi = category === 'saas' ? 3.2 : category === 'healthtech' ? 2.9 : category === 'edtech' ? 2.6 : category === 'fintech' ? 3.0 : 2.5;
  const projectedRevenue = Math.round(setupCost * roi + (descWords * 150));
  const breakEvenMonth = amount > 80000 ? 10 : amount > 30000 ? 7 : 5;

  // Market demand explanation by score + category
  const demandLevel = computedScore > 75 ? 'High' : computedScore > 58 ? 'Moderate' : 'Low';
  const demandExplanationMap = {
    High: `The ${category.toUpperCase()} market in ${location} is experiencing strong growth driven by digital adoption trends and expanding customer segments matching your target (${customers}). Comparable solutions are seeing 20–35% YoY growth, indicating a validated and growing addressable market.`,
    Moderate: `The ${category.toUpperCase()} sector in ${location} shows steady demand with moderate competition. Your target segment (${customers}) represents a viable niche, though market penetration will require deliberate positioning and early customer validation experiments.`,
    Low: `Market signals for ${category.toUpperCase()} in ${location} are limited or early-stage. The idea needs stronger demand validation — consider surveys, landing page tests, or incubator feedback before significant capital deployment.`,
  };

  // Viability reason specific to the idea
  const stageNote = stage === 'revenue' ? 'already generating revenue, indicating real market pull' : stage === 'prototype' ? 'at MVP/prototype stage with early validation underway' : 'at the ideation stage with strong foundational concept';
  const viabilityReason = `${name} is ${stageNote}. The ${category.toUpperCase()} sector in ${location} aligns well with your target customer base (${customers}). With a budget of $${setupCost.toLocaleString()}, the projected Year 1 revenue of $${projectedRevenue.toLocaleString()} indicates a ${roi}x return potential. ${computedScore >= 75 ? 'The decision engine flags this as a viable, fundable concept.' : 'The concept shows promise but requires further refinement before seeking investment.'}`;

  // Competitors by category
  const competitorMap = {
    saas: [
      { name: 'Salesforce / HubSpot', similarity: 'High', strength: 'Enterprise CRM dominance with massive ecosystem lock-in', weakness: 'Expensive for SMBs — your price-competitive positioning is an advantage' },
      { name: 'Zoho / Freshworks', similarity: 'Medium', strength: 'Strong SMB penetration in South Asian markets', weakness: 'Limited AI-native feature depth — opportunity to differentiate on AI' },
    ],
    ecommerce: [
      { name: 'Amazon / Flipkart', similarity: 'High', strength: 'Unmatched logistics network and brand trust', weakness: 'Poor support for niche/sustainable D2C brands — your focus area' },
      { name: 'Shopify / Meesho', similarity: 'Medium', strength: 'Easy store setup with growing merchant base', weakness: 'Generic tooling with no sector specialization' },
    ],
    healthtech: [
      { name: 'Practo / Apollo 24|7', similarity: 'High', strength: 'Established patient trust and doctor network', weakness: 'Focused on teleconsult — limited in preventive/IoT health space' },
      { name: 'mfine / Healthians', similarity: 'Medium', strength: 'Diagnostic & lab integration strength', weakness: 'Urban-centric with limited rural/Tier-2 reach' },
    ],
    edtech: [
      { name: 'BYJU\'s / Unacademy', similarity: 'High', strength: 'Wide brand recognition and content library', weakness: 'Over-reliance on live tutoring — weak in AI-personalized learning' },
      { name: 'Coursera / upGrad', similarity: 'Medium', strength: 'Strong higher-ed and upskilling partnerships', weakness: 'Limited vernacular language support and Tier-2 city focus' },
    ],
    fintech: [
      { name: 'Razorpay / PayU', similarity: 'High', strength: 'Deep payment infrastructure and merchant integrations', weakness: 'Limited in embedded finance and BNPL innovation' },
      { name: 'BharatPe / PhonePe', similarity: 'Medium', strength: 'Dominant UPI ecosystem and small merchant reach', weakness: 'Low margins and regulatory pressure on lending' },
    ],
    other: [
      { name: `${location} Market Leader`, similarity: 'High', strength: `Established brand presence in ${location} with loyal customer base`, weakness: 'Slower to innovate — opportunity for agile, tech-first challenger entry' },
      { name: 'Regional / Niche Innovator', similarity: 'Medium', strength: 'Localized pricing and distribution advantages', weakness: 'Limited scale and technology investment capability' },
    ],
  };
  const competitors = (competitorMap[category] || competitorMap.other).map(c => ({
    name: c.name, similarity: c.similarity, strength: c.strength, weakness: c.weakness
  }));

  // Legal checklist by category
  const baseLegal = ['Business Registration (LLP / Pvt Ltd)', 'PAN & TAN Application', 'GST Registration', 'MSME (Udyam) Registration'];
  const categoryLegal = {
    saas: ['Software IP / Copyright Registration', 'Data Privacy Policy (IT Act 2000)', 'Terms of Service & SLA Agreements', 'Cybersecurity Compliance Audit'],
    ecommerce: ['Shops & Establishment Act License', 'Trade License', 'Consumer Protection Compliance', 'Packaging & Labelling Rules'],
    healthtech: ['Clinical Establishment License (CEA)', 'CDSCO Device / Software Approval', 'Patient Data Privacy (DPDP Act)', 'Telemedicine Practice Guidelines'],
    edtech: ['Trademark Registration (Brand & App)', 'Content Licensing Agreements', 'Student Data Protection Policy', 'Payment Aggregator RBI Compliance'],
    fintech: ['RBI NBFC / Payment Aggregator License', 'SEBI / IRDA Compliance (if applicable)', 'KYC / AML Policy Implementation', 'PCI-DSS Certification for Payments'],
    other: ['Trade License & Local Body Clearance', 'Environmental / Safety Clearance (if applicable)', 'Import / Export License (if applicable)'],
  };
  const legalChecklist = [...baseLegal, ...(categoryLegal[category] || categoryLegal.other)];

  // Financial breakdown with idea-specific labels
  const financialForecast = {
    estimatedCost: `$${setupCost.toLocaleString()}`,
    revenueForecast: `$${projectedRevenue.toLocaleString()}`,
    breakEvenMonth: `Month ${breakEvenMonth}`,
    roiMultiple: `${roi}x`,
    costBreakdown: {
      product: Math.round(setupCost * 0.4),
      marketing: Math.round(setupCost * 0.25),
      operations: Math.round(setupCost * 0.2),
      legal: Math.round(setupCost * 0.15),
    }
  };

  return {
    isViable: true,
    viabilityReason,
    marketDemandExplanation: demandExplanationMap[demandLevel],
    competitorAnalysisNote: `Analysis identified ${competitors.length} primary competitive forces in the ${category.toUpperCase()} market for ${location}. Your differentiation opportunity lies in ${customers.toLowerCase().includes('sme') || customers.toLowerCase().includes('small') ? 'underserved SMB segments with personalized pricing' : 'superior AI-native capabilities and faster go-to-market speed'}.`,
    aiScore: computedScore,
    marketDemand: demandLevel,
    riskProfile: computedScore > 80 ? 'Low' : computedScore > 65 ? 'Moderate' : 'High',
    breakdown: {
      marketFit: Math.min(95, computedScore + 4),
      customerMatch: Math.min(95, computedScore - 2),
      financials: Math.min(95, computedScore + 1)
    },
    strengths: [
      `${category.toUpperCase()} sector in ${location} shows ${demandLevel.toLowerCase()} addressable demand for your solution`,
      `Target segment (${customers}) is actively seeking digital-first alternatives`,
      `${stage === 'revenue' ? 'Existing revenue traction validates product-market fit' : stage === 'prototype' ? 'Working prototype reduces execution risk and investor skepticism' : 'Strong ideation clarity with defined problem-solution fit'}`
    ],
    risks: [
      amount > 100000 ? `High initial capital of $${setupCost.toLocaleString()} increases runway pressure — consider phased deployment` : `Customer acquisition cost in ${category} segment can erode early margins — prioritize organic channels`,
      `Competitive pressure from established ${category.toUpperCase()} players requires distinct positioning`,
      `Scaling beyond ${location} will require localization investment and new distribution partnerships`
    ],
    improvements: [
      `Run a 30-day pre-launch validation experiment targeting ${customers} to refine your messaging`,
      `Apply for SISFS or TANSEED seed grants to extend runway without equity dilution`,
      `Build a 3-month MVP traction report before approaching angel investors`
    ],
    competitors,
    financialForecast,
    legalChecklist,
  };
};

export const createAnalysis = async (req, res) => {
  try {
    const { businessName, category, description, investmentAmount, targetLocation, targetCustomers, businessStage, goal12Months, goal, apiKey } = req.body || {};
    const normalizedGoal = goal || goal12Months;

    if (!businessName || !description) {
      return res.status(400).json({ message: 'businessName and description are required.' });
    }

    const matchedSchemes = await getMatchingSchemes(category, businessStage);
    const matchedSchemeIds = matchedSchemes.map((s) => String(s._id || s.id || s.name));

    const evalResult = await evaluateIdea(
      { businessName, category, description, investmentAmount, targetLocation, targetCustomers, businessStage, goal: normalizedGoal },
      apiKey
    );

    const recordId = randomUUID();
    const userId = req.user?.id || req.user?._id || 'anonymous-user';

    const fullRecord = {
      _id: recordId,
      businessName: String(businessName).trim(),
      category: String(category || 'saas').trim().toLowerCase(),
      description: String(description).trim(),
      investmentAmount: Number(investmentAmount) || 0,
      targetLocation: String(targetLocation || 'Global').trim(),
      targetCustomers: String(targetCustomers || 'General Users').trim(),
      businessStage: String(businessStage || 'idea').trim().toLowerCase(),
      goal: String(normalizedGoal || '').trim(),
      aiScore: evalResult.aiScore,
      isViable: evalResult.isViable,
      viabilityReason: evalResult.viabilityReason,
      marketDemand: evalResult.marketDemand,
      riskProfile: evalResult.riskProfile,
      breakdown: evalResult.breakdown,
      strengths: evalResult.strengths,
      risks: evalResult.risks,
      improvements: evalResult.improvements,
      competitors: evalResult.competitors,
      financialForecast: evalResult.financialForecast,
      legalChecklist: evalResult.legalChecklist,
      suggestedSchemes: matchedSchemes,
      suggestedSchemeIds: matchedSchemeIds,
      userId,
      createdAt: new Date().toISOString()
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const saved = await Analysis.create({
          ...fullRecord,
          suggestedSchemes: matchedSchemeIds.filter((id) => mongoose.Types.ObjectId.isValid(id))
        });
        fullRecord._id = saved._id;
      } catch (dbErr) {
        console.warn('DB save warning, falling back to in-memory:', dbErr.message);
      }
    }

    inMemoryAnalyses.unshift(fullRecord);
    return res.status(201).json(fullRecord);
  } catch (error) {
    console.error('Create analysis failed:', error);
    return res.status(500).json({ message: 'Analysis creation failed.' });
  }
};

export const getAnalysisById = async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1) {
    try {
      const analysis = await Analysis.findById(id).populate('suggestedSchemes');
      if (analysis) return res.json(analysis);
    } catch (e) {
      // fallback
    }
  }

  const record = inMemoryAnalyses.find((entry) => String(entry._id) === String(id));
  if (record) return res.json(record);

  return res.status(404).json({ message: 'Analysis not found.' });
};

export const listUserAnalyses = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || 'anonymous-user';

    if (mongoose.connection.readyState === 1) {
      try {
        const items = await Analysis.find({ userId }).sort({ createdAt: -1 }).limit(50).populate('suggestedSchemes');
        if (items && items.length > 0) return res.json(items);
      } catch (e) {
        // fallback
      }
    }

    const filtered = inMemoryAnalyses.filter((a) => String(a.userId) === String(userId));
    if (filtered.length > 0) return res.json(filtered);

    // If empty for this user, return all inMemoryAnalyses as fallback
    return res.json(inMemoryAnalyses);
  } catch (error) {
    console.error('List user analyses failed:', error);
    return res.status(500).json({ message: 'Failed to list analyses.' });
  }
};

export const getAnalysisSummary = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || 'anonymous-user';

    if (mongoose.connection.readyState === 1) {
      try {
        const total = await Analysis.countDocuments({ userId });
        const recent = await Analysis.find({ userId }).sort({ createdAt: -1 }).limit(5).select('businessName aiScore createdAt');
        const agg = await Analysis.aggregate([
          { $match: { userId: String(userId) } },
          { $group: { _id: null, avgScore: { $avg: '$aiScore' } } },
        ]);
        const avgScore = agg && agg[0] ? Math.round(agg[0].avgScore || 0) : 0;
        if (total > 0) return res.json({ total, avgScore, recent });
      } catch (e) {
        // fallback
      }
    }

    const userItems = inMemoryAnalyses.length > 0 ? inMemoryAnalyses : [];
    const total = userItems.length;
    const avgScore = total ? Math.round(userItems.reduce((s, it) => s + (it.aiScore || 0), 0) / total) : 0;
    const recent = userItems.slice(0, 5).map((it) => ({ businessName: it.businessName, aiScore: it.aiScore, createdAt: it.createdAt }));
    return res.json({ total, avgScore, recent });
  } catch (error) {
    console.error('Get analysis summary failed:', error);
    return res.status(500).json({ message: 'Failed to get summary.' });
  }
};
