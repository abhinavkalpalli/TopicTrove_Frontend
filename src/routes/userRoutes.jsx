import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
import React from "react";
import PrivateRoutes from "./privateRoutes";

const ProfileLayout = lazy(() => import("../pages/Profilelayout"));
const Header = lazy(() => import("../pages/Heder"));
const Footer = lazy(() => import("../pages/Footer"));
const Profile = lazy(() => import("../components/Profile/userProfile"));
const ResetPassoword = lazy(() => import("../pages/PasswordReset"));
const CreatePost = lazy(() => import("../components/CreatePost"));
const Topics = lazy(() => import("../components/TopicManage"));
const Posts = lazy(() => import("../components/PostCard"));
const Error = lazy(() => import("../components/Error/Error"));

export default function UserRoutes() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="*" element={<Error />} />
            <Route
              path="/profile"
              element={
                <>
                  <Header />
                  <ProfileLayout>
                    <Profile />
                  </ProfileLayout>
                  <Footer />
                </>
              }
            />
            <Route
              path="/passwordReset"
              element={
                <>
                  <Header />
                  <ProfileLayout>
                    <ResetPassoword />
                  </ProfileLayout>
                  <Footer />
                </>
              }
            />
            <Route
              path="/createPost"
              element={
                <>
                  <Header />
                  <ProfileLayout>
                    <CreatePost />
                  </ProfileLayout>
                  <Footer />
                </>
              }
            />
            <Route
              path="/topics"
              element={
                <>
                  <Header />
                  <ProfileLayout>
                    <Topics />
                  </ProfileLayout>
                  <Footer />
                </>
              }
            />
            <Route
              path="/posts"
              element={
                <>
                  <Header />
                  <ProfileLayout>
                    <Posts />
                  </ProfileLayout>
                  <Footer />
                </>
              }
            />
            <Route
              path="/userPosts"
              element={
                <>
                  <Header />
                  <ProfileLayout>
                    <Posts />
                  </ProfileLayout>
                  <Footer />
                </>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
