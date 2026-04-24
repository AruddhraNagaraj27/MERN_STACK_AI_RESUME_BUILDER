import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const MinimalTemplate = ({ data, accentcolor: accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-gray-800 leading-relaxed">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" /> {data.personal_info.email}
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" /> {data.personal_info.phone}
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" /> {data.personal_info.location}
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" /> {data.personal_info.linkedin}
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" /> {data.personal_info.website}
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-4">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p>{data.professional_summary}</p>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <p className="font-semibold">{edu.degree}</p>
                <p>{edu.institution}</p>
                <p className="text-sm text-gray-600">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-gray-700">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <ul className="space-y-2">
            {data.project.map((proj, i) => (
              <li key={i}>
                <span className="font-semibold">{proj.name}</span>
                <p className="text-gray-700">{proj.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 text-sm rounded-md"
                style={{ backgroundColor: accentColor, color: "#fff" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
