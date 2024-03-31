module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  }
}