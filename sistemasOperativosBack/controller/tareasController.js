const{response,request}= require('express');
const fs  =require('fs');
const { crearPrimerJson,SortByAsc,SortByDesc } = require('../generarJSON');
const AscDesc = ['ascendente','descendente']
const atributoValido = ['CPU(s)','NPM(K)','Handles','PM(K)','WS(K)','Id','SI','ProcessName']


const crearDocumento=async(req = request,res= response)=>{
   await crearPrimerJson();
   return res.json({
    msg: 'se creo con exito'
   })
}

const getTareas = async(req = request,res= response)=>{
    const{cantidad = 5,atributo = '', categoria=''} = req.query;
    if(!atributoValido.includes(atributo)){
        return res.json({
            msg:`los atributos validos son ${atributoValido}`
        })
    }
    if(!AscDesc.includes(categoria)){
        return res.json({
            msg: `Solo se puede ${AscDesc}`
        })
    }
    if(categoria=='ascendente'){
        await SortByAsc(atributo)
    }else{
        await SortByDesc(atributo)
    }
    
    
    let info = JSON.parse(fs.readFileSync(`./database/${categoria}.json`,{encoding: 'utf-8'}))
    
    info = info.slice(1,parseInt(cantidad) + 1)

     //info.forEach((element, index) => {
      //  console.log(info[index+1]);
        /* if(element.ProcessName[0] === info[index+1].ProcessName[0]){
            info.splice(index+1,1);
        } */
    //});
    
    //console.log(noRepetidos);

    //console.log(info[1]['ProcessName'][0]);
    /* let procesosUnique = [];
    for(let k=0; k<info.length;k++){
        const elemento = info[k];
        if(!procesosUnique.includes(info[k]['ProcessName'][0])){
            delete info[k]
        }
    } */
    //console.log(info);
    
    return res.json({
        info
    })
}

const escribir = async(req, res)=>{
    const {nombre} = req.body

   return new Promise((resolve, reject) => {
    resolve(fs.promises.writeFile(`../database/fichero/${nombre}.txt`,nombre))   
}) 
}

module.exports = {
    crearDocumento,
    escribir,
    getTareas

}