import { Request, Response } from 'express';
import Portfolio from '../models/Portfolio.model';

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { portfolioId } = req.params;
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

    // Generate mock analytics data
    // In production, this would come from a real analytics service
    const analytics = {
      totalViews: portfolio.analytics.views,
      avgTimeOnPage: '2:34',
      topSections: [
        { name: 'Projects', views: Math.floor(portfolio.analytics.views * 0.35) },
        { name: 'About', views: Math.floor(portfolio.analytics.views * 0.30) },
        { name: 'Skills', views: Math.floor(portfolio.analytics.views * 0.25) },
        { name: 'Experience', views: Math.floor(portfolio.analytics.views * 0.10) },
      ],
      viewsByDay: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 100),
      },
      topLocations: [
        { country: 'United States', views: Math.floor(portfolio.analytics.views * 0.40) },
        { country: 'United Kingdom', views: Math.floor(portfolio.analytics.views * 0.20) },
        { country: 'Canada', views: Math.floor(portfolio.analytics.views * 0.15) },
        { country: 'Germany', views: Math.floor(portfolio.analytics.views * 0.10) },
      ],
    };

    res.json({
      success: true,
      analytics,
    });
  } catch (error: any) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
    });
  }
};
