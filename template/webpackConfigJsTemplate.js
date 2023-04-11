const fs=require('fs');

//webpackConfig配置
const webpackConfigJsTemplate=`const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development', // 模式，可以是development或production
  entry: './src/main.js', // 入口文件
  output: { // 输出文件
    filename: 'bundle.js', // 文件名
    path: path.resolve(__dirname, 'dist') // 输出目录
  },
  module: { // 模块加载器
    rules: [ // 每个加载器对应一个规则
      {
        test: /\.css$/, // 匹配规则
        use: [ // 加载器
          'style-loader', // 将CSS注入到HTML中
          'css-loader' // 加载CSS文件
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/preset-react'],
            }},
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader' // 加载图片文件
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({ // 自动生成HTML文件
      template: './public/index.html' // 模板文件
    }),
    new FriendlyErrorsWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: { // 开发服务器
    static: path.join(__dirname, './dist'),
    port: 8080 // 端口号
  }
};`

const webpackConfigTsTemplate=`const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development', // 模式，可以是development或production
  entry: './src/main.js', // 入口文件
  output: { // 输出文件
    filename: 'bundle.js', // 文件名
    path: path.resolve(__dirname, 'dist') // 输出目录
  },
  module: { // 模块加载器
    rules: [ // 每个加载器对应一个规则
      {
        test: /\.css$/, // 匹配规则
        use: [ // 加载器
          'style-loader', // 将CSS注入到HTML中
          'css-loader' // 加载CSS文件
        ]
      },
      {
        test: /\.(tsx|ts|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader' // 加载图片文件
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx','.ts','.tsx'],
  },
  plugins: [ // 插件
    new HtmlWebpackPlugin({ // 自动生成HTML文件
      template: './public/index.html' // 模板文件
    }),
    new FriendlyErrorsWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: { // 开发服务器
    static: path.join(__dirname, './dist'),
    port: 8080 // 端口号
  }
};`

const webpackConfigTemplate=(isNeedTs)=>{
   if(isNeedTs==='y'){
      fs.writeFile('webpack.config.js',webpackConfigTsTemplate,(err)=>{
        // console.log(err);
    })
   };
   if(isNeedTs==='n'){
    fs.writeFile('webpack.config.js',webpackConfigJsTemplate,(err)=>{
        // console.log(err);
    })
   }
}

module.exports={webpackConfigTemplate}