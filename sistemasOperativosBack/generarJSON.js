const { exec } = require("child_process");
var Parser = require("table-parser");
var fs = require('fs');

const crearPrimerJson =async()=>{
    const data = await new Promise((resolve, reject) => {
      
      exec("Get-Process  ",{'shell':'powershell.exe'} ,async(error, data) => {
          resolve(data)
      })
    })
    
    
    table = Parser.parse(await data);
  
    const jsonData = JSON.stringify(table);
    await fs.promises.writeFile('./database/json.json',jsonData);

}

const SortByAsc = async (atributo) => {

 const info = fs.readFileSync(`./database/json.json`,{encoding: 'utf-8'})
 let infoJson = JSON.parse(info);
 infoJson = infoJson.map((p)=>{
   if(p[`${atributo}`][0]===''){
     p[`${atributo}`][0]='0'
    }
    p[`${atributo}`][0]=p[`${atributo}`][0].replace(',','.');
    //console.log(p['CPU(s)'][0]);
    return p
 })
 infoJson = infoJson.sort((a,b)=>{
   return parseFloat(a[`${atributo}`][0])-parseFloat(b[`${atributo}`][0])
  });
  console.log(infoJson);
 fs.writeFile("./database/Ascendente.json", JSON.stringify(infoJson), (err) => {
  if (err) {
      console.log(err);
  }
}); 
}
const SortByDesc = async (atributo) => {

  const info = fs.readFileSync('./database/json.json',{encoding: 'utf-8'})
  let infoJson = JSON.parse(info);
  infoJson = infoJson.map((p)=>{
    if(p[`${atributo}`][0]===''){
      p[`${atributo}`][0]='0'
     }
     p[`${atributo}`][0]=p[`${atributo}`][0].replace(',','.');
     //console.log(p['CPU(s)'][0]);
     return p
  })
  infoJson = infoJson.sort((a,b)=>{
    return parseFloat(a[`${atributo}`][0])-parseFloat(b[`${atributo}`][0])
   });
   console.log(infoJson);
  fs.writeFile("./database/desendente.json", JSON.stringify(infoJson), (err) => {
   if (err) {
       console.log(err);
   }
 }); 
 }
const llamado = async(atributo)=>{
  await crearPrimerJson();
  await SortByAsc(atributo);
  await SortByDesc(atributo);
}
llamado('CPU(s)');