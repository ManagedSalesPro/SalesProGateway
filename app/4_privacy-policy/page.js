import Link from "next/link";
import { getSEOTags } from "../../libs/seo.js";
import config from "../../config.js";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: 2024-01-14

Privacy Policy for ManagedSalesPro

Last Updated: [Current Date]

Introduction

ManagedSalesPro ("we" or "us") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal and non-personal information when you visit our website and use our services.

Information We Collect

We collect the following types of information:

Personal Data: When you use our website, we may collect your name, email, and payment information solely for the purpose of order processing.

Non-Personal Data: We use web cookies to gather non-personal information about your visit, such as your browsing habits and preferences. These cookies help us enhance your user experience.

Purpose of Data Collection

We collect your personal data solely for the purpose of processing orders and providing you with our services. We use non-personal data to improve our website's functionality and tailor content to your preferences.

Data Sharing

We do not share your personal data with any third parties. Your information is kept confidential and used only for the purposes mentioned in this policy.

Children's Privacy

We do not knowingly collect any data from children under the age of 13. Our services are intended for individuals who are at least 13 years old or older.

Updates to the Privacy Policy

We may update this Privacy Policy from time to time. Users will be notified of any changes via email.

Contact Information

If you have any questions or concerns about our Privacy Policy or the data we collect, please contact us at abreham@adgroup.enterprises.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
