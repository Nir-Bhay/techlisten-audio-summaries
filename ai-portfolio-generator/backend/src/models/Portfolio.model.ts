import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    image?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  contact: {
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  template: string;
  htmlContent: string;
  publishedUrl?: string;
  seoSettings: {
    title: string;
    description: string;
    keywords: string[];
  };
  analytics: {
    views: number;
    lastViewed?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  role: String,
  bio: String,
  skills: [String],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String,
    image: String,
  }],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String,
  }],
  education: [{
    institution: String,
    degree: String,
    year: String,
  }],
  contact: {
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    website: String,
  },
  template: {
    type: String,
    default: 'modern-minimal',
  },
  htmlContent: {
    type: String,
    default: '',
  },
  publishedUrl: String,
  seoSettings: {
    title: String,
    description: String,
    keywords: [String],
  },
  analytics: {
    views: {
      type: Number,
      default: 0,
    },
    lastViewed: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
