import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function SavedResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get("/resumes");
        setResumes(res.data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      }
    };
    fetchResumes();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Your Saved Resumes
        </h1>

        {resumes.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You don’t have any saved resumes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-200 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {resume.name}
                </h2>
                <p className="text-gray-600 mb-1">📧 {resume.email}</p>
                <p className="text-gray-600 mb-3">📞 {resume.phone}</p>

                <div className="flex gap-3">
                  <Link
                    to={`/editor/${resume.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      await API.delete(`/resumes/${resume.id}`);
                      setResumes(resumes.filter((r) => r.id !== resume.id));
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            to="/editor"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            ➕ Create New Resume
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SavedResumes;
