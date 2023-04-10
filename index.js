#!/usr/bin/env node
const { program } = require('commander');
const { log } = require('console');
const fs=require('fs');

//html模版
const htmlTemplate=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iceTest</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
`;

//main.js模版
const mainJsTemplate=`import React from "react";
import ReactDOM from 'react-dom';
import App from './App.jsx'
const root = document.getElementById('root');
console.log(App);
ReactDOM.render(<App />,root)`;

//app.js模版
const appJsTemplate=`import React from "react";
function App<FunctionComponent>() {
  return <div>测试版</div>;
}
export default App;`;

//package.json模版配置
const packageJsonTemplate=`{
    "devDependencies": {
      "@babel/core": "^7.21.4",
      "@babel/preset-env": "^7.21.4",
      "@babel/preset-react": "^7.18.6",
      "babel-loader": "^9.1.2",
      "css-loader": "^6.7.3",
      "file-loader": "^6.2.0",
      "friendly-errors-webpack-plugin": "^1.7.0",
      "html-webpack-plugin": "^5.5.0",
      "react": "^18.2.0",
      "style-loader": "^3.3.2",
      "webpack": "^5.78.0",
      "webpack-bundle-analyzer": "^4.8.0",
      "webpack-cli": "^5.0.1",
      "webpack-dev-server": "^4.13.2"
    },
    "scripts": {
      "start": "npx webpack && npx webpack-dev-server --config webpack.config.js"
    },
    "dependencies": {
      "react-dom": "^18.2.0"
    }
  }`;


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
program
  .version('0.1.0')
  .command('create')
  .description('Say hello')
  .option('-n, --name <name>', 'Your name')
  .option('-v, --type <name>', 'Your type')
  .action((options, command) => {
    const name = options.name || 'world';
    const type=options.type
    console.log(`Hello, ${name}!`);
    console.log(`Hello, ${type}!`);
    //生成public模版
    fs.mkdir('public',{ recursive: true },(err)=>{
        if(err){
            console.log(err);
        }
        fs.writeFile('public/index.html',htmlTemplate,(err)=>{
            if(err){
                console.log(err);
            } 
       });
    })
    //生成src
    fs.mkdir('src', { recursive: true }, (err) => {
        if (err) throw err;
        console.log('src 目录已创建');
        fs.writeFile('src/App.tsx',appJsTemplate,(err)=>{
            console.log(err);
        })
        fs.writeFile('src/main.js',mainJsTemplate,(err)=>{
            console.log(err);
        })
      });  
      
    //生成package
    fs.writeFile('package.json',packageJsonTemplate,(err)=>{
        console.log(err);
    })

    //生成webpack配置
    fs.writeFile('webpack.config.js',webpackConfigJsTemplate,(err)=>{
        console.log(err);
    })
  });

program.parse(process.argv);