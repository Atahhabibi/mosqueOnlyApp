import {
  Contact,
  Error,
  EventManagementPage,
  Events,
  HomeLayout,
  Landing,
  Login,
  Register,
  TaskManagementPage,
  Tasks,
  UserDashbaord,
  VolunteerManagementPage,
  AdminDashboard,
  Profile,
  EventDetailsPage,
  EditProfilePage,
  SignupForTaskPage
} from "./pages";
import About from "./pages/About";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { ClockInOut } from "./components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import { loader as EventDetailLoader } from "./pages/EventDetailsPage";
import { loader as volunteersLoader } from "./pages/VolunteerManagementPage";
import { loader as profileLoader } from "./pages/Profile";
import { loader as EditProfileLoader } from "./pages/EditProfilePage";
import { loader as signupTaskLoader } from "./pages/SignupForTaskPage";
import { loader as homeLoader } from "./pages/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    loader: homeLoader,

    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "tasks", element: <Tasks /> },
      { path: "events", element: <Events />},
      {
        path: "events/:id",
        element: <EventDetailsPage />,
        loader: EventDetailLoader
      },
      {
        path: "userDashboard",
        element: (
          <PrivateRoute
            element={<UserDashbaord />}
            allowedRoles={["volunteer", "admin"]} // Allow both roles
          />
        )
      },
      {
        path: "/tasks/:id",
        element: <SignupForTaskPage />,
        loader: signupTaskLoader
      },
      { path: "/profile/:id", element: <Profile />, loader: profileLoader },
      {
        path: "/editProfile/:id",
        element: <EditProfilePage />,
        loader: EditProfileLoader
      },
      {
        path: "adminDashboard",
        element: (
          <PrivateRoute
            element={<AdminDashboard />}
            allowedRoles={["volunteer", "admin"]} // Only allow "admin" role
          />
        )
      },

      {
        path: "/volunteer-management",
        element: <VolunteerManagementPage />,
        loader: volunteersLoader
      },
      {
        path: "/task-management",
        element: <TaskManagementPage />
      },
      {
        path: "/event-management",
        element: <EventManagementPage />
      },

      { path: "clockInOut", element: <ClockInOut /> }
    ]
  },
  { path: "/login", element: <Login />, action: loginAction },
  { path: "/register", element: <Register />, action: registerAction },
  { path: "*", element: <Error /> } // Catch-all for undefined routes
]);

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={1500} />
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true
        }}
      />
    </>
  );
}

export default App;
