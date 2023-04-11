const fs =require('fs')
//package.jsonJs依赖模版配置
const packageJsJsonTemplate=`{
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

  //package.jsonTs依赖模版配置
const packageTsJsonTemplate=`{
    "devDependencies": {
      "@babel/core": "^7.21.4",
      "@babel/preset-env": "^7.21.4",
      "@babel/preset-react": "^7.18.6",
      "@babel/preset-typescript": "^7.12.17",
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


  const packageJsonTemplate=(isNeedTs)=>{
    if(isNeedTs==='y'){
        fs.writeFile('package.json',packageTsJsonTemplate,(err)=>{
          // console.log(err);
      })
     };
     if(isNeedTs==='n'){
      fs.writeFile('package.json',packageJsJsonTemplate,(err)=>{
          // console.log(err);
      })
     }  
    };

module.exports={packageJsonTemplate};

