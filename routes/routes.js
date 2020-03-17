const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
const url = 'https://covid19.mathdro.id/api'


router.get('/', function(req,res){
    res.render('country')
})

router.post('/', getGlobalCoronaDataByCountry, function(req,res){
    res.send(res.response)
})

router.get('/corona/global',getGlobalCoronaData, function(req,res){
    res.send(res.response)
})

router.get('/corona/:country',getGlobalCoronaDataByCountry, async function(req,res){
    
    try{
        const country = await req.params.country
        const response = await res.response
        if (response == null){
            return res.status(404).json({message:err.message})
        }
        else {
            const confirm = response.confirmed['value']
            const recovered = response.recovered['value']
            const deaths = response.deaths['value']
            const date = response.lastUpdate
            const data ={"Country":country, "Date":date, "Confirmed": confirm, "Recovered":recovered, "Deaths":deaths}
            res.send(data)
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
    try{
        response = await fetch(url)
        json = await response.json()

        if (json == null) {
            return res.status(404).json({message:err.message.value})
        }

    } catch (err) {
        return res.status(500).json({message:err.message})
    }

    res.response = json
    next()
}

async function getGlobalCoronaDataByCountry (req,res,next){
    let countryUrl
    let Country
    if (req.params.country && !req.body.country) Country = await req.params.country
    if (!req.params.country && req.body.country) Country = await req.body.country
    console.log (Country)
    countryUrl = url + '/countries/'+ Country

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
    const confirm = json.confirmed['value']
    const recovered = json.recovered['value']
    const deaths = json.deaths['value']
    const date = json.lastUpdate
    const data ={"Country":Country, "Date":date, "Confirmed": confirm, "Recovered":recovered, "Deaths":deaths}
    res.response = data

    next()
}

module.exports = router
