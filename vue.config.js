module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      'BMap': 'BMap'
    }
  }
}