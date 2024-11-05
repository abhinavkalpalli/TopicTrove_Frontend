
export const authUrl = {
    authUser: "/auth/user"
};
export const userUrl={
    register:'/user/register',
    otpVerify:'/user/otpverify',
    resendOtp:'/user/resendOtp',
    editProfile:'/user/editProfile',
    login:'/user/login',
    createTopic:'/user/createTopic',
    createPost:'/user/createPost',
    forgotPassword:'/user/forgotPassword',
    resetPassword:'/user/passwordReset',
    getPreferences:(userId)=>`/user/${userId}/getPreferences`,
    editTopic:'/user/editTopic',
    getAllPreferences:'/user/getAllPreferences',
    fetchPosts:'/user/fetchPosts',
    likePost:'/user/likePost',
    dislikePost:'/user/dislikePost',
    blockPost:'/user/blockPost',
    deletePost:(postId)=>`/user/${postId}/deletePost`,
    editPost:'/user/editPost'
}