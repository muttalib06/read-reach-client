import React, { useEffect } from "react";
import {
  Book,
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
  Bell,
} from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "December 18, 2025";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Shield
              className="w-10 h-10 flex-shrink-0 mt-1"
              style={{ color: "#ff7236" }}
            />
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Privacy Policy
              </h2>
              <p className="text-gray-600">Last Updated: {lastUpdated}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            At ReadReach, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our book delivery service. Please read this
            policy carefully.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 sm:p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6" style={{ color: "#ff7236" }} />
            Privacy at a Glance
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                What We Collect
              </h4>
              <p className="text-sm text-gray-700">
                Personal info, delivery addresses, reading preferences, and
                usage data
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                How We Use It
              </h4>
              <p className="text-sm text-gray-700">
                To deliver books, improve service, and provide personalized
                recommendations
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Who We Share With
              </h4>
              <p className="text-sm text-gray-700">
                Partner libraries, delivery services, and essential service
                providers only
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Your Rights</h4>
              <p className="text-sm text-gray-700">
                Access, update, delete your data, and opt-out of communications
                anytime
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6" style={{ color: "#ff7236" }} />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                1. Information We Collect
              </h3>
            </div>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Personal Information
            </h4>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you create an account or use our services, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Name, email address, and phone number</li>
              <li>Delivery address and billing information</li>
              <li>Date of birth (for age verification)</li>
              <li>Library card numbers (from participating libraries)</li>
              <li>
                Payment information (processed securely by our payment partners)
              </li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Usage Information
            </h4>
            <p className="text-gray-700 leading-relaxed mb-3">
              We automatically collect information about how you use ReadReach:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Books you browse, borrow, and return</li>
              <li>Search queries and reading preferences</li>
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and location data</li>
              <li>Pages visited and features used</li>
              <li>Time spent on our platform</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Cookies and Tracking Technologies
            </h4>
            <p className="text-gray-700 leading-relaxed">
              We use cookies, web beacons, and similar technologies to enhance
              your experience, analyze usage patterns, and deliver personalized
              content. You can control cookie preferences through your browser
              settings.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6" style={{ color: "#ff7236" }} />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                2. How We Use Your Information
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Service Delivery:</strong> Process and fulfill book
                orders, coordinate deliveries and returns
              </li>
              <li>
                <strong>Account Management:</strong> Create and maintain your
                account, verify your identity
              </li>
              <li>
                <strong>Payment Processing:</strong> Process transactions and
                prevent fraud
              </li>
              <li>
                <strong>Communication:</strong> Send order updates, delivery
                notifications, and service announcements
              </li>
              <li>
                <strong>Personalization:</strong> Provide book recommendations
                based on your reading history
              </li>
              <li>
                <strong>Improvement:</strong> Analyze usage to enhance our
                platform and services
              </li>
              <li>
                <strong>Customer Support:</strong> Respond to inquiries and
                resolve issues
              </li>
              <li>
                <strong>Legal Compliance:</strong> Meet legal obligations and
                enforce our terms
              </li>
              <li>
                <strong>Marketing:</strong> Send promotional materials (with
                your consent)
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6" style={{ color: "#ff7236" }} />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                3. How We Share Your Information
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may share your information with:
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Partner Libraries
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              We share necessary information with participating libraries to
              facilitate book borrowing, including your name, library card
              number, and borrowing history.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Delivery Service Providers
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              We share your name, delivery address, and contact information with
              our delivery partners to fulfill orders.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Payment Processors
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment information is shared with secure third-party payment
              processors to complete transactions.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Service Providers
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              We work with trusted third-party companies that help us operate
              our business, such as hosting providers, analytics services, and
              customer support tools.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Legal Requirements
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may disclose your information if required by law, court order,
              or government request, or to protect our rights, property, or
              safety.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Business Transfers
            </h4>
            <p className="text-gray-700 leading-relaxed">
              If ReadReach is involved in a merger, acquisition, or sale of
              assets, your information may be transferred as part of that
              transaction.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6" style={{ color: "#ff7236" }} />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                4. Data Security
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement robust security measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure servers with regular security updates</li>
              <li>
                Limited access to personal information (need-to-know basis)
              </li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the Internet is 100%
              secure. While we strive to protect your information, we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6" style={{ color: "#ff7236" }} />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                5. Your Privacy Rights
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Access and Portability
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Request access to the personal information we hold about you and
              receive a copy in a portable format.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Correction
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Update or correct inaccurate or incomplete personal information.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">Deletion</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Request deletion of your personal information, subject to certain
              exceptions (e.g., legal obligations, outstanding transactions).
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">Opt-Out</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unsubscribe from marketing emails or opt-out of certain data
              collection practices.
            </p>

            <h4 className="font-semibold text-gray-900 mt-4 mb-2">
              Restriction
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Request that we limit how we use your information.
            </p>

            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at
              privacy@readreach.com. We will respond to your request within 30
              days.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              6. Data Retention
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide our services and maintain your account</li>
              <li>
                Comply with legal obligations (e.g., tax records, transaction
                history)
              </li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Prevent fraud and abuse</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              When information is no longer needed, we securely delete or
              anonymize it.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              7. Children's Privacy
            </h3>
            <p className="text-gray-700 leading-relaxed">
              ReadReach is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us
              immediately, and we will delete such information.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              8. Third-Party Links
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our platform may contain links to third-party websites or
              services. We are not responsible for the privacy practices of
              these external sites. We encourage you to review their privacy
              policies before providing any personal information.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              9. International Data Transfers
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries
              other than your own. These countries may have different data
              protection laws. We ensure appropriate safeguards are in place to
              protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6" style={{ color: "#ff7236" }} />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                10. Updates to This Policy
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any material changes by posting the new policy on our website
              and updating the "Last Updated" date. Your continued use of
              ReadReach after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              11. California Privacy Rights (CCPA)
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are a California resident, you have additional rights under
              the California Consumer Privacy Act:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Know what personal information is collected, used, shared, or
                sold
              </li>
              <li>Delete personal information held by us</li>
              <li>
                Opt-out of the sale of personal information (we do not sell your
                data)
              </li>
              <li>Non-discrimination for exercising your CCPA rights</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              12. European Privacy Rights (GDPR)
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are in the European Economic Area, you have rights under
              the General Data Protection Regulation:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              13. Contact Us
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-2">
              <p className="text-gray-700">
                <strong>Privacy Team:</strong> privacy@readreach.com
              </p>
              <p className="text-gray-700">
                <strong>Data Protection Officer:</strong> dpo@readreach.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> 1-800-PRIVACY (1-800-774-8229)
              </p>
              <p className="text-gray-700">
                <strong>Mail:</strong> ReadReach Privacy Office, 123 Library
                Lane, Booktown, BK 12345
              </p>
            </div>
          </section>
        </div>

        {/* Privacy Commitment Box */}
        <div
          className="mt-8 bg-white border-2 rounded-lg p-6 sm:p-8"
          style={{ borderColor: "#ff7236" }}
        >
          <div className="flex items-start gap-4">
            <Shield
              className="w-8 h-8 flex-shrink-0 mt-1"
              style={{ color: "#ff7236" }}
            />
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Our Privacy Commitment
              </h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                At ReadReach, protecting your privacy is fundamental to
                everything we do. We are committed to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ff7236" }}>✓</span>
                  <span>Being transparent about our data practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ff7236" }}>✓</span>
                  <span>Giving you control over your information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ff7236" }}>✓</span>
                  <span>
                    Protecting your data with industry-leading security
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#ff7236" }}>✓</span>
                  <span>Never selling your personal information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
