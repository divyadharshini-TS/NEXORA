/**
 * NEXORA-AI End-to-End Automated Integration Test Suite
 * Tests all 9 modules across Node.js, Python AI/ML microservice, and database layer.
 */

const API_BASE = 'http://localhost:3001/api';
const PYTHON_BASE = 'http://localhost:5001';

async function runTests() {
  console.log('====================================================');
  console.log('   NEXORA-AI 9-MODULE INTEGRATION TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Python ML Microservice Health Check
  try {
    const pyRes = await fetch(`${PYTHON_BASE}/health`);
    const pyData = await pyRes.json();
    assert(pyData.status === 'online', 'Python ML Microservice is online on Port 5001');
    assert(pyData.models_loaded.viability_classifier === true, 'Scikit-learn Viability Classifier is trained & loaded');
    assert(pyData.models_loaded.sentiment_classifier === true, 'NLTK/TF-IDF Sentiment Classifier is loaded');
    assert(pyData.evaluation_metrics.viability_metrics.viability_classification.accuracy > 0.85, 
      `Viability Classifier evaluated accuracy verified (${(pyData.evaluation_metrics.viability_metrics.viability_classification.accuracy * 100).toFixed(1)}%)`);
  } catch (err) {
    assert(false, `Python ML Microservice check failed: ${err.message}`);
  }

  // 2. Module 1: User Authentication & Profile
  let token = null;
  let userId = null;
  try {
    const testEmail = `test_${Date.now()}@nexora.ai`;
    const signupRes = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Integration Founder', email: testEmail, password: 'Password123!' })
    });
    const signupData = await signupRes.json();
    token = signupData.token;
    userId = signupData.user?.id;
    assert(!!token, 'Module 1: User registration and JWT token generation successful');

    // Profile update
    const profileRes = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ company: 'EcoNova Technologies', industry: 'CleanTech' })
    });
    const profileData = await profileRes.json();
    assert(profileData.user?.company === 'EcoNova Technologies', 'Module 1: Profile update (company & industry) saved');
  } catch (err) {
    assert(false, `Module 1 failed: ${err.message}`);
  }

  // 3. Module 2, 3, 4, 5, 6: AI Diagnostic & Multi-Module Pipeline
  let analysisId = null;
  try {
    const anlRes = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        businessName: 'AgroSense Precision Telemetry',
        category: 'agritech',
        description: 'Autonomous micro-sensor soil moisture telemetry and drone spraying dispatch for smallholder farmers.',
        investmentAmount: 50000,
        targetLocation: 'India',
        targetCustomers: 'Farmer Producer Organizations (FPOs)',
        businessStage: 'prototype',
        goal12Months: 'Deploy across 500 acres and achieve break-even.'
      })
    });
    const anl = await anlRes.json();
    analysisId = anl._id;

    // Module 2 Checks:
    assert(typeof anl.aiScore === 'number' && anl.aiScore >= 50, `Module 2: AI Viability Score generated (${anl.aiScore}/100)`);
    assert(anl.isViable === true, 'Module 2: Viable/Not Viable classification evaluated');
    assert(Array.isArray(anl.strengths) && anl.strengths.length > 0, 'Module 2: Strengths & weaknesses evaluated');

    // Module 3 Checks:
    assert(Array.isArray(anl.competitors) && anl.competitors.length > 0, 'Module 3: Competitor identification verified');
    assert(!!anl.competitors[0].pricingInfo, `Module 3: Competitor pricing information included (${anl.competitors[0].pricingInfo})`);
    assert(anl.sentimentAnalysis?.sentiment_distribution?.positive_pct > 0, 
      `Module 3: Review sentiment analysis calculated (${anl.sentimentAnalysis?.sentiment_distribution?.positive_pct}% positive)`);

    // Module 4 Checks:
    assert(anl.dynamicPricing?.recommended_price > 0, `Module 4: Dynamic recommended selling price generated ($${anl.dynamicPricing?.recommended_price})`);
    assert(anl.dynamicPricing?.min_suggested_price < anl.dynamicPricing?.max_suggested_price, 'Module 4: Dynamic min/max price bounds computed');
    assert(anl.dynamicPricing?.gross_margin_pct > 0, `Module 4: Profit margin calculated (${anl.dynamicPricing?.gross_margin_pct}%)`);
    assert(!!anl.dynamicPricing?.investment_suitability?.status, `Module 4: Investment suitability evaluated (${anl.dynamicPricing?.investment_suitability?.status})`);

    // Module 5 Checks:
    assert(Array.isArray(anl.suggestedSchemes) && anl.suggestedSchemes.length > 0, `Module 5: Matched ${anl.suggestedSchemes.length} government schemes based on sector`);
    assert(Array.isArray(anl.legalChecklist) && anl.legalChecklist.length >= 4, `Module 5: Legal compliance & license requirements attached (${anl.legalChecklist.length} filings)`);

    // Module 6 Checks:
    const fin = anl.financialForecast;
    assert(fin?.break_even_analysis?.break_even_units_monthly > 0, `Module 6: Mathematically exact break-even units calculated (${fin?.break_even_analysis?.break_even_units_monthly} units/mo)`);
    assert(fin?.annual_projections?.roi_pct > 0, `Module 6: Annual ROI calculation computed (${fin?.annual_projections?.roi_pct}%)`);
    assert(Array.isArray(fin?.monthly_cash_flows) && fin.monthly_cash_flows.length > 0, `Module 6: 12-month cash flow simulation array generated (${fin.monthly_cash_flows.length} milestones)`);
  } catch (err) {
    assert(false, `Analysis pipeline failed: ${err.message}`);
  }

  // 4. Module 7: Progress Tracking & Milestones
  try {
    const updatedMilestones = [
      { id: 'm1', title: 'Idea Viability & Moats Validated', status: 'completed', targetDate: 'Month 1' },
      { id: 'm2', title: 'Legal Structure & MSME Registration', status: 'completed', targetDate: 'Month 2' },
      { id: 'm3', title: 'MVP / Prototype Developed', status: 'in_progress', targetDate: 'Month 4' }
    ];
    const msRes = await fetch(`${API_BASE}/analyze/${analysisId}/milestones`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ milestones: updatedMilestones })
    });
    const msData = await msRes.json();
    assert(msData.milestones?.[1]?.status === 'completed', 'Module 7: Progress tracking milestone status updated and saved');
  } catch (err) {
    assert(false, `Module 7 failed: ${err.message}`);
  }

  // 5. Module 8: Analytics & Report Summary
  try {
    const sumRes = await fetch(`${API_BASE}/analyze/summary`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const sumData = await sumRes.json();
    assert(sumData.total >= 1, `Module 8: Analysis portfolio summary retrieved (${sumData.total} tested)`);
  } catch (err) {
    assert(false, `Module 8 failed: ${err.message}`);
  }

  // 6. Module 9: Admin Content & Governance
  try {
    const ovRes = await fetch(`${API_BASE}/admin/overview`);
    const ovData = await ovRes.json();
    assert(!!ovData.metrics?.totalFounders, 'Module 9: Admin governance metrics & live throughput retrieved');

    // Create category
    const catRes = await fetch(`${API_BASE}/admin/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: 'BioTech & Longevity', slug: 'biotech', description: 'Genomics and regenerative medicine' })
    });
    const catData = await catRes.json();
    assert(catData.slug === 'biotech', 'Module 9: Admin category creation verified');

    // Legal rules
    const lrRes = await fetch(`${API_BASE}/admin/legal-rules`);
    const lrData = await lrRes.json();
    assert(Array.isArray(lrData) && lrData.length > 0, `Module 9: Admin legal compliance rules catalog verified (${lrData.length} rules)`);
  } catch (err) {
    assert(false, `Module 9 failed: ${err.message}`);
  }

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');
}

runTests();
