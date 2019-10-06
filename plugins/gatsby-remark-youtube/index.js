const { selectAll } = require('unist-util-select')

const { stripIndent } = require('common-tags')

// assumes URL in format https://www.youtube.com/watch?v=q5xxyGwTxZs
function youtubeIframeFromUrl(url) {
  const videoId = url
    .trim()
    .match(/^https:\/\/www\.youtube\.com\/watch\?v=(\S+)$/)[1]
  const iframeStr = `
    <div style="padding-bottom: 1rem;">
      <div style="
             position: relative;
             width: 100%;
             height: 0;
             padding-bottom: 51%;
             margin: auto;
             ">
        <iframe
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          "
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            encrypted-media;
            gyroscope;
            picture-in-picture
          "
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  `
  return `\n\n${stripIndent(iframeStr)}\n\n`
}

module.exports = ({ markdownAST }, pluginOptions) => {
  // Manipulate AST
  const soloYoutubeLinks = selectAll(
    'paragraph link:only-child',
    markdownAST
  ).filter(node =>
    node.url.match(/^https:\/\/www\.youtube\.com\/watch\?v=(\S+)$/)
  )

  soloYoutubeLinks.forEach(node => {
    node.type = 'html'
    node.children = undefined
    node.value = youtubeIframeFromUrl(node.url)
  })

  return markdownAST
}
