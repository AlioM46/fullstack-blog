import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Auth, Home, Profile, Users} from "./pages/import.js";
import CreatePost from "./pages/CreatePost.jsx";
import Archives from "./pages/Archives.jsx";
import Categories from "./pages/Categories.jsx";
import PostPage from "./pages/PostPage.jsx";
import EditPage from "./pages/EditPage.jsx";
import ProfileUsers from "./pages/ProfileUsers.jsx";
import {Provider} from "react-redux";

const router = createBrowserRouter([
  {path: "/", element: <Home />},
  // {path: "/post", element: <Post />},
  {path: "/auth", element: <Auth />},
  {path: "/profile", element: <Profile />},
  {path: "/user/:userId", element: <ProfileUsers />},
  {path: "/users", element: <Users />},
  {path: "/post/createpost", element: <CreatePost />},
  {path: "/post/archives", element: <Archives />},
  {path: "/post/categories", element: <Categories />},
  {path: "/post/:postId", element: <PostPage />},
  {path: "/post/edit/:id", element: <EditPage />},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
);
