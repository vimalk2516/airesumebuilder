import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData, AIEnhancedContent } from '../types/resume';

// Get API key from environment or fallback
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCGNfzPnoylWkWtWeDgpdr6noXJ0BJgiww';

if (!API_KEY) {
  console.warn('Gemini API key not found');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiService = {
  async enhanceResume(resumeData: ResumeData): Promise<AIEnhancedContent> {
    if (!API_KEY) {
      throw new Error('Gemini API key not configured. Please add your API key to continue.');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a professional resume writer with 15+ years of experience. Create concise, impactful enhancements for this resume that will impress recruiters and pass ATS systems.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

ENHANCEMENT REQUIREMENTS:

1. CAREER SUMMARY (2-3 sentences max):
- Start with years of experience and key expertise
- Include 1-2 quantified achievements
- Use industry keywords for ATS optimization

2. EXPERIENCE DESCRIPTIONS (keep concise):
- Use strong action verbs (Led, Developed, Implemented, Achieved)
- Include specific metrics and percentages
- Highlight key technologies and impact
- Maximum 2-3 bullet points per role

3. PROJECT DESCRIPTIONS (brief but impactful):
- Emphasize technical complexity and business value
- Include user impact metrics
- Show problem-solving approach

4. SKILLS (relevant and current):
- Add trending technologies in their field
- Balance technical and soft skills
- Remove outdated or irrelevant skills

Return ONLY this JSON structure (no markdown, no extra text):
{
  "careerSummary": "Concise 2-3 sentence professional summary with quantified achievements",
  "enhancedSkills": ["comprehensive relevant skills list"],
  "optimizedProjects": [
    {
      "id": "project_id",
      "title": "Enhanced project title",
      "description": "Concise description with technical details and impact metrics (max 2 sentences)",
      "technologies": ["tech1", "tech2"],
      "link": "project_link",
      "github": "github_link"
    }
  ],
  "professionalExperience": [
    {
      "id": "exp_id",
      "company": "company_name",
      "position": "position_title", 
      "duration": "duration",
      "location": "location",
      "description": "Concise description with quantified achievements (max 3 bullet points)",
      "achievements": ["specific achievement 1", "specific achievement 2"]
    }
  ],
  "portfolioIntro": "Brief SEO-optimized portfolio introduction (1 sentence)"
}
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }
      
      const enhancedContent = JSON.parse(jsonMatch[0]);
      
      if (!enhancedContent.careerSummary || !enhancedContent.enhancedSkills) {
        throw new Error('Invalid response structure from Gemini API');
      }
      
      return enhancedContent;
    } catch (error) {
      console.error('Error enhancing resume with Gemini:', error);
      throw new Error('Failed to enhance resume. Please check your API key and try again.');
    }
  },

  async parseResumeText(resumeText: string): Promise<ResumeData> {
    if (!API_KEY) {
      throw new Error('Gemini API key not configured. Please add your API key to continue.');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are an expert resume parser. Extract ALL information from this resume text with 100% accuracy and structure it properly.

RESUME TEXT:
${resumeText}

EXTRACTION RULES:
1. Extract EXACTLY what is written - don't invent information
2. Preserve original formatting for dates and durations
3. Include ALL skills mentioned anywhere in the resume
4. Extract complete job descriptions and project details
5. Capture all contact information accurately
6. If information is missing, leave fields empty rather than guessing

Return data in this EXACT JSON format (no markdown, no extra text):
{
  "personalInfo": {
    "fullName": "Exact full name from resume",
    "email": "Exact email address",
    "phone": "Exact phone number",
    "location": "Exact location/address",
    "linkedIn": "LinkedIn URL if found",
    "github": "GitHub URL if found", 
    "website": "Website URL if found"
  },
  "careerObjective": "Exact career objective/summary text",
  "education": [
    {
      "id": "edu_1",
      "degree": "Exact degree name",
      "institution": "Exact institution name",
      "year": "Exact graduation year/date",
      "gpa": "Exact GPA if mentioned",
      "honors": "Exact honors/awards if mentioned"
    }
  ],
  "experience": [
    {
      "id": "exp_1", 
      "company": "Exact company name",
      "position": "Exact job title",
      "duration": "Exact employment duration",
      "location": "Exact job location",
      "description": "Complete job description with all details",
      "achievements": []
    }
  ],
  "projects": [
    {
      "id": "proj_1",
      "title": "Exact project name",
      "description": "Complete project description",
      "technologies": ["exact", "technologies", "listed"],
      "link": "Project URL if mentioned",
      "github": "GitHub URL if mentioned"
    }
  ],
  "skills": {
    "technical": ["all technical skills, languages, frameworks, tools"],
    "soft": ["all soft skills, leadership skills"]
  },
  "certifications": [
    {
      "id": "cert_1",
      "name": "Exact certification name",
      "issuer": "Exact issuing organization", 
      "date": "Exact issue date",
      "expiryDate": "Exact expiry date if mentioned",
      "credentialId": "Exact credential ID if mentioned"
    }
  ],
  "languages": ["Language1 (Proficiency)", "Language2 (Proficiency)"]
}

CRITICAL: Extract information EXACTLY as written. Do not modify, enhance, or invent details.
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse resume text. Please try uploading a different file.');
      }
      
      const parsedData = JSON.parse(jsonMatch[0]);
      
      if (!parsedData.personalInfo || !parsedData.personalInfo.fullName) {
        throw new Error('Could not extract personal information from resume. Please check the file quality.');
      }
      
      return parsedData;
    } catch (error) {
      console.error('Error parsing resume text:', error);
      throw new Error('Failed to parse resume content. Please try a different file or create from scratch.');
    }
  },

  async generateResumeFromPrompt(promptData: any): Promise<ResumeData> {
    if (!API_KEY) {
      throw new Error('Gemini API key not configured. Please add your API key to continue.');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
Create a professional, industry-standard resume based on this information. Make it comprehensive and ATS-friendly.

INPUT DATA:
Name: ${promptData.fullName}
Target Role: ${promptData.targetRole}
Experience: ${promptData.experience}
Education: ${promptData.education}
Skills: ${promptData.skills}
Achievements: ${promptData.achievements}
Additional Info: ${promptData.additionalInfo}

REQUIREMENTS:
1. Create realistic, professional content
2. Tailor everything to the target role: ${promptData.targetRole}
3. Include quantified achievements where possible
4. Use industry-standard terminology
5. Make descriptions detailed and impactful
6. Ensure ATS compatibility

Generate complete resume in this EXACT JSON format (no markdown, no extra text):
{
  "personalInfo": {
    "fullName": "${promptData.fullName}",
    "email": "professional.email@example.com",
    "phone": "+1 (555) 123-4567", 
    "location": "City, State",
    "linkedIn": "https://linkedin.com/in/profile",
    "github": "https://github.com/username",
    "website": "https://portfolio.com"
  },
  "careerObjective": "Professional career objective tailored to target role with industry keywords",
  "education": [
    {
      "id": "edu_1",
      "degree": "Relevant degree based on education info",
      "institution": "University/College name",
      "year": "Graduation year",
      "gpa": "3.8/4.0",
      "honors": "Relevant honors if applicable"
    }
  ],
  "experience": [
    {
      "id": "exp_1",
      "company": "Company name from experience",
      "position": "Job title relevant to target role",
      "duration": "Employment duration",
      "location": "Job location",
      "description": "Detailed job description with quantified achievements and industry keywords",
      "achievements": []
    }
  ],
  "projects": [
    {
      "id": "proj_1", 
      "title": "Project name based on achievements",
      "description": "Comprehensive project description highlighting technical skills and impact",
      "technologies": ["relevant", "technologies"],
      "link": "",
      "github": ""
    }
  ],
  "skills": {
    "technical": ["comprehensive technical skills relevant to target role"],
    "soft": ["relevant soft skills for target role"]
  },
  "certifications": [],
  "languages": ["English (Native)"]
}
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to generate resume structure');
      }
      
      const generatedResume = JSON.parse(jsonMatch[0]);
      
      if (!generatedResume.personalInfo || !generatedResume.personalInfo.fullName) {
        throw new Error('Failed to generate valid resume structure');
      }
      
      return generatedResume;
    } catch (error) {
      console.error('Error generating resume from prompt:', error);
      throw new Error('Failed to generate resume. Please check your input and try again.');
    }
  },

  async generateImprovementSuggestions(resumeData: ResumeData): Promise<string[]> {
    if (!API_KEY) {
      return [
        'Add quantified achievements with specific metrics and percentages',
        'Include more industry-specific keywords for ATS optimization', 
        'Expand project descriptions with technical details and impact',
        'Add relevant certifications for your field',
        'Include soft skills that complement your technical abilities'
      ];
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
Analyze this resume and provide 5 specific, actionable improvement suggestions:

${JSON.stringify(resumeData, null, 2)}

Focus on:
1. Missing quantified achievements and metrics
2. Weak descriptions that need strengthening
3. Skills gaps based on current industry trends
4. ATS optimization opportunities
5. Professional presentation improvements

Provide suggestions as JSON array (no markdown, no extra text):
["specific suggestion 1", "specific suggestion 2", "specific suggestion 3", "specific suggestion 4", "specific suggestion 5"]

Make suggestions actionable and specific.
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return [
          'Add quantified achievements with specific metrics',
          'Include more industry-specific keywords',
          'Expand project descriptions with technical details',
          'Add relevant certifications for your field',
          'Include soft skills that complement technical abilities'
        ];
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating improvement suggestions:', error);
      return [
        'Add quantified achievements with specific metrics',
        'Include more industry-specific keywords', 
        'Expand project descriptions with technical details',
        'Add relevant certifications for your field',
        'Include soft skills that complement technical abilities'
      ];
    }
  },

  async chatWithBot(message: string, resumeData?: ResumeData): Promise<string> {
    if (!API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const contextPrompt = resumeData ? `
CURRENT RESUME CONTEXT:
Name: ${resumeData.personalInfo.fullName}
Role: ${resumeData.experience[0]?.position || 'Not specified'}
Experience: ${resumeData.experience.length} positions
Projects: ${resumeData.projects.length} projects  
Skills: ${resumeData.skills.technical.length + resumeData.skills.soft.length} total skills
Education: ${resumeData.education.length} degrees
` : '';

    const prompt = `
You are a professional resume and career advisor chatbot. Provide helpful, specific, and actionable advice in 2-3 short sentences.

${contextPrompt}

User Question: ${message}

RESPONSE GUIDELINES:
1. Keep responses very concise (2-3 sentences max)
2. Be specific and actionable
3. Include relevant examples when helpful
4. Stay professional and encouraging
5. Focus on practical advice

If asked about:
- Skills: Suggest 2-3 specific, relevant skills for their field
- Resume improvements: Give 1-2 concrete suggestions
- Career advice: Provide brief professional guidance  
- Industry trends: Share 1-2 current market insights
- Job search: Offer 1-2 practical tips

Always end with a brief follow-up question to continue the conversation.

Response (keep it short and conversational):
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Ensure response is concise (limit to 3 sentences)
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      if (sentences.length > 3) {
        text = sentences.slice(0, 3).join('. ') + '.';
      }
      
      return text;
    } catch (error) {
      console.error('Error in chat:', error);
      throw new Error('Failed to get response. Please try again.');
    }
  }
};