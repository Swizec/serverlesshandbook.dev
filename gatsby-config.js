module.exports = {
  siteMetadata: {
    title: `Serverless Handbook for Frontend Engineers`,
    description: `Dive into modern backend. Understand any backend.`,
    author: `@swizec`,
    siteUrl: `https://serverlesshandbook.dev/`,
    courseFirstLesson: `/getting-started`,
    convertkit: {
      defaultFormId: "2103715",
      claimFormId: "2175932",
    },
    hasAuthentication: true,
  },
  plugins: [
    "@swizec/gatsby-theme-course-platform",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Serverless Handbook for Frontend Engineers",
        short_name: "Serverless Handbook for Frontend Engineers",
        description:
          "Learn everything you need to dive into modern backend. Understand any backend.",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#FF002B",
        display: "standalone",
        icon: "./static/icon.png",
      },
    },
    "gatsby-plugin-remove-serviceworker",
  ],
}
