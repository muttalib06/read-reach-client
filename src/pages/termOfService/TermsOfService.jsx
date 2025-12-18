import React, { useEffect } from "react";
import { Book,  AlertCircle, FileText } from "lucide-react";

export default function TermsOfService() {
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
            <FileText
              className="w-10 h-10 flex-shrink-0 mt-1"
              style={{ color: "#ff7236" }}
            />
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Terms of Service
              </h2>
              <p className="text-gray-600">Last Updated: {lastUpdated}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Welcome to ReadReach. By accessing or using our book delivery
            service, you agree to be bound by these Terms of Service. Please
            read them carefully.
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              By creating an account and using ReadReach's services, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms of Service and our Privacy Policy. If you do not
              agree to these terms, please do not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued
              use of the service after changes constitutes acceptance of the
              modified terms.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              2. Service Description
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              ReadReach provides a platform that connects users with nearby
              libraries to facilitate book delivery to their homes. Our services
              include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Book search and browsing from participating libraries</li>
              <li>Home delivery of physical books</li>
              <li>Book return coordination</li>
              <li>Account management and order tracking</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              To use ReadReach, you must create an account and provide accurate,
              complete information. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>
                Ensuring you meet the minimum age requirement (13 years or
                older, or 18 years in some jurisdictions)
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              4. Book Borrowing and Returns
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When borrowing books through ReadReach:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Books remain the property of the lending library</li>
              <li>You must return books by the specified due date</li>
              <li>Late fees may apply as per the library's policies</li>
              <li>
                You are responsible for any damage or loss of borrowed materials
              </li>
              <li>
                Books must be returned in the same condition as received,
                accounting for normal wear
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              5. Delivery Services
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our delivery service is subject to the following terms:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>
                Someone must be present to receive deliveries or provide
                delivery instructions
              </li>
              <li>
                We are not responsible for books left per your delivery
                instructions
              </li>
              <li>
                Delivery fees are non-refundable once the book has been
                dispatched
              </li>
              <li>
                Service availability depends on your location and participating
                libraries
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              6. Payment and Fees
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              By using our service, you agree to pay all applicable fees,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Delivery fees as displayed at checkout</li>
              <li>Late return fees as determined by the lending library</li>
              <li>Replacement costs for lost or damaged books</li>
              <li>Any applicable taxes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              All payments are processed securely through our payment partners.
              You authorize us to charge your payment method for all fees
              incurred.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              7. User Conduct
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Provide false or misleading information</li>
              <li>Attempt to access unauthorized areas of our system</li>
              <li>Interfere with or disrupt the service</li>
              <li>
                Use the service for any commercial purpose without authorization
              </li>
              <li>Share your account with others</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              8. Intellectual Property
            </h3>
            <p className="text-gray-700 leading-relaxed">
              All content on ReadReach, including text, graphics, logos, and
              software, is the property of ReadReach or its licensors and is
              protected by copyright and other intellectual property laws. You
              may not copy, reproduce, or distribute any content without express
              written permission.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              9. Privacy
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Our Privacy Policy explains how
              we collect, use, and protect your personal information. By using
              ReadReach, you consent to our data practices as described in the
              Privacy Policy.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              10. Limitation of Liability
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                ReadReach is provided "as is" without warranties of any kind
              </li>
              <li>
                We are not liable for any indirect, incidental, or consequential
                damages
              </li>
              <li>
                Our total liability shall not exceed the amount you paid for
                services in the past 12 months
              </li>
              <li>
                We are not responsible for delays or failures caused by
                circumstances beyond our control
              </li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              11. Termination
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your account at any
              time for violation of these terms or for any other reason at our
              discretion. Upon termination, you must return all borrowed books
              immediately. You may also close your account at any time, but
              remain responsible for any outstanding obligations.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              12. Dispute Resolution
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these terms or your use of ReadReach
              shall be resolved through binding arbitration in accordance with
              the rules of the American Arbitration Association, except where
              prohibited by law. You waive any right to participate in a class
              action lawsuit or class-wide arbitration.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              13. Governing Law
            </h3>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service shall be governed by and construed in
              accordance with the laws of the jurisdiction in which ReadReach
              operates, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              14. Contact Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-1">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@readreach.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> 1-800-READ-BOOK
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> ReadReach Legal Department, 123
                Library Lane, Booktown, BK 12345
              </p>
            </div>
          </section>
        </div>

        {/* Notice Box */}
        <div
          className="mt-8 bg-orange-50 border-l-4 rounded-lg p-4 sm:p-6 flex gap-4"
          style={{ borderColor: "#ff7236" }}
        >
          <AlertCircle
            className="w-6 h-6 flex-shrink-0 mt-0.5"
            style={{ color: "#ff7236" }}
          />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Important Notice
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              These terms constitute a legal agreement between you and
              ReadReach. By continuing to use our services, you acknowledge that
              you have read and understood these terms and agree to be bound by
              them.
            </p>
          </div>
        </div>
      </main>

    
    </div>
  );
}
