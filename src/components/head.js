import React from "react"
import { Helmet } from "react-helmet"

export default props => {
  const title       = [props.title, "Serverless Handbook"].filter(Boolean).join(" | ")
  const description = props.description || "a resource teaching frontend engineers everything they need to know to dive into backend"
  const image       = props.image || "https://serverlesshandbook.dev/card.png"

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-us",
      }}
    >
      <title>{title}</title>
      <link rel="icon" href="/icon.png" />
      <meta name="description"         content={description}/>

      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@swizec" />
      <meta name="twitter:title"       content={props.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      <meta property="og:title"        content={props.title} />
      <meta property="og:type"         content="article" />
      <meta property="og:url"          content="https://serverlesshandbook.dev" />
      <meta property="og:image"        content={image} />

      <script src="https://gumroad.com/js/gumroad.js"></script>
    </Helmet>
  )
}
