module.exports = {
  publicPath: '/cfda/',
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  }
}