import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import chooseImg from "../../../assets/chooseImg.avif";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShippingFast className="w-8 h-8 text-primary" />,
      title: "Fast & Reliable Delivery",
      description:
        "ReadReach delivers books quickly and efficiently, ensuring you never have to wait in long library lines again. Enjoy smooth, on-time pickup and delivery every time.",
    },
    {
      icon: <FiMapPin className="w-8 h-8 text-primary" />,
      title: "Real-Time Delivery Tracking",
      description:
        "Your books are handled with the highest care. ReadReach uses secure packaging and verified couriers to ensure your books arrive in perfect condition.",
    },
    {
      icon: <GoPackage className="w-8 h-8 text-primary" />,
      title: "Safe & Secure Book Handling",
      description:
        "Your books are handled with the highest care. ReadReach uses secure packaging and verified couriers to ensure your books arrive in perfect condition.",
    },
    {
      icon: <LuClipboardList className="w-8 h-8 text-primary" />,
      title: "Simple & Convenient Request System",
      description:
        "Request, manage, or cancel your deliveries through an intuitive online dashboard. No paperwork or phone calls — ReadReach makes the entire process effortless.",
    },
  ];

  return (
    <div className=" mt-10 bg-[#f2f0ee] rounded py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            Why Choose Us?
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6  shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`${feature.bgColor} p-4 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4">
              <img
                src={chooseImg}
                alt="Dental Clinic"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
