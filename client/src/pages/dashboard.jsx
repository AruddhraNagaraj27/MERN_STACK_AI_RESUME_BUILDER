import React, { useState, useEffect } from "react";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";   // <-- FIXED
import api from "../configs/api";
import toast from "react-hot-toast";         // <-- FIXED

import { dummyResumeData } from "../assets/assets";

const Dashboard = () => {

  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]; // <-- FIXED COLOR
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event) => {
    try {
      event.preventDefault();

      const { data } = await api.post(
        "/api/resumes/create",
        { title }
      ); // <-- FIXED

      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message); // <-- FIXED
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    navigate("/app/builder/res123");
  };

  const editTitle = async (event) => {
    event.preventDefault();

    setAllResumes((prev) =>
      prev.map((r) => (r._id === editResumeId ? { ...r, title } : r))
    );

    setEditResumeId("");
    setTitle("");
  };

  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (confirmDelete) {
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
        Welcome, Joe Doe
      </p>

      {/* Create & Upload Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center bg-white rounded-lg border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow transition cursor-pointer"
        >
          <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-600 text-white rounded-full" />
          <p className="text-sm group-hover:text-indigo-600 transition">
            Create Resume
          </p>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center bg-white rounded-lg border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow transition cursor-pointer"
        >
          <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-600 text-white rounded-full" />
          <p className="text-sm group-hover:text-purple-600 transition">
            Upload Existing
          </p>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* Resume Cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          const cardColors = [
            "from-purple-200 to-purple-100",
            "from-yellow-200 to-orange-100",
            "from-red-200 to-red-100",
            "from-blue-200 to-blue-100",
            "from-green-200 to-green-100",
          ];

          return (
            <button
              key={index}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className={`relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center 
              rounded-lg bg-gradient-to-br ${cardColors[index % cardColors.length]}
              border border-slate-300 hover:shadow-lg transition cursor-pointer`}
            >
              <FilePenLineIcon className="size-7 text-slate-700 mb-2" />
              <p className="text-sm text-slate-800 font-medium">{resume.title}</p>
              <p className="absolute bottom-2 text-[11px] text-slate-600">
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 flex gap-2"
              >
                <TrashIcon
                  onClick={() => deleteResume(resume._id)}
                  className="size-5 text-slate-500 hover:text-red-500 transition"
                />
                <PencilIcon
                  onClick={() => {
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="size-5 text-slate-500 hover:text-blue-500 transition"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Create Resume Modal */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          onClick={() => setShowCreateResume(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
            <input
              type="text"
              placeholder="Enter Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 focus:border-green-600 ring-green-600 mb-4 border rounded"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Create Resume
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowCreateResume(false);
                setTitle("");
              }}
            />
          </div>
        </form>
      )}

      {/* Upload Resume Modal */}
      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          onClick={() => setShowUploadResume(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
            <input
              type="text"
              placeholder="Enter Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 focus:border-green-600 ring-green-600 mb-4 border rounded"
              required
            />
            <div>
              <label
                htmlFor="resume-input"
                className="block text-sm text-slate-700"
              >
                Select resume File
                <div
                  className="flex flex-col items-center justify-center gap-2 border 
                group text-slate-400 border-slate-400 border-dashed rounded-md
                p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer
                transition-colors "
                >
                  {resume ? (
                    <p className="text-sm text-green-700 font-medium">
                      {resume.name}
                    </p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-14 stroke-1" />
                      <p className="text-sm">Click to upload or drag and drop</p>
                      <p className="text-xs">
                        Supported formats: .pdf, .doc, .docx
                      </p>
                    </>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="resume-input"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>

            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Upload Resume
            </button>

            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
              }}
            />
          </div>
        </form>
      )}

      {/* Edit Resume Modal */}
      {editResumeId && (
        <form
          onSubmit={editTitle}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          onClick={() => setEditResumeId("")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
            <input
              type="text"
              placeholder="Enter Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 focus:border-green-600 ring-green-600 mb-4 border rounded"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Update
            </button>

            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setEditResumeId("");
                setTitle("");
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
