import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    investmentAmount: { type: Number, required: true },
    targetLocation: { type: String, required: true, trim: true },
    targetCustomers: { type: String, required: true, trim: true },
    businessStage: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    aiScore: { type: Number, default: 0 },
    isViable: { type: Boolean, default: true },
    viabilityReason: { type: String, default: '' },
    marketDemand: { type: String, default: 'Moderate' },
    riskProfile: { type: String, default: 'Moderate' },
    breakdown: { type: mongoose.Schema.Types.Mixed, default: {} },
    strengths: [{ type: String }],
    risks: [{ type: String }],
    improvements: [{ type: String }],
    competitors: [{ type: mongoose.Schema.Types.Mixed }],
    sentimentAnalysis: { type: mongoose.Schema.Types.Mixed, default: {} },
    dynamicPricing: { type: mongoose.Schema.Types.Mixed, default: {} },
    financialForecast: { type: mongoose.Schema.Types.Mixed, default: {} },
    legalChecklist: [{ type: String }],
    milestones: [{ type: mongoose.Schema.Types.Mixed }],
    mlEngineResults: { type: mongoose.Schema.Types.Mixed, default: {} },
    suggestedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }],
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
