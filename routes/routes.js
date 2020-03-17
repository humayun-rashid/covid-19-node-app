const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
const url = 'https://covid19.mathdro.id/api'

router.post('/', getGlobalCoronaDataByCountry, function(req,res){
    res.render('country', { data: res.response })
})

router.get('/',getGlobalCoronaData, function(req,res){
    res.render('home', { data: res.response })
})

router.get('/corona/:country',getGlobalCoronaDataByCountry, async function(req,res){
    
    try{
        const data = await res.response
        res.render('country', { data: data }) 
        
        if (data == null){
            return res.status(404).json({message:err.message})
        }
                
    } catch (err){
        return res.status(500).json({message:err.message})
    }
    
})

router.get('/countries', async function(req,res){
    const response = await fetch(url+'/countries')
    const json = await response.json()
    if (json == null) {
        return res.status(404).json({message:err.message.value})
    }
    res.send(json.countries)
})

async function getGlobalCoronaData (req,res,next){
    let response
    let json
    let country = "Global"
    try{
        response = await fetch(url)
        json = await response.json()
        console.log(json['confirmed'])

        if (json == null) {
            return res.status(404).json({message:err.message.value})
        }


    } catch (err) {
        return res.status(500).json({message:err.message})
    }
    const data = { "Total":json.value, "Confirmed":json.confirmed.value,"Recovered":json.recovered.value, "Deaths":json.deaths.value, "Date": json.lastUpdate, "Country": "Global" }
    res.response = data
    next()
}

async function getGlobalCoronaDataByCountry (req,res,next){
    // let countryUrl
    let Country
    if (req.params.country && !req.body.country) Country = await req.params.country
    if (!req.params.country && req.body.country) Country = await req.body.country
    console.log (Country)
    const countryUrl = url + '/countries/'+ Country

    // if (req.params.country && !req.body.country) countryUrl = url + '/countries/'+ Country
    // if (!req.params.country && req.body.country) countryUrl = url + '/countries/'+ Country
    
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
    // const data = { "Total":json.value, "Confirmed":json.confirmed.value,"Recovered":json.recovered.value, "Deaths":json.deaths.value, "Date": json.lastUpdate,"Country":"Global" }

    res.response = await getData(json,Country)
    console.log(res.response)

    next()
}

async function getData(json,country){
    const confirm = await json.confirmed['value']
    const recovered = await json.recovered['value']
    const deaths = await json.deaths['value']
    const date = await json.lastUpdate
    const data ={ "Country":country,"Date":date, "Confirmed": confirm, "Recovered":recovered, "Deaths":deaths}
    return data

}

module.exports = router
