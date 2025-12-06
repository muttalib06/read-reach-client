import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/home/Home";
import Books from "../pages/books/Books";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

export const router = createBrowserRouter([
        {
                path:"/",
                element:<MainLayout></MainLayout>,
                children:[
                        {
                                index:true,
                                element:<Home></Home>
                        },
                        {
                                path:"books",
                                element:<Books></Books>
                        },
                        {
                                path:"login",
                                element:<LoginPage></LoginPage>
                        },
                        {
                                path:"signup",
                                element:<SignupPage></SignupPage>
                        }
                        
                ]
        },

        {
                path:"dashboard",
                element:<DashboardLayout></DashboardLayout>
        }

])