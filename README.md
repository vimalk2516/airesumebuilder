# AI Resume Builder

A comprehensive, production-ready AI-powered resume builder with real-time preview, Gemini AI integration, and professional output options.

## Features

### 🚀 Core Features
- **Multi-step Form**: Intuitive, guided resume creation process
- **Real-time Preview**: See your resume as you build it
- **AI Enhancement**: Powered by Google's Gemini AI for professional content optimization
- **Multiple Output Formats**: PDF resume and HTML portfolio generation
- **Before/After Comparison**: See the AI improvements side-by-side

### 📋 Resume Sections
- Personal Information with contact details
- Education with honors and GPA
- Professional Experience with detailed descriptions
- Projects with technology stacks and links
- Technical and Soft Skills
- Certifications with expiry dates
- Languages with proficiency levels

### 🤖 AI Capabilities
- **Career Summary Generation**: Creates compelling professional summaries
- **Content Optimization**: Enhances descriptions with action verbs and impact metrics
- **Keyword Optimization**: Ensures ATS-friendly content
- **Skill Suggestions**: Recommends relevant skills based on experience
- **Improvement Suggestions**: Provides actionable feedback for enhancement

### 📱 Design Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Screen reader friendly and keyboard navigable
- **Visual Feedback**: Progress tracking and validation indicators

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## Usage

### Building a Resume

1. **Personal Information**: Enter your basic contact details and optional career objective
2. **Education**: Add your educational background with degrees, institutions, and achievements
3. **Experience**: Detail your work history with roles, companies, and accomplishments
4. **Projects**: Showcase your projects with descriptions, technologies, and links
5. **Skills**: List your technical and soft skills
6. **Certifications**: Add professional certifications and credentials
7. **Review**: Use AI enhancement and download your resume

### AI Enhancement

The AI enhancement feature:
- Analyzes your entire resume data
- Generates compelling career summaries
- Optimizes project and experience descriptions
- Suggests additional relevant skills
- Provides improvement recommendations
- Creates SEO-optimized portfolio content

### Output Options

**PDF Resume**: Professional, print-ready resume suitable for job applications
**HTML Portfolio**: Complete portfolio website with modern design and responsive layout

## Project Structure

```
src/
├── components/           # React components
│   ├── forms/           # Form components for each section
│   ├── StepIndicator.tsx
│   ├── FormNavigation.tsx
│   ├── ResumePreview.tsx
│   └── ReviewForm.tsx
├── contexts/            # React context for state management
│   └── ResumeContext.tsx
├── services/            # API and utility services
│   ├── geminiService.ts
│   ├── pdfService.ts
│   └── portfolioService.ts
├── types/              # TypeScript type definitions
│   └── resume.ts
└── App.tsx             # Main application component
```

## API Integration

### Gemini AI Prompts

The application uses carefully crafted prompts to ensure high-quality AI enhancements:

```typescript
// Example enhancement prompt
const prompt = `
You are a professional resume writer and career coach. 
Analyze the following resume data and provide enhancements:

${JSON.stringify(resumeData)}

Please provide the following enhancements in valid JSON format:
{
  "careerSummary": "A compelling professional summary",
  "enhancedSkills": ["array of enhanced skills"],
  "optimizedProjects": [...],
  "professionalExperience": [...],
  "portfolioIntro": "SEO-optimized introduction"
}
`;
```

### Response Handling

The application includes robust error handling and response validation:
- JSON parsing with fallback options
- API key validation
- Rate limiting awareness
- User-friendly error messages

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Consistent code style and error detection
- **Modular Architecture**: Clean separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Roadmap

- [ ] Multiple resume templates
- [ ] Job-specific optimization
- [ ] Social media integration
- [ ] Team collaboration features
- [ ] Advanced analytics
- [ ] Mobile app version