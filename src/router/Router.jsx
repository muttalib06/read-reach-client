import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/home/Home";
import Books from "../pages/books/Books";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import PrivateRoute from "./PrivateRoute";
import BookDetail from "../pages/home/bookDetail/BookDetail";
import DashboardHome from "../pages/dashboard/DashboardHome";
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
        path: "book-detail/:id",
        element: <BookDetail></BookDetail>,
      },
    ],
  },

  // server error page

  {
    path: "server-error",
    element: <ServerError></ServerError>,
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
      {
        index:true,
        element:<UserDashboardHome></UserDashboardHome>
      },
      {
        path: "orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "payment-history",
        element:<PaymentHistory></PaymentHistory>
      },
      {
        path: "success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path:"profile",
        element:<ProfilePage></ProfilePage>
      },
      {
        path:"add-book",
        element:<AddBookForm></AddBookForm>
      },
      {
        path:"my-book",
        element:<MYBook></MYBook>
      },
      {
        path:"librarian-orders",
        element:<LibrarianOrders></LibrarianOrders>
      },
      {
        path:"user-management",
        element:<UserManagementTable></UserManagementTable>
      },
      {
        path:"all-books",
        element:<AllBooks></AllBooks>
      }
    ],
  },
]);
