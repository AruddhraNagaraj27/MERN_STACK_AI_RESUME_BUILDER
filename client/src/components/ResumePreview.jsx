import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const ResumePreview = ({ data, template, accentcolor, classes = "" }) => {

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentcolor={accentcolor} />;

      case "minimal_image":
        return <MinimalImageTemplate data={data} accentcolor={accentcolor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentcolor={accentcolor} />;

      case "classic":
        return <ClassicTemplate data={data} accentcolor={accentcolor} />;

      default:
        return <MinimalImageTemplate data={data} accentcolor={accentcolor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={"border print:shadow-none print:border-none " + classes}
        style={{
          borderColor: accentcolor,
          boxShadow: `0 0 8px ${accentcolor}40`
        }}
      >
        {renderTemplate()}
      </div>

      <style jsx>
        {`
          @page {
            margin: 0.5in;
            size: letter;
          }

          @media print {
            html, body {
              width: 8.5in;
              height: auto;
              overflow: visible;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
              font-size: 12px; /* smaller font for print */
              line-height: 1.3;
            }

            /* Prevent sections from breaking across pages */
            #resume-preview > div {
              page-break-inside: avoid;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
