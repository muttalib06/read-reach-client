import React, { useEffect, useState } from "react";
import {
  Book,
  Cookie,
  Shield,
  Check,
  X,
  Settings,
  Info,
  BarChart,
  Target,
  Sparkles,
} from "lucide-react";

export default function CookieSettings() {
  const lastUpdated = "December 18, 2025";

  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // Always enabled
    functional: true,
    analytics: true,
    marketing: false,
  });

  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleToggle = (category) => {
    if (category === "necessary") return; // Can't disable necessary cookies

    setCookieSettings((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleAcceptAll = () => {
    setCookieSettings({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    saveSettings();
  };

  const handleRejectAll = () => {
    setCookieSettings({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
    saveSettings();
  };

  const saveSettings = () => {
    // Here you would typically save to backend or browser storage
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  const ToggleSwitch = ({ enabled, category }) => (
    <button
      onClick={() => handleToggle(category)}
      disabled={category === "necessary"}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-green-500" : "bg-gray-300"
      } ${
        category === "necessary"
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const CookieCard = ({
    icon: Icon,
    title,
    description,
    category,
    enabled,
    details,
  }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-orange-50 flex-shrink-0">
            <Icon className="w-5 h-5" style={{ color: "#ff7236" }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <ToggleSwitch enabled={enabled} category={category} />
      </div>

      {category === "necessary" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <p className="text-xs text-blue-900 flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              Always Active - Required for basic website functionality
            </span>
          </p>
        </div>
      )}

      <details className="mt-3">
        <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 flex items-center gap-2">
          <span>View Details</span>
          <Info className="w-4 h-4" />
        </summary>
        <div className="mt-3 pl-4 border-l-2 border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            {details.purpose}
          </p>
          <div className="space-y-1 text-xs text-gray-500">
            <p>
              <strong>Duration:</strong> {details.duration}
            </p>
            <p>
              <strong>Examples:</strong> {details.examples}
            </p>
          </div>
        </div>
      </details>
    </div>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Cookie
              className="w-10 h-10 flex-shrink-0 mt-1"
              style={{ color: "#ff7236" }}
            />
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Cookie Settings
              </h2>
              <p className="text-gray-600 mb-4">Last Updated: {lastUpdated}</p>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience on ReadReach. You can customize your cookie
                preferences below. Learn more about how we use cookies in our{" "}
                <a
                  href="/privacy-policy"
                  className="font-medium hover:underline"
                  style={{ color: "#ff7236" }}
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 sm:p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ backgroundColor: "#ff7236" }}
            >
              <Check className="w-5 h-5" />
              Accept All Cookies
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Reject Non-Essential
            </button>
            <button
              onClick={saveSettings}
              className="flex-1 px-6 py-3 bg-white border-2 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              style={{ borderColor: "#ff7236", color: "#ff7236" }}
            >
              <Settings className="w-5 h-5" />
              Save Preferences
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSavedMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">
              Your cookie preferences have been saved successfully!
            </p>
          </div>
        )}

        {/* Cookie Categories */}
        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Cookie Categories
          </h3>

          {/* Necessary Cookies */}
          <CookieCard
            icon={Shield}
            title="Necessary Cookies"
            description="Essential cookies that enable core functionality like security, authentication, and basic navigation. These cannot be disabled."
            category="necessary"
            enabled={cookieSettings.necessary}
            details={{
              purpose:
                "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.",
              duration: "Session or up to 1 year",
              examples:
                "Authentication tokens, session IDs, security cookies, load balancing cookies",
            }}
          />

          {/* Functional Cookies */}
          <CookieCard
            icon={Settings}
            title="Functional Cookies"
            description="Enhance functionality and personalization, such as remembering your preferences, language settings, and region."
            category="functional"
            enabled={cookieSettings.functional}
            details={{
              purpose:
                "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
              duration: "Up to 1 year",
              examples:
                "Language preferences, font size settings, delivery location, recently viewed books",
            }}
          />

          {/* Analytics Cookies */}
          <CookieCard
            icon={BarChart}
            title="Analytics Cookies"
            description="Help us understand how visitors interact with our website by collecting and reporting information anonymously."
            category="analytics"
            enabled={cookieSettings.analytics}
            details={{
              purpose:
                "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services and user experience.",
              duration: "Up to 2 years",
              examples:
                "Google Analytics, page views, time on site, bounce rate, traffic sources",
            }}
          />

          {/* Marketing Cookies */}
          <CookieCard
            icon={Target}
            title="Marketing Cookies"
            description="Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness."
            category="marketing"
            enabled={cookieSettings.marketing}
            details={{
              purpose:
                "These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing and ensuring that ads are properly displayed.",
              duration: "Up to 1 year",
              examples:
                "Facebook Pixel, Google Ads, retargeting pixels, social media cookies",
            }}
          />
        </div>

        {/* What Are Cookies Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles
              className="w-6 h-6 flex-shrink-0 mt-1"
              style={{ color: "#ff7236" }}
            />
            <h3 className="text-2xl font-bold text-gray-900">
              What Are Cookies?
            </h3>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Cookies are small text files that are placed on your device when
              you visit a website. They are widely used to make websites work
              more efficiently and provide information to website owners.
            </p>
            <p>
              Cookies help us remember your preferences, understand how you use
              our service, and provide you with a personalized experience. They
              also help us improve ReadReach by showing us which features are
              most popular and where we can make enhancements.
            </p>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Types of Cookies We Use
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#ff7236" }}
                ></div>
                Session Cookies
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Temporary cookies that expire when you close your browser. Used
                for essential functions like maintaining your login session.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#ff7236" }}
                ></div>
                Persistent Cookies
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Remain on your device for a set period. Used to remember your
                preferences and provide a personalized experience on return
                visits.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#ff7236" }}
                ></div>
                First-Party Cookies
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Set directly by ReadReach. These help us operate our website and
                understand how you use our services.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#ff7236" }}
                ></div>
                Third-Party Cookies
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Set by external services we use, such as analytics or
                advertising partners. You can control these through your
                preferences above.
              </p>
            </div>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Managing Cookies in Your Browser
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most web browsers allow you to control cookies through their
            settings. However, limiting cookies may impact your experience on
            ReadReach and prevent you from using certain features.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ff7236", color: "white" }}
              >
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Chrome</h4>
                <p className="text-sm text-gray-600">
                  Settings → Privacy and Security → Cookies and other site data
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ff7236", color: "white" }}
              >
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Firefox</h4>
                <p className="text-sm text-gray-600">
                  Options → Privacy & Security → Cookies and Site Data
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ff7236", color: "white" }}
              >
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Safari</h4>
                <p className="text-sm text-gray-600">
                  Preferences → Privacy → Manage Website Data
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ff7236", color: "white" }}
              >
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Edge</h4>
                <p className="text-sm text-gray-600">
                  Settings → Privacy, search, and services → Cookies and site
                  permissions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Questions About Cookies?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about our use of cookies or this Cookie
            Settings page, please contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong> privacy@readreach.com
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> 1-800-PRIVACY (1-800-774-8229)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
