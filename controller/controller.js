const Corona = require('../models/corona')
const fetch = require('node-fetch');
const url = 'https://covid19.mathdro.id/api'

async function getGlobalCoronaData (req,res,next){
    let response
    let json
    let country = "Global"
    response = await fetch(url)
    json = await response.json()
    console.log(json)
    const tempData = {
        country: country,
        confirmed: json.confirmed.value, 
        recovered:json.recovered.value,
        deaths:json.deaths.value, 
        lastUpdate: json.lastUpdate, 
        }
    

    try{
        
        findCountry = await Corona.findOne(json.country)

        if (!findCountry) {
            const data = new Corona (tempData)
            findCountry = await Corona.findOne(json.country)
            res.response = findCountry
        }
        if (findCountry) {
            res.response = findCountry
        }
    } catch (err) {
        return res.status(500).json({message:err.message})
    }
        
        next()

}



async function getGlobalCoronaDataByCountry (req,res,next){
    // let countryUrl
    let Country
    if (req.params.country && !req.body.country) Country = await req.params.country
    if (!req.params.country && req.body.country) Country = await req.body.country
    console.log (Country)
    res.response = await getData(Country)
    console.log(res.response)
    next()
}

async function getData(country){
    const countryUrl = url + '/countries/'+ country
    let response
    let json
    try{
        response = await fetch(countryUrl)
        json = await response.json()
        if (json == null) {
            return res.status(404).json({message:err.message})
        }

    } catch (err) {
        return res.status(500).json({message:err.message})
    }
    if (json.error){
        data = {"error": true}
        return data
    }

    if (!json.error){
        const confirm = await json.confirmed['value']
        const recovered = await json.recovered['value']
        const deaths = await json.deaths['value']
        const date = await json.lastUpdate
        const data ={ "error":false, "country":country,"lastUpdate":date, "confirmed": confirm, "recovered":recovered, "deaths":deaths}
        return data
    }


}

async function printData(data){
    console.log(data)
}


async function getCountry(req,res,next){
    let country
    try{
        country = await Corona.findOne(req.country)
        


    } catch(err){
        return res.status(500).json({message:err.message})


    }
    // res.country = country
    if (country.lastUpdate == req.lastUpdate) {
        res.country = country
        res.lastUpdate =false
    }

    if (country.lastUpdate!= req.lastUpdate){
        res.country = country
        res.lastUpdate =true

    } 

    if (country== null){
        res.country = false
        res.lastUpdate =false
    }
    next()
}


module.exports.getGlobalCoronaData = getGlobalCoronaData
module.exports.getGlobalCoronaDataByCountry = getGlobalCoronaDataByCountry
module.exports.getData = getData
module.exports.printData = printData



