import React, { useState, useEffect } from "react"
import { GiphyFetch } from "@giphy/js-fetch-api"

export const Giphy = ({ search }) => {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    ;(async () => {
      const gf = new GiphyFetch("BbjXTpBIYN0GwoBCRpPLUCF08EPJ6PUp")

      const { data: gifs } = await gf.search(search, {
        sort: "relevant",
        limit: 1,
        lang: "en",
      })

      setSrc(gifs[0].images.looping.mp4)
    })()
  }, [search])

  return src ? (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <video controls autoplay loop muted>
            <source src="${src}" type="video/mp4" />
        </video>
    `,
      }}
    />
  ) : null
}
