export const formsQuery = `
  query {
    site {
      siteMetadata {
        convertkit {
          defaultFormId
        }
      }
    }
  }
`
