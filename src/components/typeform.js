import React, { useEffect } from "react"
import { Box } from "rebass"

const Typeform = () => {
  useEffect(() => {
    // Taken from typeform
    ;(function() {
      var /*qs,*/
        js,
        q,
        // s,
        d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = "typef_orm",
        b = "https://embed.typeform.com/"
      if (!gi.call(d, id)) {
        js = ce.call(d, "script")
        js.id = id
        js.src = b + "embed.js"
        q = gt.call(d, "script")[0]
        q.parentNode.insertBefore(js, q)
      }
    })()
  }, [])

  return (
    <Box
      className="typeform-widget"
      data-url="https://swizecteller.typeform.com/to/AJgFM5"
      data-transparency="50"
      data-hide-headers="true"
      data-hide-footer="true"
      sx={{ height: 500 }}
    ></Box>
  )
}

export default Typeform
