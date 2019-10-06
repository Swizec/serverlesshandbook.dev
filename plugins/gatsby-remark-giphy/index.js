const giphy = require('@agentofuser/remark-giphy').default

module.exports = async ({ markdownAST }, pluginOptions) => {
  // Manipulate AST
  const { giphyApiKey } = pluginOptions
  const treeTransformer = giphy({ giphyApiKey })

  return await treeTransformer(markdownAST)
}
