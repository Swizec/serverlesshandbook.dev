import React, { useState, useEffect } from "react"
import fetch from "isomorphic-fetch"

const API_KEY = "BbjXTpBIYN0GwoBCRpPLUCF08EPJ6PUp"

export const Giphy = ({ search, id }) => {
  const [src, setSrc] = useState([])

  useEffect(() => {
    ;(async () => {
      if (search) {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=1&sort=relevant&lang=en`

        const { data: gifs } = await fetch(url).then(res => res.json())

        setSrc([{ src: gifs[0].images.looping.mp4, type: "video/mp4" }])
      } else if (id) {
        const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`

        const { data } = await fetch(url).then(res => res.json())

        setSrc([{ src: data.images.looping.mp4, type: "video/mp4" }])
      }
    })()
  }, [search])

  const srcHTML = src.map(
    ({ src, type }) => `<source src=${src} type=${type} />`
  )

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <video controls autoplay loop muted playsinline>
            ${srcHTML.join("\n")}
        </video>
    `,
      }}
    />
  )
}
