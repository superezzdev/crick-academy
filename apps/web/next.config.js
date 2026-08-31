const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  extendDefaultRuntimeCaching: true,
  fallbacks: {
    document: "/~offline"
  },
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        // Offline shell caching for dashboard, portal, coach, parent pages & RSC requests
        urlPattern: ({ url }) => {
          const pathname = url.pathname;
          return (
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/portal") ||
            pathname.startsWith("/coach") ||
            pathname.startsWith("/parent")
          );
        },
        handler: "NetworkFirst",
        options: {
          cacheName: "cca-app-shell",
          networkTimeoutSeconds: 7,
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        // Static icons, images, SVGs
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif|ico)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "cca-static-images",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        // Google fonts stylesheets & webfonts
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "cca-google-fonts",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@crick-academy/ui",
    "@crick-academy/database",
    "@crick-academy/types"
  ],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

module.exports = withPWA(nextConfig);
