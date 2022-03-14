const { Router } = require('express');
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
            let database = Breed.findAll({ 
                where:{
                    name: {
                        [Op.substring]: name
                    }
                }})
                Promise.all([ axios_p, database ])
                .then( res => { 
                    const [ respAxios, respDatabase] = res
                    let result = [...respAxios, ...respDatabase]
                    res.send(result)
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
// router.get('/dogs', (req, res, next) => {
//     const { name } = req.query
//     if(name){
//         try {
//             Breed.findAll({ 
//                 where:{
//                     name: {
//                         [Op.substring]: name
//                     }
//             }})
//             .then(data => res.send(data))
//         } catch (error) {
//             next(error)
//         }
//     }
//     else {
//         try {
//             Breed.findAll()
//             .then( dog => res.send(dog) ) //Pendiente modificar res.
//         } catch (error) {
//             next(error)
//         }

//     }
// })

// GET CON ID DE LA RAZA X PARAMS




router.get('/dogs/:id', (req, res, next) => {
    const { id } = req.params
    Breed.findByPk(id)
    .then( data => res.send(data) )
})

// GET DE LOS TEMPERAMENTOS
router.get('/temperament', (req, res, next) => {

    res.send('Get en /temperament')
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
