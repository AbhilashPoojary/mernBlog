import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Pofile";
import "./App.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const user = useSelector((state) => state?.loginReducer?.currentUser);
  const darkMode = useSelector((state) => state?.themeReducer?.darkMode);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/post/:id",
          element: <BlogDetail />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: !user ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/signup",
      element: !user ? <Signup /> : <Navigate to="/" />,
    },
  ]);
  return (
    <section className={`${darkMode ? "dark--mode" : "light--mode"}`}>
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
