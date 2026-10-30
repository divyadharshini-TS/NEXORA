import mongoose from 'mongoose';

const legalRuleSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true, lowercase: true },
    ruleName: { type: String, required: true, trim: true },
    complianceType: { type: String, default: 'Statutory License' }, // License, Tax, Data Privacy, IP
    mandatory: { type: Boolean, default: true },
    description: { type: String, default: '' },
    officialSource: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.LegalRule || mongoose.model('LegalRule', legalRuleSchema);
