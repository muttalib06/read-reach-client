import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Book,
  Award,
  Edit2,
  Camera,
  Save,
  X,
} from "lucide-react";
import { RxActivityLog } from "react-icons/rx";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import axios from "axios";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const axiosSecure = useAxiosSecure();

  // fetch user data from mongodb;

  const { data: dbUser } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  //   fetch order data from mongodb;

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/three-orders?email=${user.email}`);
      return res.data;
    },
  });

  //   fetch all orders of this user

  const { data: allOrders = [], isLoading } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  //   fetch only delivered orders

  const { data: deliveredOrders = [] } = useQuery({
    queryKey: ["deliveredOrder", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/delivered-orders?email=${user.email}`
      );
      return res.data;
    },
  });

  //   update profile feature

  const [formData, setFormData] = useState({
    name: user.displayName,
    image: user.photoURL,
  });
  const [imagePreview, setImagePreview] = useState(user.photoURL);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    }
  };

  //   handle update function;
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;

      // upload image to imagebb server;
      const formDataToUpload = new FormData();
      formDataToUpload.append("image", formData.image);
      const key = import.meta.env.VITE_IMAGEBB_API_KEY;
      const uploadImageUrl = `https://api.imgbb.com/1/upload?key=${key}`;
      const imageUploadRes = await axios.post(uploadImageUrl, formDataToUpload);
      imageUrl = imageUploadRes.data.data.url;

      // update firebase profile with name and image;
      await updateUserProfile(formData.name, imageUrl);

      // update local state
      setFormData({
        name: formData.name,
        image: imageUrl,
      });
      setImagePreview(imageUrl);

      // exit edit mode;
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.displayName,
      image: user.photoURL,
    });
    setImagePreview(user.photoURL);
    setIsEditing(false);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div
            className="h-32 sm:h-40"
            style={{
              background: "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
            }}
          ></div>

          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="relative -mt-16 sm:-mt-20 mb-4">
              <div className="relative inline-block">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {user.displayName}
                </h1>
                <p
                  className="text-lg font-medium mt-1"
                  style={{ color: "#ff7236" }}
                >
                  {dbUser?.role}
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all hover:shadow-lg self-start"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
                  }}
                >
                  <Edit2 size={18} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Update Form or Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {isEditing ? (
              /* Edit Profile Form */
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Update Profile
                </h2>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </label>
                    <div className="flex items-center gap-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover border-2"
                        style={{ borderColor: "#ff7236" }}
                      />
                      <label
                        className="flex-1 px-4 py-2.5 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        style={{ borderColor: "#ff7236" }}
                      >
                        <span
                          style={{ color: "#ff7236" }}
                          className="font-medium"
                        >
                          Choose Image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, PNG or GIF
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
                      }}
                    >
                      <Save size={18} />
                      <span>{loading ? "Saving..." : "Save Changes"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-4 py-2.5 rounded-lg border-2 font-medium transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ borderColor: "#ff7236", color: "#ff7236" }}
                    >
                      <X size={18} className="inline" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* profile Information Card */
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  My Profile
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
                      }}
                    >
                      <Mail size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="text-gray-900 font-medium wrap-break-words">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
                      }}
                    >
                      <Phone size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="text-gray-900 font-medium">
                        {dbUser?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
                      }}
                    >
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="text-gray-900 font-medium wrap-break-words">
                        {dbUser?.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
                      }}
                    >
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Member Since</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(user.metadata.creationTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Statistics
              </h2>

              <div className="space-y-4">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 114, 54, 0.1) 0%, rgba(255, 153, 102, 0.1) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Book size={24} style={{ color: "#ff7236" }} />
                      <span className="text-gray-700 font-medium">
                        Books Delivered
                      </span>
                    </div>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#ff7236" }}
                    >
                      {deliveredOrders.length}
                    </span>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 114, 54, 0.1) 0%, rgba(255, 153, 102, 0.1) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Award size={24} style={{ color: "#ff7236" }} />
                      <span className="text-gray-700 font-medium">
                        Active Orders
                      </span>
                    </div>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#ff7236" }}
                    >
                      {allOrders.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed">
                Passionate reader and book enthusiast. I love exploring
                different genres and discovering new authors. ReadReach has made
                it incredibly convenient for me to access books from my nearest
                library without leaving home. Reading is not just a hobby for
                me, it's a way of life.
              </p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h2>

              <div className="space-y-4">
                {orders.length === 0 && (
                  <div className="bg-gray-50 w-full p-8 rounded flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center space-y-3">
                      <RxActivityLog />
                      <h3 className="text-xl">No Recent Activity</h3>
                    </div>
                  </div>
                )}
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7236 0%, #ff9966 100%)",
                      }}
                    >
                      <Book size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {order.bookName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Order Date: {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
