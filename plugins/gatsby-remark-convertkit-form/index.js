const { selectAll } = require('unist-util-select')

function convertkitSnippet({ userId, formId }) {
  const snippet = `
  <script async
    data-uid="${userId}"
    src="https://f.convertkit.com/${userId}/${formId}.js">
  </script>`
  return snippet
}

module.exports = ({ markdownAST }, pluginOptions) => {
  // Manipulate AST
  const convertkitReferences = selectAll(
    'paragraph linkReference:only-child',
    markdownAST
  ).filter(node => {
    return node.identifier === 'convertkit'
  })

  const { userId, formId } = pluginOptions

  convertkitReferences.forEach(node => {
    node.type = 'html'
    node.children = undefined
    node.value = convertkitSnippet({ userId, formId })
  })

  return markdownAST
}
