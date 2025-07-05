import { ResumeData, AIEnhancedContent } from '../types/resume';

export const portfolioService = {
  generatePortfolioHTML(resumeData: ResumeData, aiEnhancedContent: AIEnhancedContent | null): string {
    const displayContent = aiEnhancedContent || {
      careerSummary: resumeData.careerObjective,
      enhancedSkills: [...resumeData.skills.technical, ...resumeData.skills.soft],
      optimizedProjects: resumeData.projects,
      professionalExperience: resumeData.experience,
      portfolioIntro: ''
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.fullName} - Portfolio</title>
    <meta name="description" content="${displayContent.portfolioIntro || displayContent.careerSummary}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Header */
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0; text-align: center; }
        .header h1 { font-size: 3rem; margin-bottom: 20px; font-weight: 700; }
        .header p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
        .contact-links { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .contact-link { color: white; text-decoration: none; padding: 10px 20px; border: 2px solid white; border-radius: 25px; transition: all 0.3s; }
        .contact-link:hover { background: white; color: #667eea; }
        
        /* Navigation */
        .nav { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000; }
        .nav ul { display: flex; justify-content: center; list-style: none; padding: 15px 0; }
        .nav li { margin: 0 30px; }
        .nav a { text-decoration: none; color: #333; font-weight: 500; transition: color 0.3s; }
        .nav a:hover { color: #667eea; }
        
        /* Sections */
        .section { padding: 80px 0; }
        .section:nth-child(even) { background: #f8f9fa; }
        .section h2 { text-align: center; font-size: 2.5rem; margin-bottom: 50px; color: #333; }
        
        /* About */
        .about-content { max-width: 800px; margin: 0 auto; text-align: center; font-size: 1.1rem; }
        
        /* Skills */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 50px; }
        .skill-category { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .skill-category h3 { margin-bottom: 20px; color: #667eea; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-tag { background: #e9ecef; padding: 8px 15px; border-radius: 20px; font-size: 0.9rem; }
        
        /* Projects */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-top: 50px; }
        .project-card { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .project-card:hover { transform: translateY(-5px); }
        .project-content { padding: 30px; }
        .project-title { font-size: 1.3rem; margin-bottom: 15px; color: #333; }
        .project-description { color: #666; margin-bottom: 20px; }
        .project-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .tech-tag { background: #667eea; color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.8rem; }
        .project-links { display: flex; gap: 15px; }
        .project-link { color: #667eea; text-decoration: none; font-weight: 500; }
        .project-link:hover { text-decoration: underline; }
        
        /* Experience */
        .experience-timeline { max-width: 800px; margin: 0 auto; }
        .experience-item { margin-bottom: 40px; padding: 30px; background: white; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .experience-header { display: flex; justify-content: space-between; margin-bottom: 15px; align-items: start; }
        .job-title { font-size: 1.2rem; font-weight: 600; color: #333; }
        .company { color: #667eea; font-weight: 500; }
        .duration { color: #666; font-size: 0.9rem; }
        
        /* Footer */
        .footer { background: #333; color: white; text-align: center; padding: 40px 0; }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .nav ul { flex-direction: column; text-align: center; }
            .nav li { margin: 10px 0; }
            .experience-header { flex-direction: column; }
            .contact-links { flex-direction: column; align-items: center; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>${resumeData.personalInfo.fullName}</h1>
            <p>${displayContent.portfolioIntro || displayContent.careerSummary || 'Professional Developer & Designer'}</p>
            <div class="contact-links">
                ${resumeData.personalInfo.email ? `<a href="mailto:${resumeData.personalInfo.email}" class="contact-link">Email</a>` : ''}
                ${resumeData.personalInfo.linkedIn ? `<a href="${resumeData.personalInfo.linkedIn}" class="contact-link" target="_blank">LinkedIn</a>` : ''}
                ${resumeData.personalInfo.github ? `<a href="${resumeData.personalInfo.github}" class="contact-link" target="_blank">GitHub</a>` : ''}
                ${resumeData.personalInfo.website ? `<a href="${resumeData.personalInfo.website}" class="contact-link" target="_blank">Website</a>` : ''}
            </div>
        </div>
    </header>

    <nav class="nav">
        <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <section id="about" class="section">
        <div class="container">
            <h2>About Me</h2>
            <div class="about-content">
                <p>${displayContent.careerSummary || 'I am a passionate developer with experience in creating innovative solutions and bringing ideas to life through code.'}</p>
            </div>
        </div>
    </section>

    ${(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) ? `
    <section id="skills" class="section">
        <div class="container">
            <h2>Skills</h2>
            <div class="skills-grid">
                ${resumeData.skills.technical.length > 0 ? `
                <div class="skill-category">
                    <h3>Technical Skills</h3>
                    <div class="skill-tags">
                        ${resumeData.skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                ${resumeData.skills.soft.length > 0 ? `
                <div class="skill-category">
                    <h3>Soft Skills</h3>
                    <div class="skill-tags">
                        ${resumeData.skills.soft.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    </section>
    ` : ''}

    ${displayContent.optimizedProjects.length > 0 ? `
    <section id="projects" class="section">
        <div class="container">
            <h2>Projects</h2>
            <div class="projects-grid">
                ${displayContent.optimizedProjects.map(project => `
                <div class="project-card">
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">Live Demo</a>` : ''}
                            ${project.github ? `<a href="${project.github}" class="project-link" target="_blank">GitHub</a>` : ''}
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${displayContent.professionalExperience.length > 0 ? `
    <section id="experience" class="section">
        <div class="container">
            <h2>Experience</h2>
            <div class="experience-timeline">
                ${displayContent.professionalExperience.map(exp => `
                <div class="experience-item">
                    <div class="experience-header">
                        <div>
                            <div class="job-title">${exp.position}</div>
                            <div class="company">${exp.company}</div>
                        </div>
                        <div class="duration">${exp.duration}</div>
                    </div>
                    <p>${exp.description}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <section id="contact" class="section">
        <div class="container">
            <h2>Get In Touch</h2>
            <div class="about-content">
                <p>I'm always interested in new opportunities and collaborations. Feel free to reach out!</p>
                <div class="contact-links" style="margin-top: 30px;">
                    ${resumeData.personalInfo.email ? `<a href="mailto:${resumeData.personalInfo.email}" class="contact-link">Email Me</a>` : ''}
                    ${resumeData.personalInfo.linkedIn ? `<a href="${resumeData.personalInfo.linkedIn}" class="contact-link" target="_blank">LinkedIn</a>` : ''}
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${resumeData.personalInfo.fullName}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
    `;
  },

  downloadPortfolio(resumeData: ResumeData, aiEnhancedContent: AIEnhancedContent | null): void {
    const htmlContent = this.generatePortfolioHTML(resumeData, aiEnhancedContent);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'portfolio'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};