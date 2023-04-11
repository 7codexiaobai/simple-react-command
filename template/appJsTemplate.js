const fs=require('fs');

//reactApp jsx or tsx模版

const jsxTemplate=`import React from "react";
function App() {
  return <div>测试版</div>;
}
export default App;`;

const tsxTemplate=`import React from "react";
interface Props {
  }
  const App: React.FC<Props> = ({}) => {
    return <div>测试版</div>;
  }
export default App;`;

const appJsTemplate=(isNeedTs)=>{
  if(isNeedTs==='y'){
    fs.writeFile('src/App.tsx',tsxTemplate,(err)=>{
        console.log('App.tsx已创建');
    })
  };
  if(isNeedTs==='n'){
    fs.writeFile('src/App.jsx',tsxTemplate,(err)=>{
        console.log('App.tsx已创建');
    });
  }  
}
module.exports={appJsTemplate};