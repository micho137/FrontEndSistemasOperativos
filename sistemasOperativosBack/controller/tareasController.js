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
    //console.log(info);
    return res.json({
        info
    })
}

module.exports = {
    crearDocumento,
    getTareas

}