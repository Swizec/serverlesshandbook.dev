import React from "react"
import { Helmet } from "react-helmet"
import pkg from "rebass/package.json"

export default props => {
  const title = [props.title, "Serverless Handbook"].filter(Boolean).join(" | ")

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-us",
      }}
    >
      <title>{title}</title>
      <link rel="icon" href="/icon.png" />
      <meta
        name="description"
        content={
          "a resource teaching frontend engineers everything they need to know to dive into backend"
        }
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@jxnblk" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={pkg.description} />
      <meta
        name="twitter:image"
        content="https://serverlesshandbook.dev/card.png"
      />
      <script src="https://gumroad.com/js/gumroad.js"></script>
    </Helmet>
  )
}
