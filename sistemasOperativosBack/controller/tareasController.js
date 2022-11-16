const{response,request}= require('express');
const fs  =require('fs');

const info = fs.readFileSync('./database/test.json',{encoding: 'utf-8'})
const infoJson = JSON.parse(info)
const JsonSort = infoJson.sort();
const AscDesc = ['Ascendente','Desendente']
const atributoValido = ['CPU(s)','NPM(K)','Handles','PM(K)','WS(K)','Id','SI','ProcessName']

const getTareas = async(req = request,res= response)=>{
    const{cantidad = "5",atributo = '', categoria=''} = req.query;
    if(!atributo.includes(atributoValido)){
        return res.json({
            msg:`los atributos validos son ${atributoValido}`
        })
    }
    if(!categoria.includes(AscDesc)){
        return res.json({
            msg: `Solo se puede ${AscDesc}`
        })
    }
    
    








}

module.exports = {
    getTareas   
}