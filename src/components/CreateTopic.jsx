import React, { useState, useEffect } from "react";
import { createTopic, editTopic } from "../services/apiMethods";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CreateTopic = ({ setClose, topic: initialTopic, onSubmit, isEditing }) => {
  const user = useSelector((state) => state.user.userData);
  const [topic, setTopic] = useState("");
  const [topicId, setTopicId] = useState(null); 

  useEffect(() => {
    setTopic(initialTopic?.name || ""); 
    setTopicId(initialTopic?._id || null); 
  }, [initialTopic]);

  const handleSubmit = async () => {
    if (topic.trim()) {
      try {
        const payload = { 
          name: topic.trim().toUpperCase(), 
          userId: user._id, 
          _id: topicId 
        };

        const response = isEditing 
          ? await editTopic(payload) 
          : await createTopic(payload);

        if (response.status === 200) {
          toast.success(isEditing ? "Topic Updated" : "New Topic Created");
          onSubmit(response.data.topic);
          setClose(true);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(
          error?.response?.message || error?.message || "An error occurred"
        );
      }
    } else {
      toast.error("Please enter a valid topic.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white-800 bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <h2 className="text-center text-2xl font-semibold mb-6">
          {isEditing ? "Edit Topic" : "Create New Topic"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Topic</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg text-gray-700"
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="py-2 px-4 bg-gray-400 text-white rounded-lg"
            onClick={() => setClose(true)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            onClick={handleSubmit}
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTopic;
