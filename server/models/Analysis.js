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
    strengths: [{ type: String }],
    risks: [{ type: String }],
    suggestedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }],
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
