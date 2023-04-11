#!/usr/bin/env node
const { program } = require('commander');
const {htmlTemplate}=require('./template/htmlTemplate');
const {appJsTemplate}=require('./template/appJsTemplate');
const {webpackConfigTemplate}=require('./template/webpackConfigJsTemplate');
const {packageJsonTemplate}=require('./template/packageJsonTemplate');



const readline=require('readline');
const { log } = require('console');
const fs=require('fs');

//调用node内置input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

//main.js模版
const mainJsTemplate=`import React from "react";
import ReactDOM from 'react-dom';
import App from './App.jsx'
const root = document.getElementById('root');
ReactDOM.render(<App />,root)`;


program
  .version('0.1.0')
  .command('create')
  .description('Say hello')
  .option('-n, --name <name>', 'Your name')
  .option('-v, --type <name>', 'Your type')
  .action((options, command) => {
    const name = options.name || 'world';
    const type=options.type
  rl.question('Would you like to use TypeScript? (y/n) ', (answer) => {
        //生成src
    fs.mkdir('src', { recursive: true }, (err) => {
        if (err) throw err;
        //生成jsx 或者tsx模版
        appJsTemplate(answer);

        //生成js或ts webpack配置
        webpackConfigTemplate(answer);

        //生成js 或ts package依赖配置
        packageJsonTemplate(answer);
        fs.writeFile('src/main.js',mainJsTemplate,(err)=>{
            // console.log(err);
        });
      
    }); 
     //生成忽略文件
    fs.writeFile('.gitignore',`node_modules/`,(err)=>{
        // console.log(err);
     })
    //生成public模版
    fs.mkdir('public',{ recursive: true },(err)=>{
        if(err){
            // console.log(err);
        }
    fs.writeFile('public/index.html',htmlTemplate(),(err)=>{
            if(err){
                // console.log(err);
            } 
       });
    })
    // 关闭 readline 接口
    rl.close();
  })
 });

program.parse(process.argv);