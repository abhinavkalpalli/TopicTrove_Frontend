import React, { useState, useEffect, useCallback } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import {
  fetchPosts,
  likePost,
  dislikePost,
  blockPost,
  getAllPreferences,
  deletePost,
} from "../services/apiMethods";
import PostModal from "./PostModal";
import { useSelector ,useDispatch} from "react-redux";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import Swal from "sweetalert2";
import CreatePost from "./CreatePost";
import { useLocation } from "react-router-dom";
import { updateReduxUser } from "../utils/reducers/userReducer";


const PostCard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const posts=user.posts
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const userId = user?._id;
  const [loading, setLoading] = useState(true);
  const [allPreferences, setAllPreferences] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState(user.preferences);
  const isUser =
    new URLSearchParams(location.search).get("isUser") === "true";

  useEffect(() => {
    const fetchAllPreferences = async () => {
      try {
        const response = await getAllPreferences();
        if (response.status === 200) {
          setAllPreferences(response.data.preferences);
        } else {
          toast.error(response.message || "Failed to load preferences");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while fetching preferences"
        );
      }
    };

    fetchAllPreferences();
  }, []);
  const loadPosts = async () => {
    setLoading(true); // Start loading state
    try {
      const response = await fetchPosts({
        userId,
        preferences: selectedPreferences,
      });
  
      const postsData = response?.data?.posts || [];
      let filteredPosts = [];
  
      if (isUser) {
        filteredPosts = postsData.filter((post) => post.userId._id === userId);
      } else {
        filteredPosts = postsData.filter((post) => !post.block?.includes(userId));
      }
      dispatch(updateReduxUser({ userData: { ...user,preferences:selectedPreferences} }));
      dispatch(updateReduxUser({userData:{...user,posts:filteredPosts}}))
    } catch (error) {
      toast.error(error?.message || "An error occurred while fetching posts");
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    loadPosts();
  }, [selectedPreferences, userId,isUser]);


  // Handle like and dislike
  const handleLike = useCallback(
    async (postId, currentLike, currentDislike) => {
      try {
        if (currentDislike) await dislikePost({ postId, userId, dislike: true });
        await likePost({ postId, userId, like: !currentLike });
  
        dispatch(
          updateReduxUser({
            userData: {
              ...user,
              posts: user.posts.map((post) =>
                post._id === postId
                  ? {
                      ...post,
                      like: currentLike
                        ? post.like.filter((id) => id !== userId)
                        : [...post.like, userId],
                      dislike: currentDislike
                        ? post.dislike.filter((id) => id !== userId)
                        : post.dislike,
                    }
                  : post
              ),
            },
          })
        );
      } catch (error) {
        toast.error(error.message || "An error occurred while liking the post");
      }
    },
    [user, userId, dispatch]
  );
  
  const handleDislike = useCallback(
    async (postId, currentDislike, currentLike) => {
      try {
        if (currentLike) await likePost({ postId, userId, like: true });
        await dislikePost({ postId, userId, dislike: !currentDislike });
  
        dispatch(
          updateReduxUser({
            userData: {
              ...user,
              posts: user.posts.map((post) =>
                post._id === postId
                  ? {
                      ...post,
                      dislike: currentDislike
                        ? post.dislike.filter((id) => id !== userId)
                        : [...post.dislike, userId],
                      like: currentLike
                        ? post.like.filter((id) => id !== userId)
                        : post.like,
                    }
                  : post
              ),
            },
          })
        );
      } catch (error) {
        toast.error(
          error.message || "An error occurred while disliking the post"
        );
      }
    },
    [user, userId, dispatch]
  );
  
  const handleEdit = (post) => {
    setCurrentPost(post);
    setOpenModalEdit(true);
  };

  const handleBlock = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to see this post again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, block it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await blockPost({ postId, userId });
        if (response.status === 200) {
          dispatch(
            updateReduxUser({
              userData: {
                ...user,
                posts: user.posts.map((post) =>
                  post._id === postId
                    ? {
                        ...post,
                        block: [...post.block, userId],
                      }
                    : post
                ),
              },
            })
          );
          toast.success("Blocked the post");
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while blocking the post"
        );
      }
    }
  };
  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to see this post again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deletePost(postId);
        if (response.status === 200) {
          dispatch(
            updateReduxUser({
              userData: {
                ...user,
                posts: user.posts.filter((post) => post._id !== postId),
              },
            })
          );
          toast.success('Deleted the post')
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while blocking the post"
        );
      }
    }
  };

  const openFullPost = useCallback((post) => {
    setCurrentPost(post);
    setOpenModal(true);
  }, []);

  const togglePreference = (id) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((prefId) => prefId !== id) : [...prev, id]
    );
  };
  const updatePostLocally = (updatedPost) => {

    const updatedPosts=posts.map(post=>post._id===updatedPost._id?{...post,...updatedPost}:post)
    dispatch(updateReduxUser({userData:{...user,posts:updatedPosts}}))
  };
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preferences Selection */}
      <div className="w-full flex flex-col items-center mb-4">
        <div className="text-lg font-semibold">Select Preferences</div>
        <div className="flex gap-2 flex-wrap justify-center">
          {allPreferences.map((preference) => (
            <button
              key={preference._id}
              className={`px-3 py-1 rounded-lg border ${
                selectedPreferences.includes(preference._id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => togglePreference(preference._id)}
            >
              {preference.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div>Loading posts...</div>
      ) : posts.length > 0 ? (
        posts.map((post) => (!post.block.includes(userId)&&
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg p-4 w-80 relative"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <img
                  src={post.userId.photo}
                  alt={post.userId.firstName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-sm font-semibold">
                  {post.userId.firstName}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </div>

                {post.userId._id === userId ? (
                  <>
                    <button
                      className="text-blue-500"
                      onClick={() => handleEdit(post)}
                      aria-label="Edit Post"
                    >
                      ✏️
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(post._id)}
                      aria-label="Delete Post"
                    >
                      🗑️
                    </button>
                  </>
                ) : (
                  <button
                    className="text-red-500"
                    onClick={() => handleBlock(post._id)}
                    aria-label="Block User"
                  >
                    🚫
                  </button>
                )}
              </div>
            </div>

            <img
              src={post.photo}
              alt={post.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h1 className="text-center text-xl font-semibold mb-2">
              {post.name}
            </h1>

            <p className="text-gray-700 mb-4">
              {post.description.slice(0, 100)}...
            </p>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleLike(
                      post._id,
                      post.like.includes(userId),
                      post.dislike.includes(userId)
                    )
                  }
                  aria-label="Like Post"
                >
                  <FaThumbsUp
                    className={`text-xl ${
                      post.like.includes(userId)
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span>{post.like.length}</span>
                </button>
                <button
                  onClick={() =>
                    handleDislike(
                      post._id,
                      post.dislike.includes(userId),
                      post.like.includes(userId)
                    )
                  }
                  aria-label="Dislike Post"
                >
                  <FaThumbsDown
                    className={`text-xl ${
                      post.dislike.includes(userId)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span>{post.dislike.length}</span>
                </button>
              </div>
              <button
                onClick={() => openFullPost(post)}
                className="text-blue-500"
              >
                Read More
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No posts available based on your preferences.</div>
      )}

      {/* Post Modal */}
      {openModal && (
        <PostModal post={currentPost} onClose={() => setOpenModal(false)} />
      )}
      {openModalEdit && (
  <>
    <div
      className="modal-backdrop"
      onClick={() => setOpenModalEdit(false)}
    />
    <div className="modal-container">
      <CreatePost
        setClose={() => setOpenModalEdit(false)}
        editPostData={currentPost}
        onUpdatePost={updatePostLocally}
      />
    </div>
  </>
)}

    </div>
  );
};

export default PostCard;
