import mongoose from 'mongoose';

const savedSchemeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    schemeId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.SavedScheme || mongoose.model('SavedScheme', savedSchemeSchema);
