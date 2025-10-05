import { Request, Response } from 'express';

const templates = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and minimalistic design perfect for developers',
    thumbnail: '/templates/modern-minimal.jpg',
    bestFor: ['Developers', 'Engineers', 'Tech Professionals'],
    htmlTemplate: 'modern-minimal.hbs',
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Vibrant and eye-catching for creative professionals',
    thumbnail: '/templates/creative-bold.jpg',
    bestFor: ['Designers', 'Artists', 'Creatives'],
    htmlTemplate: 'creative-bold.hbs',
  },
  {
    id: 'professional-classic',
    name: 'Professional Classic',
    description: 'Traditional and elegant for business professionals',
    thumbnail: '/templates/professional-classic.jpg',
    bestFor: ['Business', 'Consultants', 'Executives'],
    htmlTemplate: 'professional-classic.hbs',
  },
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    description: 'Modern tech-inspired design with animations',
    thumbnail: '/templates/tech-futuristic.jpg',
    bestFor: ['Data Scientists', 'AI Engineers', 'Tech Leaders'],
    htmlTemplate: 'tech-futuristic.hbs',
  },
  {
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    description: 'Image-heavy layout for visual portfolios',
    thumbnail: '/templates/portfolio-showcase.jpg',
    bestFor: ['Photographers', 'Graphic Designers', 'Illustrators'],
    htmlTemplate: 'portfolio-showcase.hbs',
  },
];

export const getTemplates = async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates',
    });
  }
};

export const getTemplateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = templates.find(t => t.id === id);

    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
      });
    }

    res.json({
      success: true,
      template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch template',
    });
  }
};
