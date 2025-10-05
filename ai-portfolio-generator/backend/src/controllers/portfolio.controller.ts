import { Request, Response } from 'express';
import Handlebars from 'handlebars';
import Portfolio from '../models/Portfolio.model';
import { generatePortfolioHTML } from '../utils/templateRenderer';

export const renderPortfolio = async (req: Request, res: Response) => {
  try {
    const { portfolioData, templateId } = req.body;

    if (!portfolioData) {
      return res.status(400).json({
        success: false,
        error: 'Portfolio data is required',
      });
    }

    // Generate HTML from template
    const html = await generatePortfolioHTML(portfolioData, templateId || 'modern-minimal');

    res.json({
      success: true,
      html,
    });
  } catch (error: any) {
    console.error('Render error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to render portfolio',
      details: error.message,
    });
  }
};

export const savePortfolio = async (req: Request, res: Response) => {
  try {
    const { portfolioData } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    const portfolio = await Portfolio.create({
      userId,
      ...portfolioData,
    });

    res.json({
      success: true,
      portfolio,
    });
  } catch (error: any) {
    console.error('Save error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save portfolio',
    });
  }
};

export const publishPortfolio = async (req: Request, res: Response) => {
  try {
    const { portfolioId, customDomain } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    const portfolio = await Portfolio.findOne({ _id: portfolioId, userId });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found',
      });
    }

    // Generate unique URL
    const uniqueId = customDomain || portfolio._id.toString();
    const publishedUrl = `https://ai-portfolio.app/${uniqueId}`;

    // TODO: Upload to S3 or hosting service
    // For now, just save the URL
    portfolio.publishedUrl = publishedUrl;
    await portfolio.save();

    res.json({
      success: true,
      url: publishedUrl,
    });
  } catch (error: any) {
    console.error('Publish error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to publish portfolio',
    });
  }
};

export const getPortfolios = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    const portfolios = await Portfolio.find({ userId }).sort({ updatedAt: -1 });

    res.json({
      success: true,
      portfolios,
    });
  } catch (error: any) {
    console.error('Get portfolios error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolios',
    });
  }
};

export const getPortfolioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found',
      });
    }

    // Increment view count
    portfolio.analytics.views += 1;
    portfolio.analytics.lastViewed = new Date();
    await portfolio.save();

    res.json({
      success: true,
      portfolio,
    });
  } catch (error: any) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio',
    });
  }
};
