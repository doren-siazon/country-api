const express = require('express')
const router = express.Router()
const Country = require('../models/country')


// Getting all
router.get('/', async (req, res) => {
    try {
        const country = await Country.find()
        res.json(country)
    } catch (err) {
        res.status(500).json({message: err.message})

    }
})

// Getting One
router.get('/:id', getCountry, (req, res) => {
    res.json(res.country)
})

// Creating one
router.post('/', async (req, res) => { 
    const country = new Country({
        name: req.body.name,
        country: req.body.country,
        places: req.body.places,
        des: req.body.des
    })
    try {
        const newCountry = await country.save()
        res.status(201).json(newCountry)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
    

// Updating One
router.patch('/:id', getCountry, async (req, res) => {
    if (req.body.name != null) {
        res.country.name = req.body.name
    }    
    if (req.body.places != null) {
        res.country.places = req.body.places
    }
    if (req.body.des != null) {
    res.country.des = req.body.des
    }

    try{
        const updatedCountry = await res.country.save()
        res.json(updatedCountry)
    } catch (err) {
        res.status(400).json({ message: err.message})

    }
})

// Deleting One
router.delete('/:id', getCountry, async (req, res) => {
 try{
    await res.country.remove()
    res.json( {message: 'Deleted Country'})
 } catch (err) {
     res.status(500).json({ message: err.message})
 }
})

async function getCountry(req, res, next ) {
    let country
    try{
        country = await Country.findById(req.params.id)
        if (country == null) {
            return res.status(400).json({ message: 'Cannot find it' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })

    }
    res.country = country
    next()
}

module.exports = router