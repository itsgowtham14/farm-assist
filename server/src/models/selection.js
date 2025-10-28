import mongoose from 'mongoose';

const SelectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state: { 
    type: String, 
    required: true,
    trim: true
  },
  crop: { 
    type: String, 
    required: true,
    trim: true
  },
  season: { 
    type: String, 
    required: true,
    enum: ['Kharif', 'Rabi', 'Zaid'],
    trim: true
  },
  sowingDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        return v instanceof Date && !isNaN(v);
      },
      message: 'Invalid sowing date'
    }
  },
  area: { 
    type: Number, 
    required: true,
    min: [0.1, 'Area must be greater than 0'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'Area must be a positive number'
    }
  },
  status: { 
    type: String, 
    default: 'active',
    enum: ['active', 'completed', 'cancelled']
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add validation for valid state names
SelectionSchema.pre('save', async function(next) {
  try {
    if (this.isModified('state')) {
      const State = mongoose.model('State');
      const stateExists = await State.findOne({ name: this.state });
      if (!stateExists) {
        throw new Error('Invalid state selected');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Selection', SelectionSchema);
