const { Router, response } = require('express');
const axios = require('axios')
const { Sequelize } = require('sequelize');
const { Breed, Temperament } = require('../db')
const Op = Sequelize.Op


const router = Router();

// Configurar los routers

// GET DE RAZAS (SIN QUERY) + DETALLE DE RAZA (CON QUERY)
router.get('/dogs', (req, res, next) => {
    const { name } = req.query
    if(name){
        try {
            let axios_p = axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
            let database_p = Breed.findAll({ 
                where:{
                    name: {
                        [Op.substring]: name
                    }
                }})
                Promise.all([ axios_p, database_p ])
                .then( response => { 
                    let [ respAxios, respDatabase] = response
                    respAxios = respAxios.data
                    let result = [...respAxios, ...respDatabase]
                    console.log(result)
                    res.json(result)
                })
            } catch (error) {
                next(error)
            }
    }
    else {
        try {
            let dogsFromAPI = axios.get('https://api.thedogapi.com/v1/breeds')
            let dogsFromDB = Breed.findAll()
            Promise.all([dogsFromAPI, dogsFromDB])
            .then ( result => {
                const [ dogsAPI, dogsDB ] = result
                let filteredAPI = dogsAPI.data.map( dog => {
                    return {
                        id: dog.id,
                        name: dog.name,
                        weight: dog.weight.metric,
                        image: dog.image.url
                    }
                })
                let filteredDB = dogsDB.map( dog => {
                    return {
                        id: dog.id,
                        name: dog.name,
                        weight: dog.weight,
                    }
                })
                let allBreeds = [...filteredDB, ...filteredAPI]
                res.send(allBreeds)
            })
        } catch (error) {
            next(error)
        }
    }
})


// GET CON ID DE LA RAZA X PARAMS
router.get('/dogs/:id', async(req, res, next) => {
    let { id } = req.params

    if(typeof id === 'string' && id.length < 3){
        id = parseInt(id)
        let allBreeds = await axios.get('https://api.thedogapi.com/v1/breeds/')
        allBreeds = allBreeds.data
        return res.send(allBreeds.find( breed => id === breed.id))
    }else{
        return Breed.findByPk(id)
        .then( data => res.send(data) )
    }
})

// GET DE LOS TEMPERAMENTOS
router.get('/temperament', async (req, res, next) => {
    try {
        let searchTemp = await Temperament.findAll()
        if(searchTemp.length>1){
            res.send(searchTemp)
        }
        else{
            let allDogs = await axios.get('https://api.thedogapi.com/v1/breeds/')
            allDogs = allDogs.data
            let temperament = []
            for(let i=0; i<allDogs.length; i++){
                if(allDogs[i].temperament){
                    temperament.push(allDogs[i].temperament.split(', '))
                }
            }
            let filteredTemp = []
            for(let i=0; i<temperament.length; i++){
                temperament[i].forEach( el => filteredTemp.push(el))
            }
            let uniq = [...new Set(filteredTemp)];
            let result = uniq.map( el => el = { name: el })
            console.log(result)
            Temperament.bulkCreate(result)
            let searchTemp = await Temperament.findAll()
            res.send(searchTemp)
        }
    } catch (error) {
        next(error)
    }
})

// POST DE UNA NUEVA RAZA A LA DATABASE
router.post('/dog', async (req, res, next) => {
    const { name, height, weight, lifeSpan } = req.body
    try {
        const newBreed = await Breed.create({
            name,
            height,
            weight,
            lifeSpan
        })
        res.send(newBreed)
        
    } catch (error) {
        next(error)
    }

})

module.exports = router;