import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function ResumePreview({ data }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "My_Resume",
  });

  if (!data) return null;

  const { name, email, phone, education, experience, skills } = data;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      {/* Download Button */}
      <button
        onClick={handlePrint}
        className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform"
      >
        📄 Download PDF
      </button>

      {/* Resume content */}
      <div
        ref={componentRef}
        className="bg-white shadow-2xl rounded-xl max-w-3xl w-full p-10 border border-gray-200"
      >
        {/* Header */}
        <div className="border-b-2 border-gray-300 pb-4 mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">{name || "Your Name"}</h1>
          <p className="text-gray-600 mt-2">
            {email && <span className="mr-3">📧 {email}</span>}
            {phone && <span>📞 {phone}</span>}
          </p>
        </div>

        {/* Education */}
        {education && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-2">
              Education
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{education}</p>
          </section>
        )}

        {/* Experience */}
        {experience && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-2">
              Experience
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{experience}</p>
          </section>
        )}

        {/* Skills */}
        {skills && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-2">
              Skills
            </h2>
            <ul className="flex flex-wrap gap-2">
              {skills.split(",").map((skill, index) => (
                <li
                  key={index}
                  className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill.trim()}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
