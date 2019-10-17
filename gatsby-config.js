const remarkPlugins = [
    require('remark-slug'),
]

module.exports = {
    plugins: [{
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`
            }
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                remarkPlugins,
                plugins: ['gatsby-remark-images'],
                gatsbyRemarkPlugins: [
                    'gatsby-remark-copy-linked-files',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            markdownCaptions: true,
                            maxWidth: 890,
                            linkImagestoOriginal: false,
                            showCaptions: ['title', 'alt'],
                            withWebp: true,
                            tracedSVG: {
                                color: `lightgray`,
                                optTolerance: 0.4,
                                turdSize: 100,
                                turnPolicy: 'TURNPOLICY_MAJORITY',
                            },
                        },
                    },
                ]
            }
        },
        'gatsby-plugin-catch-links',
        'gatsby-plugin-theme-ui',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: 'UA-1464315-32',
                anonymize: true,
                respectDNT: true
            }
        },
        {
            resolve: 'gatsby-plugin-facebook-pixel',
            options: {
                pixelId: '2634718133254322'
            }
        },
        'gatsby-plugin-simple-analytics'
    ],
}