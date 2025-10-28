import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['fertilizer', 'pesticide', 'other'], default: 'other' },
  activeIngredients: { type: String },
  approval: { type: String },
  priceMRP: { type: String },
  vendorInfo: [{ name: String, location: String, contact: String }]
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
