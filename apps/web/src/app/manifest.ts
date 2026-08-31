import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chandigarh Cricket Academy",
    short_name: "CCA Cricket",
    description:
      "Comprehensive Management & Performance Tracking App for Chandigarh Cricket Academy: Student Management, Fee Tracking, Net Sessions, Tournaments, and Analytics.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F5F1E6",
    theme_color: "#0B3D2E",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml"
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml"
      }
    ],
    categories: ["sports", "productivity", "management", "education"]
  };
}
