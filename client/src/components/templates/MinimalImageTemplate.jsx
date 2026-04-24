import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Safe photo URL
  const photoUrl =
    data.personal_info?.image && data.personal_info.image.trim() !== ""
      ? data.personal_info.image
      : null;

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Sidebar */}
        <aside
          className="col-span-1 border-b md:border-b-0 md:border-r p-6 md:py-10"
          style={{ borderColor: accentColor }}
        >
          {/* Profile Image */}
          <div className="text-center mb-6">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto border-4"
                style={{ borderColor: accentColor }}
              />
            ) : (
              <div
                className="w-32 h-32 flex items-center justify-center rounded-full border-4 bg-gray-200 text-gray-500 mx-auto"
                style={{ borderColor: accentColor }}
              >
                No Image
              </div>
            )}
          </div>

          {/* Contact */}
          <section className="mb-8">
            <h2
              className="text-sm font-semibold mb-3 tracking-widest"
              style={{ color: accentColor }}
            >
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold mb-3 tracking-widest"
                style={{ color: accentColor }}
              >
                EDUCATION
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: `2px solid ${accentColor}`,
                      paddingLeft: "8px",
                    }}
                  >
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    <p>{edu.institution}</p>
                    <p className="text-xs">{formatDate(edu.graduation_date)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold mb-3 tracking-widest"
                style={{ color: accentColor }}
              >
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Content */}
        <main className="col-span-2 p-6 md:py-10 md:px-8">
          {/* Name & Profession */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-4xl font-bold" style={{ color: accentColor }}>
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            {data.personal_info?.profession && (
              <p
                className="uppercase font-medium text-sm tracking-widest"
                style={{ color: accentColor }}
              >
                {data.personal_info.profession}
              </p>
            )}
          </div>

          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-8">
              <h2
                className="text-lg font-semibold mb-2 border-b pb-1"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p>{data.professional_summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-lg font-semibold mb-2 border-b pb-1"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: `3px solid ${accentColor}`,
                      paddingLeft: "12px",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className="font-medium"
                        style={{ color: accentColor }}
                      >
                        {exp.position}
                      </h3>
                      <span className="text-xs">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside text-sm">
                        {exp.description.split("\n").map((line, j) => (
                          <li key={j}>{line}</li>
                        ))}
                      </ul>
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
                className="text-lg font-semibold mb-2 border-b pb-1"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="space-y-4">
                {data.project.map((proj, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: `3px solid ${accentColor}`,
                      paddingLeft: "12px",
                    }}
                  >
                    <h3 className="font-medium" style={{ color: accentColor }}>
                      {proj.name}
                    </h3>
                    {proj.type && (
                      <p
                        className="text-sm mb-1"
                        style={{ color: accentColor }}
                      >
                        {proj.type}
                      </p>
                    )}
                    {proj.description && (
                      <ul className="list-disc list-inside text-sm">
                        {proj.description.split("\n").map((line, j) => (
                          <li key={j}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
