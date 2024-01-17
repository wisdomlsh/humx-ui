const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = (isDev) => ({
  entry: path.join(__dirname, '../src/index.tsx'),
  mode: isDev ? "development" : "production",
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, "../dist"),
    clean: true, //w4 - clean-webpack-plugin
    publicPath: '/'
  },


  module: {
    rules: [

      /**
       * @description ts解析
       * @method loader
       */
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /.(png|jpg|jepg|git|svg)$/,
        type: 'assets',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            }
        },
        generator: {
            filename: 'static/images/[name][ext]'
        }
      },
      {
        test: /.(woff2|eot|ttf|otf)$/,
        type: 'assets',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            }
        },
        generator: {
            filename: 'static/fonts/[name][ext]'
        }
      },
      {
        test: /.(mp4|mp3|webm)$/,
        type: 'assets',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            }
        },
        generator: {
            filename: 'static/medias/[name][ext]'
        }
      },
      {
        oneOf: [
          {
            // 定义一下，使用 xxx.module.（less|css)
            test: /.module.(less|css)$/,
            include: [path.resolve(__dirname, '../src')],
            use: [
              !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  // 开启 css modules
                  modules: {
                    localIdentName: 'H--[local]-[hash:4]'
                  }
                }
              },
              "postcss-loader",
              "less-loader"
            ]
          },
          {
            test: /.(less|css)$/,
            use: [
              !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
              'css-loader',
              "postcss-loader",
              "less-loader"
            ]
          },
        ]


      }

    ]
  },

  /**
   * @description resolve|解析配置
   */
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      "@": path.join(__dirname, '../src')
    },
  },

  /**
   * @description plugins|插件配置
   * @param HTMLWebpackPlugin |根据指定的模板生成HTML文件(含打包后注入的JS)
   */
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      // [content hash]: 内容变了，才有消除缓存的意义和价值。
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env.GLOB_ENV_MODE': JSON.stringify(process.env.GLOB_ENV_MODE)
    })
  ]
})




