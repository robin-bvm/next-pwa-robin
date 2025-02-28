export default function manifest() {
  return {
    name: "Next.js PWA",
    short_name: "NextPWA",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "https://plus.unsplash.com/premium_photo-1668902219322-08c0b1f3c12b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhY3RqcyUyMGxvZ298ZW58MHx8MHx8fDA%3D",
        sizes: "500x500",
        type: "image/png",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1668902219322-08c0b1f3c12b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhY3RqcyUyMGxvZ298ZW58MHx8MHx8fDA%3D",
        sizes: "500x500",
        type: "image/png",
      },
    ],
  };
}
