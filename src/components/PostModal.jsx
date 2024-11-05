import React from "react";
import {  FaTimes } from "react-icons/fa";

const PostModal = ({ post, onClose}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 max-h-[80vh] p-6 relative overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-500"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={post?.userId?.photo || "default-user-image.jpg"}
              alt="User Photo"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="text-sm font-semibold">{post?.userId?.firstName || "Unknown User"}</div>
          </div>
          <div className="text-xs text-gray-500">
            {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown Date"}
          </div>
        </div>

        <img
          src={post?.photo}
          alt={post?.name || "Post Image"}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <h1 className="text-center text-2xl font-semibold mb-2">{post?.name || "Untitled Post"}</h1>
        <p className="text-gray-700 mb-4">{post?.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default PostModal;
