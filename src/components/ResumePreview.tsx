import React from 'react';
import { useResume } from '../contexts/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resumeData, aiEnhancedContent } = useResume();

  const displayContent = aiEnhancedContent || {
    careerSummary: resumeData.careerObjective,
    enhancedSkills: [...resumeData.skills.technical, ...resumeData.skills.soft],
    optimizedProjects: resumeData.projects,
    professionalExperience: resumeData.experience,
    portfolioIntro: ''
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="max-w-full">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span className="truncate">{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {resumeData.personalInfo.phone}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-blue-600">
            {resumeData.personalInfo.linkedIn && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                <a href={resumeData.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="truncate">
                  LinkedIn
                </a>
              </div>
            )}
            {resumeData.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="w-3 h-3" />
                <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="truncate">
                  GitHub
                </a>
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="truncate">
                  Website
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Career Summary */}
        {displayContent.careerSummary && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {displayContent.careerSummary}
            </p>
          </div>
        )}

        {/* Experience */}
        {displayContent.professionalExperience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Experience</h2>
            <div className="space-y-3">
              {displayContent.professionalExperience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-500 pl-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{exp.position}</h3>
                      <p className="text-blue-600 font-medium text-sm truncate">{exp.company}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-2 flex-shrink-0">
                      <p>{exp.duration}</p>
                      {exp.location && <p className="truncate">{exp.location}</p>}
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {displayContent.optimizedProjects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Projects</h2>
            <div className="space-y-3">
              {displayContent.optimizedProjects.map((project) => (
                <div key={project.id} className="border-l-2 border-green-500 pl-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate flex-1">{project.title}</h3>
                    <div className="flex gap-1 ml-2 flex-shrink-0">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Education</h2>
            <div className="space-y-2">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-purple-500 pl-3">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{edu.degree}</h3>
                      <p className="text-purple-600 font-medium text-sm truncate">{edu.institution}</p>
                      {edu.honors && <p className="text-xs text-gray-600 truncate">{edu.honors}</p>}
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-2 flex-shrink-0">
                      <p>{edu.year}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Skills</h2>
            <div className="space-y-2">
              {resumeData.skills.technical.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Technical Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.technical.slice(0, 8).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {resumeData.skills.technical.length > 8 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        +{resumeData.skills.technical.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              {resumeData.skills.soft.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Soft Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.soft.slice(0, 6).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {resumeData.skills.soft.length > 6 && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        +{resumeData.skills.soft.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Certifications</h2>
            <div className="space-y-2">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="border-l-2 border-orange-500 pl-3">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{cert.name}</h3>
                      <p className="text-orange-600 font-medium text-sm truncate">{cert.issuer}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-2 flex-shrink-0">
                      <p>{cert.date}</p>
                      {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resumeData.languages.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Languages</h2>
            <div className="flex flex-wrap gap-1">
              {resumeData.languages.slice(0, 6).map((language, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                >
                  {language}
                </span>
              ))}
              {resumeData.languages.length > 6 && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  +{resumeData.languages.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};