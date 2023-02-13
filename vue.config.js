module.exports = {
  baseUrl: '/cfda/',
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  }
}