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
    <div id="'root"></div>
</body>
</html>
<script src="main.js"></script>`;
//main.js模版
const mainJsTemplate=`import React,{ReactDOM} from "react";
import App from './App.jsx'
const root=document.getElementById('root');
React.createElement(<App />,root);`;
//app.js模版
const appJsTemplate=`import React from "react";
function App<FunctionComponent>() {
  return <div>测试版</div>;
}
export default App;`;

program
  .version('0.1.0')
  .command('hello')
  .description('Say hello')
  .option('-n, --name <name>', 'Your name')
  .option('-v, --type <name>', 'Your type')
  .action((options, command) => {
    const name = options.name || 'world';
    const type=options.type
    console.log(`Hello, ${name}!`);
    console.log(`Hello, ${type}!`);
    fs.writeFile('index.html',htmlTemplate,(err)=>{
        console.log(err);
    })
    fs.mkdir('src', { recursive: true }, (err) => {
        if (err) throw err;
        console.log('src 目录已创建');
        fs.writeFile('src/App.tsx',appJsTemplate,(err)=>{
            console.log(err);
        })
        fs.writeFile('src/index.js',mainJsTemplate,(err)=>{
            console.log(err);
        })
      });    
  });

program.parse(process.argv);