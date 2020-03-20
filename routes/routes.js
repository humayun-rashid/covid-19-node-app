const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
const url = 'https://covid19.mathdro.id/api'
const controller = require('../controller/controller')
const Corona = require('../models/corona')

router.post('/',controller.getGlobalCoronaDataByCountry , function(req,res){
    res.render('country', { data: res.response })
})

router.get('/',controller.getGlobalCoronaData, function(req,res){
    res.render('home', { data: res.response })
    //res.send(res.response)
})

// router.get('/corona/:country',controller.getGlobalCoronaDataByCountry, async function(req,res){
    
//    try{
//        const data = await res.response
//        res.render('country', { data: data }) 
 //       
   //     if (data == null){
     //       return res.status(404).json({message:err.message})
      //  }
    //            
    //} catch (err){
     //   return res.status(500).json({message:err.message})
   // }
    //
//})






router.get('/countries', async function(req,res){
    
    const response = await fetch(url+'/countries')
    const json = await response.json()
    if (json == null) {
        return res.status(404).json({message:err.message.value})
    }
    const output = Object.keys(json.countries)
    getAllCountryData(output) 
    
})

router.get('/all',async function(req,res){
    try{
        const allData = await Corona.find()
        res.json(allData)

    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

async function getAllCountryData (output){

    try{
        let data = []
        output.forEach( async function (element){
            const tempdata = await controller.getData(element)
            //console.log(tempdata)
            
            if (tempdata.error == false) await data.push(tempdata)
            
            
            
        })
        console.log(data)
    } catch (err) {
        console.log("Error")
    }
    
}
module.exports = router
