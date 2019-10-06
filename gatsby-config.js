module.exports = {
    siteMetadata: {
        title: `Serverless Handbook`,
        description: `Hello 👋`,
        author: `@swizec`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-styled-components',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/chapters`,
                name: 'chapters'
            }
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-youtube',
                    {
                        resolve: 'gatsby-remark-giphy',
                        options: {
                            giphyApiKey: process.env.GIPHY_API_KEY,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            showCaptions: true,
                            withWebp: true
                        }
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1.0725rem',
                        },
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                    {
                        resolve: `@raae/gatsby-remark-oembed`,
                        options: {
                            // defaults to false
                            // usePrefix: true,
                            providers: {
                                // Important to exclude providers
                                // that adds js to the page.
                                // If you do not need them.
                                exclude: ['Reddit'],
                            },
                        },
                    },
                    'gatsby-remark-a11y-emoji',
                    {
                        resolve: 'gatsby-plugin-typography',
                        options: {
                            pathToConfigModule: 'src/typography',
                        },
                    },
                ]
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `serverless-handbook`,
                short_name: `serverless`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: 'UA-1464315-32',
                head: false,
                anonymize: true,
                respectDNT: true,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}