const S3Plugin = require('webpack-s3-plugin')

module.exports = {
  publicPath: 'https://cdn.paperplane.cc/paperplane-cfda/',
  configureWebpack: {
    externals: {
      BMap: 'BMap',
    },
  },
  chainWebpack(config) {
    config.plugin('S3Plugin').use(S3Plugin, [
      {
        exclude: /.*\.html$/,
        basePath: 'paperplane-cfda',
        s3Options: {
          accessKeyId: process.env.COS_SECRET_ID,
          secretAccessKey: process.env.COS_SECRET_KEY,
          region: 'ap-hongkong',
          endpoint: 'https://cos.ap-hongkong.myqcloud.com',
          apiVersion: '2006-03-01',
        },
        s3UploadOptions: {
          Bucket: 'paperplane-cdn-1253277322',
        },
      },
    ])
  },
}
