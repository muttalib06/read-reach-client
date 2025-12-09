import React, { useRef } from "react";
import { FaBook } from "react-icons/fa";
import Count from "../../sharedComponents/count/Count";
import { useInView } from "framer-motion";

const Stats = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const stats = [
    {
      value: 5000,
      label: "Books Delivered",
      description: "Books delivered safely to readers’ doorsteps.",
    },
    {
      value: 120,
      label: "Partner Libraries",
      description: "Libraries collaborating to make reading more accessible.",
    },
    {
      value: 60,
      label: "Cities Covered",
      description: "Expanding our service reach across multiple cities.",
    },
    {
      value: 8500,
      label: "Active Users",
      description: "Readers relying on ReadReach every month.",
    },
  ];
  return (
    <div
      ref={sectionRef}
      className="flex items-center   justify-center p-6 mt-10"
    >
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl  p-8 md:p-12 relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-32 "></div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800  mb-3">
              Our Growth at a Glance
            </h1>
            <p className="text-gray-600 text-lg max-w-2/4">
              ReadReach is expanding every day—connecting readers with libraries
              across Bangladesh.These numbers reflect the trust our users place
              in our service.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className=" flex text-5xl md:text-6xl font-bold text-primary mb-3">
                  {isInView ? <Count number={stat.value}></Count> : 0}
                  <div>+</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
