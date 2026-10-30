import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, lowercase: true },
    type: { type: String, default: 'Guide' }, // Guide, Template, Calculator, Policy
    summary: { type: String, default: '' },
    link: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
