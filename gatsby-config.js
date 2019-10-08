const remarkPlugins = [
    require('remark-slug'),
]

module.exports = {
    plugins: [{
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                remarkPlugins,
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