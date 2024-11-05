import { apiCall } from "./apiCalls";
import { userUrl } from "../const/routes";

export const register = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrl.register, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const otpVerify = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrl.otpVerify, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const resendOtp = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrl.resendOtp, { params: userData })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const login = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrl.login, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const forgotPassword = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrl.forgotPassword, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const resetPassword = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrl.resetPassword, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const editProfile=(userData)=>{
  return new Promise((resolve,reject)=>{
      try{
          apiCall("put",userUrl.editProfile,userData).then((response)=>{
              resolve(response)
          }).catch((err)=>{
              reject(err)
          })
      }catch(error){
          resolve({status:500,message:'Something went wrong'})
      }
  })
}
export const createTopic = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrl.createTopic, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const getPreferences = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrl.getPreferences(userId))
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const editTopic=(userData)=>{
  return new Promise((resolve,reject)=>{
      try{
          apiCall("patch",userUrl.editTopic,userData).then((response)=>{
              resolve(response)
          }).catch((err)=>{
              reject(err)
          })
      }catch(error){
          resolve({status:500,message:'Something went wrong'})
      }
  })
}
export const getAllPreferences = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrl.getAllPreferences)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const createPost = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrl.createPost, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const fetchPosts = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrl.fetchPosts,{ params: { userId: data.userId, preferences: data.preferences } })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const likePost = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", userUrl.likePost,data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const dislikePost = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", userUrl.dislikePost,data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const blockPost = (data) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", userUrl.blockPost,data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrl.deletePost(postId))
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
export const editPost = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("patch", userUrl.editPost, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

