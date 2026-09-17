import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    eligibility: { type: String, required: true },
    fundingAmount: { type: String, required: true },
    applicableCategories: [{ type: String, trim: true }],
    applicableStages: [{ type: String, trim: true }],
    officialLink: { type: String, trim: true },
    region: { type: String, trim: true },
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Scheme || mongoose.model('Scheme', schemeSchema);
