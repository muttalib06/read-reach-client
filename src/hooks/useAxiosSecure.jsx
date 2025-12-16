import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

// create axios instance
const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptors
    const reqInterceptor = instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // response interceptor;
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 403 || statusCode === 401) {
          await logOut();
          navigate(statusCode === 403 ? "/forbidden" : "/unauthorized");
        }

        return Promise.reject(error);
      }
    );

    // cleaning up interceptors
    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return instance;
};

export default useAxiosSecure;
