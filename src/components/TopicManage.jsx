import React, { useState, useEffect } from "react";
import CreateTopic from "./CreateTopic";
import { getPreferences } from "../services/apiMethods";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const TopicManage = () => {
  const [preferences, setPreferences] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);

  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await getPreferences(user._id);
      if (response.status === 200) {
        setPreferences(response.data.preferences);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.message || error?.message || "An error occurred"
      );
    }
  };

  const handleEdit = (preference) => {
    setSelectedPreference(preference); // Pass preference object to modal
    setIsEditing(true);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPreference(null);
    setIsEditing(false);
  };

  const handleSubmit = (updatedTopic) => {
    if (isEditing) {
      setPreferences(
        preferences.map((pref) =>
          pref._id === updatedTopic._id ? updatedTopic : pref
        )
      );
    } else {
      setPreferences([...preferences, updatedTopic]);
    }
    handleModalClose();
  };

  return (
    <div className="h-screen flex flex-col items-center bg-white-200 p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Preferences</h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <ul className="mb-4">
          {preferences.map((preference) => (
            <li
              key={preference._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span className="text-lg">{preference.name}</span>
              <button
                onClick={() => handleEdit(preference)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            setSelectedPreference(null);
            setIsEditing(false);
            setShowModal(true);
          }}
          className="w-full py-2 bg-blue-500 text-white rounded-lg"
        >
          Create New Preference
        </button>
      </div>

      {showModal && (
        <CreateTopic
          setClose={handleModalClose}
          topic={selectedPreference} // Pass full topic object to edit
          onSubmit={handleSubmit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default TopicManage;
