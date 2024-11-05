import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload, FiTrash } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { uploadImageToCloudinary } from "../../hooks/cloudinary";
import { editProfile } from "../../services/apiMethods";
import profilePlaceholder from '../../assets/user.png';
import {  updateReduxUser } from "../../utils/reducers/userReducer"
import Swal from "sweetalert2";




function UserProfile() {
  const user = useSelector((state) => state?.user?.userData);
  const dispatch = useDispatch();
  const [firstName, setName] = useState(user?.firstName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [selectedImage, setSelectedImage] = useState(user?.photo || profilePlaceholder);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);


  useEffect(() => {
    setName(user?.firstName || "");
    setEmail(user?.email || "");
    setSelectedImage(user?.photo || profilePlaceholder);
  }, [user]);
  
  
  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsChanged(event.target.value.trim() !== user?.firstName || imageFile !== null);
    if (event.target.value.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const previewImageUrl = URL.createObjectURL(file);
    setSelectedImage(previewImageUrl);
    setIsChanged(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      return;
    }
    
    let photoUrl = user?.photo;
    if (imageFile) {
      const imgUrl = await uploadImageToCloudinary(imageFile);
      photoUrl = imgUrl;
    }

    const formData = {
      firstName,
      email,
      photo: photoUrl
    };

    try {
      const response = await editProfile(formData);
      if (response?.status === 200) {
        dispatch(updateReduxUser({ userData: { ...formData } }));
        toast.success("Profile updated successfully");
        setIsChanged(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };
  const handleDeleteImage = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Remove Profile image.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const formData = {
        firstName,
        email,
        photo:''
      };
      const response = await editProfile(formData);
      if (response.status === 200) {
        dispatch(updateReduxUser({userData:formData}));
        setSelectedImage(null);
        setImageFile(null);
        toast.success("Profile Picture removed successfully.");
      } else {
        toast.error("Failed to update profile");
      }
    }
  };

  return (
    <div className="col-span-4 sm:col-span-9 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={selectedImage ? selectedImage : profilePlaceholder}
              className="w-32 h-32 bg-gray-300 rounded-full mb-4 border-4 border-gray-200 object-cover"
              alt="Profile"
            />
            <div className="flex items-center justify-center mb-4 space-x-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                <FiUpload className="text-2xl" />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {selectedImage && selectedImage !== profilePlaceholder && (
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={handleDeleteImage}
                >
                  <FiTrash className="text-2xl" />
                </button>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={firstName}
              onChange={handleNameChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              readOnly
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline transform transition-transform duration-300 ${!isChanged && "opacity-50 cursor-not-allowed"}`}
              disabled={!isChanged}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
