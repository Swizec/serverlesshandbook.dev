import { graphql, Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { isMobile } from "react-device-detect"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import DateText from "../components/date-text"
// import About from "../widgets/About"
// import ConvertkitForm from "../widgets/ConvertkitForm"
// import { HeroTitle } from "../styles"

// const Wrapper = styled.div`
//   max-width: 700px;
//   margin: 0rem auto;
//   padding: 0 ${isMobile ? "1rem" : "2rem"};
//   img {
//     display: block;
//     max-width: 100%;
//     margin: auto;
//   }
//   iframe {
//     max-width: 100%;
//   }
//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6 {
//     margin-left: ${isMobile ? "-1rem" : "-4rem"};
//     margin-right: ${isMobile ? "-1rem" : "-4rem"};
//     text-align: center;
//     padding-top: 1rem;
//   }
//   form h1 {
//     margin: inherit;
//   }
//   pre {
//     margin-left: ${isMobile ? "-1rem" : "-4rem !important"};
//     margin-right: ${isMobile ? "-1rem" : "-4rem !important"};
//   }
// `

const ArticleTemplate = props => {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  const pathname = post.fields.slug

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        description={post.frontmatter.description || post.excerpt}
        pathname={pathname}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
      />
      <div>
        <h1 style={{ marginLeft: "auto", marginRight: "auto" }}>
          {post.frontmatter.title}
        </h1>
        <p>{/* <DateText {...post.frontmatter} /> */}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />
        <hr />

        {/* <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul> */}

        {/* <About /> */}
      </div>
    </Layout>
  )
}

export default ArticleTemplate

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        lastUpdated(formatString: "MMMM YYYY")
        description
        # image {
        #   publicURL
        #   childImageSharp {
        #     original {
        #       width
        #       height
        #     }
        #   }
        # }
      }
      fields {
        slug
      }
    }
  }
`
