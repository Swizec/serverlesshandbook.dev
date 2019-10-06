/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require("gatsby-source-filesystem")
const sizeOf = require("image-size")
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const chapterTempalte = path.resolve("./src/templates/chapter.js")

  const chapters = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            title
          }
        }
      }
    }
  `)

  if (chapters.errors) {
    throw chapters.errors
  }

  console.log(chapters.data.allMarkdownRemark.edges)
}
