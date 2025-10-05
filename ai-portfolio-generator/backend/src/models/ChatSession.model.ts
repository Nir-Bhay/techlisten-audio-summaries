import mongoose, { Document, Schema } from 'mongoose';

export interface IChatSession extends Document {
  userId?: mongoose.Types.ObjectId;
  portfolioId?: mongoose.Types.ObjectId;
  messages: Array<{
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>;
  extractedData: {
    name?: string;
    role?: string;
    bio?: string;
    skills?: string[];
    projects?: any[];
    experience?: any[];
    education?: any[];
    contact?: any;
  };
  currentStep: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  portfolioId: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'ai'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  extractedData: {
    name: String,
    role: String,
    bio: String,
    skills: [String],
    projects: [Schema.Types.Mixed],
    experience: [Schema.Types.Mixed],
    education: [Schema.Types.Mixed],
    contact: Schema.Types.Mixed,
  },
  currentStep: {
    type: Number,
    default: 1,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
