import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import {
  getAllPreferences,
  createPost,
  editPost,
} from "../services/apiMethods";
import { uploadImageToCloudinary } from "../hooks/cloudinary";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateReduxUser } from "../utils/reducers/userReducer";
import { useNavigate } from "react-router-dom";
const CreatePost = ({ setClose, editPostData, onUpdatePost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [articlePreferences, setArticlePreferences] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    fetchPreferences();
    if (editPostData) {
      setName(editPostData.name);
      setDescription(editPostData.description);
      setImageUrl(editPostData.photo);
      setSelectedPreferences(editPostData.preference);
      setPreviewImage(editPostData.photo);
    }
  }, [editPostData]);

  const fetchPreferences = async () => {
    try {
      const response = await getAllPreferences();
      if (response.status === 200) {
        setArticlePreferences(response.data.preferences);
      }
    } catch (error) {
      toast.error(
        error?.response?.message || error?.message || "An error occurred"
      );
    }
  };

  const handleSelectPreference = (preferenceId) => {
    setSelectedPreferences((prev) =>
      prev.includes(preferenceId)
        ? prev.filter((id) => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePostCreation = async () => {
    try {
      let uploadedImageUrl = imageUrl;

      if (image) {
        const uploadResponse = await uploadImageToCloudinary(image);
        uploadedImageUrl = uploadResponse;
        setImageUrl(uploadedImageUrl);
      }
      const userId = user?._id || null;
      const postData = {
        name,
        description,
        photo: uploadedImageUrl,
        preference: selectedPreferences,
        userId,
      };
      const editPostDatas = {
        name,
        description,
        photo: uploadedImageUrl,
        preference: selectedPreferences,
        _id: editPostData ? editPostData._id : null,
      };
      if (!name || !description || !uploadedImageUrl || !selectedPreferences) {
        toast.error("Please fill out all fields before posting.");
        return;
      }

      const response = editPostData
        ? await editPost(editPostDatas)
        : await createPost(postData);

      if (response.status === 201 || response.status === 200) {
        toast.success(
          editPostData
            ? "Post updated successfully!"
            : "Post created successfully!"
        );
        if (editPostData) {
          onUpdatePost(editPostDatas);
          setClose(true);
        } else {
          dispatch(
            updateReduxUser({
              userData: {
                ...user,
                posts: [...user.posts, response.data.post],
              },
            })
          );
          navigate("/user/posts");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Error");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white-800 bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <h2 className="text-center text-2xl font-semibold mb-6">
          {editPostData ? "Edit Post" : "Create New Post"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg text-gray-700"
            placeholder="Post name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full h-24 p-2 border rounded-lg text-gray-700"
            placeholder="Write something..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center">
            <label className="cursor-pointer flex flex-col items-center">
              <FaUpload size={24} className="text-gray-400 mb-2" />
              <span className="text-gray-600">Click to upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          {/* Show preview if image is selected */}
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Article Preferences */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Article Preferences</h3>
          <div className="grid grid-cols-2 gap-2">
            {articlePreferences.map((preference) => (
              <div
                key={preference._id}
                className={`p-2 text-center rounded-lg cursor-pointer ${
                  selectedPreferences.includes(preference._id)
                    ? "bg-blue-100 border border-blue-500"
                    : "bg-gray-100"
                }`}
                onClick={() => handleSelectPreference(preference._id)}
              >
                {preference.name}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="py-2 px-4 bg-gray-400 text-white rounded-lg"
            onClick={() => setClose(true)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            onClick={handlePostCreation}
          >
            {editPostData ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
