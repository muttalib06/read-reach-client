import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/home/Home";
import Books from "../pages/books/Books";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import PrivateRoute from "./PrivateRoute";
import BookDetail from "../pages/home/bookDetail/BookDetail";
import MyOrders from "../pages/dashboard/MyOrders";
import RouterError from "../components/sharedComponents/Error/RouterError";
import ServerError from "../components/sharedComponents/Error/ServerError";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import ProfilePage from "../pages/dashboard/ProfilePage";
import AddBookForm from "../pages/dashboard/AddBookForm";
import MYBook from "../pages/dashboard/MYBook";
import LibrarianOrders from "../pages/dashboard/LibrarainOrders";
import UserManagementTable from "../pages/dashboard/UserManagementTable";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import AllBooks from "../pages/dashboard/AllBooks";
import UserDashboardHome from "../pages/dashboard/DashboardHome/UserDashboardHome";
import LibrarianDashboardHome from "../pages/dashboard/DashboardHome/LibrarianDashboardHome";
import AdminDashboardHome from "../pages/dashboard/DashboardHome/AdminDashboardHome";
import UnauthorizedPage from "../pages/notAuthorization/UnauthorizedPage";
import ForbiddenPage from "../pages/notAuthorization/ForbiddenPage";
import RoleRoute from "./RoleRoute";
import WishlistPage from "../pages/dashboard/WishlistPage";
import AboutUs from "../pages/aboutUs/AboutUs";
import Blogs from "../pages/blogs/Blogs";
import TermsOfService from "../pages/termOfService/TermsOfService";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";
import CookieSettings from "../pages/cookiesSettings/CookiesSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <RouterError></RouterError>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "books",
        element: <Books></Books>,
      },
      {
        path: "login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "signup",
        element: <SignupPage></SignupPage>,
      },
      {
        path: "aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "book-detail/:id",
        element: <BookDetail></BookDetail>,
      },

      {
        path: "terms-services",
        element: <TermsOfService></TermsOfService>,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "cookies-settings",
        element: <CookieSettings></CookieSettings>,
      },
    ],
  },

  // server error page

  {
    path: "server-error",
    element: <ServerError></ServerError>,
  },

  // unauthorized page.

  {
    path: "unauthorized",
    element: <UnauthorizedPage></UnauthorizedPage>,
  },

  // forbidden page.
  {
    path: "forbidden",
    element: <ForbiddenPage></ForbiddenPage>,
  },

  // payment success page

  {
    path: "dashboard/success",
    element: <PaymentSuccess></PaymentSuccess>,
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),

    children: [
      // user
      {
        path: "user-home",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <UserDashboardHome></UserDashboardHome>
          </RoleRoute>
        ),
      },

      // librarian
      {
        path: "librarian-home",
        element: (
          <RoleRoute allowedRoles={["librarian"]}>
            <LibrarianDashboardHome></LibrarianDashboardHome>
          </RoleRoute>
        ),
      },

      // admin
      {
        path: "admin-home",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminDashboardHome></AdminDashboardHome>
          </RoleRoute>
        ),
      },
      {
        path: "orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "add-book",
        element: <AddBookForm></AddBookForm>,
      },
      {
        path: "my-book",
        element: <MYBook></MYBook>,
      },
      {
        path: "librarian-orders",
        element: <LibrarianOrders></LibrarianOrders>,
      },
      {
        path: "user-management",
        element: <UserManagementTable></UserManagementTable>,
      },
      {
        path: "all-books",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "librarian-dashboard-home",
        element: <LibrarianDashboardHome></LibrarianDashboardHome>,
      },
      {
        path: "my-wishlist",
        element: <WishlistPage></WishlistPage>,
      },
      {
        path: "admin-dashboard-home",
        element: <AdminDashboardHome></AdminDashboardHome>,
      },
    ],
  },
]);
