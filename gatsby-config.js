
module.exports = {
  siteMetadata: {
    title: `Serverless Handbook`,
    description: `a resource teaching frontend engineers everything they need to know to dive into backend`,
    author: `@swizec`,
    siteUrl: `https://serverlesshandbook.dev/`,
    courseFirstLesson: `/getting-started`,
    convertkit: {
      userId: "785fc7ef1f",
      formId: "772ba7c9ba",
      url: "https://pages.convertkit.com/785fc7ef1f/772ba7c9ba",
    },
  },
  plugins: [
    "@swizec/gatsby-theme-course-platform",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Serverless Handbook",
        short_name: "Serverless Handbook",
        description:
          "a resource teaching frontend engineers everything they need to know to dive into backend",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#FF002B",
        display: "standalone",
        icon: "./static/icon.png",
      },
    },
    "gatsby-plugin-offline",
  ],
}
