const express = require('express')
const router = express.Router()
const fetch = require('node-fetch');
const url = 'https://covid19.mathdro.id/api'

router.get('/', function(req,res){
    res.send('Server is running')
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
    const countryUrl = url + '/countries/'+ req.params.country
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
    res.response = json
    next()
}

module.exports = router
