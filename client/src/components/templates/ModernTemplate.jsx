import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header className="p-8" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-light mb-3" style={{ color: "#fff" }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} /> <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} /> <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} /> <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <a
              target="_blank"
              href={data.personal_info.linkedin}
              className="flex items-center gap-2"
            >
              <Linkedin size={16} />
              <span className="break-all text-xs">
                {data.personal_info.linkedin.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}
          {data.personal_info?.website && (
            <a
              target="_blank"
              href={data.personal_info.website}
              className="flex items-center gap-2"
            >
              <Globe size={16} />
              <span className="break-all text-xs">
                {data.personal_info.website.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              style={{ color: accentColor }}
              className="text-2xl font-light mb-4 pb-2 border-b"
            >
              Professional Summary
            </h2>
            <p>{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2
              style={{ color: accentColor }}
              className="text-2xl font-light mb-6 pb-2 border-b"
            >
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l"
                  style={{ borderColor: accentColor }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        style={{ color: accentColor }}
                        className="text-xl font-medium"
                      >
                        {exp.position}
                      </h3>
                      <p style={{ color: accentColor }} className="font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section className="mb-8">
            <h2
              style={{ color: accentColor }}
              className="text-2xl font-light mb-4 pb-2 border-b"
            >
              Projects
            </h2>
            <div className="space-y-6">
              {data.project.map((proj, idx) => (
                <div
                  key={idx}
                  className="pl-6 border-l"
                  style={{ borderColor: accentColor }}
                >
                  <h3
                    style={{ color: accentColor }}
                    className="text-lg font-medium"
                  >
                    {proj.name}
                  </h3>
                  <p className="text-gray-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mb-8">
            <h2
              style={{ color: accentColor }}
              className="text-2xl font-light mb-4 pb-2 border-b"
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-baseline pl-6 border-l"
                  style={{ borderColor: accentColor }}
                >
                  <div>
                    <h3 style={{ color: accentColor }} className="font-medium">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }} className="text-gray-600">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.graduation_date)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <h2
              style={{ color: accentColor }}
              className="text-2xl font-light mb-4 pb-2 border-b"
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ backgroundColor: accentColor, color: "#fff" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
