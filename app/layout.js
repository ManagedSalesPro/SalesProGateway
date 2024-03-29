import { Inter } from "next/font/google";
import { getSEOTags } from "../libs/seo.js";
import ClientLayout from "./components/LayoutClient.js";
import config from "../config.js";
import "./settings/globals.css";

const font = Inter({ subsets: ["latin"] });

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      <head>
        <script
          defer
          data-domain={config.domainName}
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body>
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
