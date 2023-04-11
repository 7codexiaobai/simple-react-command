const fs=require('fs');

//main.js模版
const mainJsTemplate=`import React from "react";
import ReactDOM from 'react-dom';
import App from './App.jsx'
const root = document.getElementById('root');
ReactDOM.render(<App />,root)`;

//main.js模版
const mainTsTemplate=`import React from "react";
import ReactDOM from 'react-dom';
import App from './App.tsx'
const root = document.getElementById('root');
ReactDOM.render(<App />,root)`;

const mainTemplate=(isNeedTs)=>{
    if(isNeedTs==='y'){
        fs.writeFile('src/main.js',mainTsTemplate,(err)=>{
          // console.log(err);
      })
     };
     if(isNeedTs==='n'){
      fs.writeFile('package.json',mainJsTemplate,(err)=>{
          // console.log(err);
      })
     }  
}
module.exports={mainTemplate};
