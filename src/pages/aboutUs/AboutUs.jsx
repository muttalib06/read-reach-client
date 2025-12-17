import React, { useEffect } from "react";
import {
  BookOpen,
  Truck,
  Clock,
  Shield,
  Users,
  MapPin,
  Heart,
  Award,
} from "lucide-react";
import { NavLink } from "react-router";

const AboutUs = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Vast Collection",
      description:
        "Access thousands of books from multiple libraries in your area",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Doorstep Delivery",
      description:
        "Get books delivered right to your home with free pickup service",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Duration",
      description:
        "Borrow books for your preferred duration with easy renewals",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description:
        "Your personal information and transactions are fully protected",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Books Available" },
    { number: "5,000+", label: "Happy Readers" },
    { number: "50+", label: "Partner Libraries" },
    { number: "15+", label: "Cities Covered" },
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Love for Reading",
      description: "We believe reading enriches lives and opens new worlds",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      description: "Supporting local libraries and building reader communities",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description:
        "Committed to providing the best service and user experience",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#ff7236] to-[#ff8c5a] text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Bringing Libraries to Your Doorstep
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
              ReadReach connects book lovers with their local libraries through
              a seamless delivery service, making reading more accessible than
              ever before.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
                <p>
                  ReadReach was born from a simple observation: people love
                  reading, but visiting libraries can be time-consuming. We
                  wondered, what if we could bring the library experience
                  directly to readers' homes?
                </p>
                <p>
                  Founded in 2024, we partnered with local libraries to create a
                  bridge between traditional library services and modern
                  convenience. Our platform allows readers to browse extensive
                  collections, reserve books, and have them delivered right to
                  their doorstep.
                </p>
                <p>
                  Today, we're proud to serve thousands of readers across
                  multiple cities, supporting local libraries while making
                  reading more accessible to everyone.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#ff7236]/10 to-[#ff8c5a]/10 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-[#ff7236] mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm md:text-base text-slate-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              How ReadReach Works
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Simple, convenient, and designed with readers in mind
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
              >
                <div className="w-16 h-16 bg-[#ff7236]/10 rounded-xl flex items-center justify-center text-[#ff7236] mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Get Started in 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative text-center">
              <div className="w-20 h-20 bg-[#ff7236] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                Browse & Select
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Search our extensive collection and find books you love
              </p>
            </div>

            <div className="relative text-center">
              <div className="w-20 h-20 bg-[#ff7236] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                Request Delivery
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Choose your delivery time and confirm your address
              </p>
            </div>

            <div className="relative text-center">
              <div className="w-20 h-20 bg-[#ff7236] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                Read & Enjoy
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Receive your books and we'll pick them up when you're done
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Our Values
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 text-center"
              >
                <div className="w-14 h-14 bg-[#ff7236]/10 rounded-full flex items-center justify-center text-[#ff7236] mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#ff7236] to-[#ff8c5a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Reading?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of readers who are already enjoying the convenience
            of ReadReach
          </p>
          <NavLink
            to="/books"
            className="bg-white text-[#ff7236] px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Browse Books Now
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
