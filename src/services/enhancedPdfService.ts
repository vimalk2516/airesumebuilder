import html2pdf from 'html2pdf.js';
import { ResumeData, AIEnhancedContent } from '../types/resume';

export const enhancedPdfService = {
  async generatePDF(resumeData: ResumeData, aiEnhancedContent: AIEnhancedContent | null, templateId: string = 'modern-glass'): Promise<void> {
    const element = document.createElement('div');
    element.innerHTML = this.generateTemplateHTML(resumeData, aiEnhancedContent, templateId);
    
    const opt = {
      margin: [0.3, 0.3, 0.3, 0.3],
      filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}_${templateId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 3,
        useCORS: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        compress: true
      }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  },

  generateTemplateHTML(resumeData: ResumeData, aiEnhancedContent: AIEnhancedContent | null, templateId: string): string {
    const displayContent = aiEnhancedContent || {
      careerSummary: resumeData.careerObjective,
      enhancedSkills: [...resumeData.skills.technical, ...resumeData.skills.soft],
      optimizedProjects: resumeData.projects,
      professionalExperience: resumeData.experience,
      portfolioIntro: ''
    };

    switch (templateId) {
      case 'modern-glass':
        return this.generateModernGlassTemplate(resumeData, displayContent);
      case 'executive-pro':
        return this.generateExecutiveProTemplate(resumeData, displayContent);
      case 'creative-edge':
        return this.generateCreativeEdgeTemplate(resumeData, displayContent);
      default:
        return this.generateModernGlassTemplate(resumeData, displayContent);
    }
  },

  generateModernGlassTemplate(resumeData: ResumeData, displayContent: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${resumeData.personalInfo.fullName} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; 
          line-height: 1.6; 
          color: #1f2937; 
          font-size: 11px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        
        .container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.4in;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }
        
        .header { 
          text-align: center;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 25px; 
          margin-bottom: 25px; 
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          pointer-events: none;
        }
        
        .name { 
          font-size: 28px; 
          font-weight: 800; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          letter-spacing: 1px;
          position: relative;
          z-index: 1;
        }
        
        .contact { 
          display: flex; 
          justify-content: center;
          flex-wrap: wrap; 
          gap: 20px; 
          font-size: 10px; 
          color: #4b5563;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        
        .contact-item { 
          display: flex; 
          align-items: center; 
          gap: 5px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          padding: 5px 12px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .contact-item a {
          color: #667eea;
          text-decoration: none;
        }
        
        .section { 
          margin-bottom: 20px; 
          page-break-inside: avoid;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }
        
        .section-title { 
          font-size: 16px; 
          font-weight: 700; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px; 
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
        }
        
        .experience-item, .project-item, .education-item, .cert-item { 
          margin-bottom: 15px; 
          padding: 15px; 
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          page-break-inside: avoid;
          position: relative;
        }
        
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          margin-bottom: 8px; 
        }
        
        .item-title { 
          font-weight: 700; 
          color: #1f2937; 
          font-size: 13px;
        }
        
        .item-company { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600; 
          font-size: 11px;
        }
        
        .item-duration { 
          color: #6b7280; 
          font-size: 10px;
          text-align: right;
          white-space: nowrap;
          background: rgba(102, 126, 234, 0.1);
          padding: 4px 8px;
          border-radius: 8px;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        .item-description { 
          color: #374151; 
          font-size: 10px; 
          line-height: 1.5;
          text-align: justify;
          margin-top: 5px;
        }
        
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .skills-category {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          padding: 15px;
        }
        
        .skills-category-title {
          font-weight: 600;
          font-size: 12px;
          color: #1f2937;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .skills-grid { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 6px; 
        }
        
        .skill-tag { 
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          backdrop-filter: blur(5px);
          color: #1f2937; 
          padding: 4px 10px; 
          border-radius: 12px; 
          font-size: 9px;
          border: 1px solid rgba(102, 126, 234, 0.2);
          font-weight: 500;
        }
        
        .tech-tags { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 4px; 
          margin-top: 8px; 
        }
        
        .tech-tag { 
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          backdrop-filter: blur(5px);
          color: #374151; 
          padding: 2px 8px; 
          border-radius: 10px; 
          font-size: 8px;
          border: 1px solid rgba(102, 126, 234, 0.3);
        }
        
        .summary-text {
          font-size: 11px;
          line-height: 1.6;
          color: #374151;
          text-align: justify;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          padding: 15px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        
        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        @media print {
          body { 
            font-size: 10px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            padding: 0.3in;
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">${resumeData.personalInfo.fullName}</div>
          <div class="contact">
            ${resumeData.personalInfo.email ? `<div class="contact-item">📧 <a href="mailto:${resumeData.personalInfo.email}">${resumeData.personalInfo.email}</a></div>` : ''}
            ${resumeData.personalInfo.phone ? `<div class="contact-item">📱 ${resumeData.personalInfo.phone}</div>` : ''}
            ${resumeData.personalInfo.location ? `<div class="contact-item">📍 ${resumeData.personalInfo.location}</div>` : ''}
          </div>
          <div class="contact">
            ${resumeData.personalInfo.linkedIn ? `<div class="contact-item">💼 <a href="${resumeData.personalInfo.linkedIn}">LinkedIn</a></div>` : ''}
            ${resumeData.personalInfo.github ? `<div class="contact-item">🔗 <a href="${resumeData.personalInfo.github}">GitHub</a></div>` : ''}
            ${resumeData.personalInfo.website ? `<div class="contact-item">🌐 <a href="${resumeData.personalInfo.website}">Portfolio</a></div>` : ''}
          </div>
        </div>

        ${displayContent.careerSummary ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="summary-text">${displayContent.careerSummary}</div>
          </div>
        ` : ''}

        ${displayContent.professionalExperience.length > 0 ? `
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${displayContent.professionalExperience.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>
                  </div>
                  <div class="item-duration">${exp.duration}</div>
                </div>
                <div class="item-description">${exp.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${displayContent.optimizedProjects.length > 0 ? `
          <div class="section">
            <div class="section-title">Featured Projects</div>
            ${displayContent.optimizedProjects.map(project => `
              <div class="project-item">
                <div class="item-header">
                  <div class="item-title">${project.title}</div>
                </div>
                <div class="item-description">${project.description}</div>
                ${project.technologies.length > 0 ? `
                  <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="two-column">
          ${resumeData.education.length > 0 ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${resumeData.education.map(edu => `
                <div class="education-item">
                  <div class="item-header">
                    <div>
                      <div class="item-title">${edu.degree}</div>
                      <div class="item-company">${edu.institution}</div>
                      ${edu.honors ? `<div style="font-size: 9px; color: #6b7280; margin-top: 2px;">${edu.honors}</div>` : ''}
                    </div>
                    <div class="item-duration">
                      ${edu.year}
                      ${edu.gpa ? `<br>GPA: ${edu.gpa}` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) ? `
            <div class="section">
              <div class="section-title">Core Skills</div>
              <div class="skills-container">
                ${resumeData.skills.technical.length > 0 ? `
                  <div class="skills-category">
                    <div class="skills-category-title">Technical Expertise</div>
                    <div class="skills-grid">
                      ${resumeData.skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                  </div>
                ` : ''}
                ${resumeData.skills.soft.length > 0 ? `
                  <div class="skills-category">
                    <div class="skills-category-title">Professional Skills</div>
                    <div class="skills-grid">
                      ${resumeData.skills.soft.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}
        </div>

        ${resumeData.certifications.length > 0 ? `
          <div class="section">
            <div class="section-title">Certifications & Credentials</div>
            ${resumeData.certifications.map(cert => `
              <div class="cert-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${cert.name}</div>
                    <div class="item-company">${cert.issuer}</div>
                  </div>
                  <div class="item-duration">
                    ${cert.date}
                    ${cert.expiryDate ? `<br>Expires: ${cert.expiryDate}` : ''}
                  </div>
                </div>
                ${cert.credentialId ? `<div class="item-description">Credential ID: ${cert.credentialId}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resumeData.languages.length > 0 ? `
          <div class="section">
            <div class="section-title">Languages</div>
            <div class="skills-grid">
              ${resumeData.languages.map(lang => `<span class="skill-tag">${lang}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
    `;
  },

  generateExecutiveProTemplate(resumeData: ResumeData, displayContent: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${resumeData.personalInfo.fullName} - Executive Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Georgia', 'Times New Roman', serif; 
          line-height: 1.6; 
          color: #2c3e50; 
          font-size: 11px;
          background: #f8f9fa;
        }
        
        .container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.5in;
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        .header { 
          text-align: center;
          border-bottom: 3px solid #2c3e50;
          padding-bottom: 20px; 
          margin-bottom: 25px; 
        }
        
        .name { 
          font-size: 32px; 
          font-weight: bold; 
          color: #2c3e50; 
          margin-bottom: 10px;
          letter-spacing: 2px;
        }
        
        .contact { 
          display: flex; 
          justify-content: center;
          flex-wrap: wrap; 
          gap: 25px; 
          font-size: 11px; 
          color: #34495e;
          font-family: 'Arial', sans-serif;
        }
        
        .section { 
          margin-bottom: 25px; 
          page-break-inside: avoid;
        }
        
        .section-title { 
          font-size: 16px; 
          font-weight: bold; 
          color: #2c3e50; 
          margin-bottom: 15px; 
          border-bottom: 2px solid #bdc3c7; 
          padding-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .experience-item, .education-item { 
          margin-bottom: 20px; 
          padding-bottom: 15px;
          border-bottom: 1px solid #ecf0f1;
        }
        
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          margin-bottom: 10px; 
        }
        
        .item-title { 
          font-weight: bold; 
          color: #2c3e50; 
          font-size: 14px;
        }
        
        .item-company { 
          color: #34495e; 
          font-weight: 600; 
          font-size: 12px;
          font-style: italic;
        }
        
        .item-duration { 
          color: #7f8c8d; 
          font-size: 10px;
          text-align: right;
          font-family: 'Arial', sans-serif;
        }
        
        .summary-text {
          font-size: 12px;
          line-height: 1.7;
          color: #2c3e50;
          text-align: justify;
          font-style: italic;
          border-left: 4px solid #3498db;
          padding-left: 20px;
          margin: 15px 0;
        }
        
        .skills-grid { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 8px; 
        }
        
        .skill-tag { 
          background: #ecf0f1; 
          color: #2c3e50; 
          padding: 6px 12px; 
          border-radius: 4px; 
          font-size: 10px;
          font-family: 'Arial', sans-serif;
          border: 1px solid #bdc3c7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">${resumeData.personalInfo.fullName}</div>
          <div class="contact">
            ${resumeData.personalInfo.email ? `<span>${resumeData.personalInfo.email}</span>` : ''}
            ${resumeData.personalInfo.phone ? `<span>${resumeData.personalInfo.phone}</span>` : ''}
            ${resumeData.personalInfo.location ? `<span>${resumeData.personalInfo.location}</span>` : ''}
            ${resumeData.personalInfo.linkedIn ? `<span>LinkedIn Profile</span>` : ''}
          </div>
        </div>

        ${displayContent.careerSummary ? `
          <div class="section">
            <div class="section-title">Executive Summary</div>
            <div class="summary-text">${displayContent.careerSummary}</div>
          </div>
        ` : ''}

        ${displayContent.professionalExperience.length > 0 ? `
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${displayContent.professionalExperience.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}</div>
                  </div>
                  <div class="item-duration">${exp.duration}</div>
                </div>
                <div style="font-size: 11px; line-height: 1.6; text-align: justify;">${exp.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resumeData.education.length > 0 ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${resumeData.education.map(edu => `
              <div class="education-item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-company">${edu.institution}</div>
                  </div>
                  <div class="item-duration">${edu.year}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) ? `
          <div class="section">
            <div class="section-title">Core Competencies</div>
            <div class="skills-grid">
              ${[...resumeData.skills.technical, ...resumeData.skills.soft].map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
    `;
  },

  generateCreativeEdgeTemplate(resumeData: ResumeData, displayContent: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${resumeData.personalInfo.fullName} - Creative Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          font-family: 'Helvetica Neue', 'Arial', sans-serif; 
          line-height: 1.5; 
          color: #333; 
          font-size: 11px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          background-size: 400% 400%;
        }
        
        .container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.4in;
          background: white;
          position: relative;
          overflow: hidden;
        }
        
        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
        }
        
        .header { 
          text-align: left;
          padding: 25px 0; 
          margin-bottom: 25px; 
          position: relative;
        }
        
        .name { 
          font-size: 36px; 
          font-weight: 900; 
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }
        
        .contact { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 15px; 
          font-size: 10px; 
          color: #666;
        }
        
        .contact-item {
          background: #f8f9fa;
          padding: 5px 10px;
          border-radius: 20px;
          border-left: 3px solid #ff6b6b;
        }
        
        .section { 
          margin-bottom: 25px; 
          page-break-inside: avoid;
          position: relative;
        }
        
        .section-title { 
          font-size: 18px; 
          font-weight: 800; 
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px; 
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          border-radius: 2px;
        }
        
        .experience-item, .project-item { 
          margin-bottom: 20px; 
          padding: 20px; 
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 15px;
          border-left: 5px solid #ff6b6b;
          position: relative;
          overflow: hidden;
        }
        
        .experience-item::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(30px, -30px);
        }
        
        .item-title { 
          font-weight: 700; 
          color: #333; 
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .item-company { 
          color: #ff6b6b; 
          font-weight: 600; 
          font-size: 12px;
        }
        
        .item-duration { 
          color: #666; 
          font-size: 10px;
          background: white;
          padding: 4px 8px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 5px;
        }
        
        .skills-grid { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 8px; 
        }
        
        .skill-tag { 
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4); 
          color: white; 
          padding: 6px 12px; 
          border-radius: 20px; 
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .summary-text {
          font-size: 12px;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px;
          border-radius: 15px;
          border-left: 5px solid #4ecdc4;
          position: relative;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">${resumeData.personalInfo.fullName}</div>
          <div class="contact">
            ${resumeData.personalInfo.email ? `<div class="contact-item">${resumeData.personalInfo.email}</div>` : ''}
            ${resumeData.personalInfo.phone ? `<div class="contact-item">${resumeData.personalInfo.phone}</div>` : ''}
            ${resumeData.personalInfo.location ? `<div class="contact-item">${resumeData.personalInfo.location}</div>` : ''}
          </div>
        </div>

        ${displayContent.careerSummary ? `
          <div class="section">
            <div class="section-title">Creative Vision</div>
            <div class="summary-text">${displayContent.careerSummary}</div>
          </div>
        ` : ''}

        ${displayContent.professionalExperience.length > 0 ? `
          <div class="section">
            <div class="section-title">Experience Journey</div>
            ${displayContent.professionalExperience.map(exp => `
              <div class="experience-item">
                <div class="item-title">${exp.position}</div>
                <div class="item-company">${exp.company}</div>
                <div class="item-duration">${exp.duration}</div>
                <div style="margin-top: 10px; font-size: 11px; line-height: 1.5;">${exp.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${displayContent.optimizedProjects.length > 0 ? `
          <div class="section">
            <div class="section-title">Featured Work</div>
            ${displayContent.optimizedProjects.map(project => `
              <div class="project-item">
                <div class="item-title">${project.title}</div>
                <div style="margin: 10px 0; font-size: 11px; line-height: 1.5;">${project.description}</div>
                <div class="skills-grid">
                  ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) ? `
          <div class="section">
            <div class="section-title">Skill Arsenal</div>
            <div class="skills-grid">
              ${[...resumeData.skills.technical, ...resumeData.skills.soft].map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
    `;
  }
};