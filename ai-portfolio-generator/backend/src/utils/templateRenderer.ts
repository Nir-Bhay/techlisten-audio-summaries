import Handlebars from 'handlebars';

// Register Handlebars helpers
Handlebars.registerHelper('join', function(array: string[], separator: string) {
  return array ? array.join(separator) : '';
});

// Modern Minimal Template
const modernMinimalTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{name}} - {{role}}</title>
  <meta name="description" content="{{bio}}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f9fafb;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
      color: white;
      padding: 60px 20px;
      text-align: center;
      border-radius: 12px;
      margin-bottom: 40px;
    }
    h1 { font-size: 3rem; margin-bottom: 10px; }
    h2 { 
      font-size: 1.5rem; 
      color: #1E3A8A;
      margin: 40px 0 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #F59E0B;
    }
    .subtitle { font-size: 1.5rem; opacity: 0.9; }
    .bio { font-size: 1.2rem; margin: 20px 0; opacity: 0.95; }
    .section {
      background: white;
      padding: 30px;
      margin-bottom: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-tag {
      background: #1E3A8A;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
    }
    .project, .experience-item, .education-item {
      margin-bottom: 25px;
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
      border-left: 4px solid #F59E0B;
    }
    .project h3, .experience-item h3, .education-item h3 {
      color: #1E3A8A;
      margin-bottom: 8px;
    }
    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .tech-tag {
      background: #F59E0B;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
    }
    .contact {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }
    .contact a {
      color: #1E3A8A;
      text-decoration: none;
      font-weight: 500;
      padding: 10px 20px;
      background: #f9fafb;
      border-radius: 8px;
      transition: all 0.3s;
    }
    .contact a:hover {
      background: #1E3A8A;
      color: white;
    }
    footer {
      text-align: center;
      padding: 40px 20px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>{{name}}</h1>
      <div class="subtitle">{{role}}</div>
      {{#if bio}}
      <p class="bio">{{bio}}</p>
      {{/if}}
    </header>

    {{#if skills}}
    <section class="section">
      <h2>Skills</h2>
      <div class="skills">
        {{#each skills}}
        <span class="skill-tag">{{this}}</span>
        {{/each}}
      </div>
    </section>
    {{/if}}

    {{#if projects}}
    <section class="section">
      <h2>Projects</h2>
      {{#each projects}}
      <div class="project">
        <h3>{{title}}</h3>
        <p>{{description}}</p>
        {{#if technologies}}
        <div class="technologies">
          {{#each technologies}}
          <span class="tech-tag">{{this}}</span>
          {{/each}}
        </div>
        {{/if}}
        {{#if link}}
        <p style="margin-top: 10px;"><a href="{{link}}" target="_blank">View Project →</a></p>
        {{/if}}
      </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if experience}}
    <section class="section">
      <h2>Experience</h2>
      {{#each experience}}
      <div class="experience-item">
        <h3>{{position}} at {{company}}</h3>
        <p style="color: #666; margin-bottom: 8px;">{{duration}}</p>
        <p>{{description}}</p>
      </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if education}}
    <section class="section">
      <h2>Education</h2>
      {{#each education}}
      <div class="education-item">
        <h3>{{degree}}</h3>
        <p style="color: #666;">{{institution}} | {{year}}</p>
      </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if contact}}
    <section class="section">
      <h2>Contact</h2>
      <div class="contact">
        {{#if contact.email}}
        <a href="mailto:{{contact.email}}">📧 Email</a>
        {{/if}}
        {{#if contact.linkedin}}
        <a href="{{contact.linkedin}}" target="_blank">💼 LinkedIn</a>
        {{/if}}
        {{#if contact.github}}
        <a href="{{contact.github}}" target="_blank">💻 GitHub</a>
        {{/if}}
        {{#if contact.website}}
        <a href="{{contact.website}}" target="_blank">🌐 Website</a>
        {{/if}}
      </div>
    </section>
    {{/if}}

    <footer>
      <p>© {{name}} | Generated with AI Portfolio Generator</p>
    </footer>
  </div>
</body>
</html>
`;

const templates: { [key: string]: string } = {
  'modern-minimal': modernMinimalTemplate,
  'creative-bold': modernMinimalTemplate, // Use same for now
  'professional-classic': modernMinimalTemplate,
  'tech-futuristic': modernMinimalTemplate,
  'portfolio-showcase': modernMinimalTemplate,
};

export const generatePortfolioHTML = async (data: any, templateId: string = 'modern-minimal'): Promise<string> => {
  const templateSource = templates[templateId] || templates['modern-minimal'];
  const template = Handlebars.compile(templateSource);
  return template(data);
};
