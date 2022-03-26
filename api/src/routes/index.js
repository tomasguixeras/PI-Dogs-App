const { Router, response } = require('express');
const axios = require('axios')
const { Sequelize } = require('sequelize');
const { Breed, Temperament } = require('../db')
const Op = Sequelize.Op

const router = Router();

// Configurar los routers

// GET DE RAZAS (SIN QUERY) + DETALLE DE RAZA (CON QUERY)
router.get('/dogs', async (req, res, next) => {
    let { name } = req.query
    if(name){
        try {
            let dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds?api_key={API_KEY}')
            let dogsDatabase = await Breed.findAll({ 
                where:{
                    name: {
                        [Op.iLike]: `%${name}%`
                        // [Op.substring]: name
                    }
                },
                include: Temperament
            })
            dogsApi = dogsApi.data
            dogsApi = dogsApi.filter( dog => {
                return dog.name.toLowerCase().includes(name.toLowerCase())
            })
            dogsApi = dogsApi.map( dog => {
                // Temperament transform
                let temperaments
                if(dog.temperament) temperaments = dog.temperament.split(', ')

                // Weight transform
                let weight = dog.weight.metric 
                weight = weight.split(' - ').map( str => parseFloat(str) )
                if(weight.length>1) weight = (weight[0]+weight[1])/2
                else weight = weight[0]

                // Values preparation for Frontend
                return{
                    id: dog.id,
                    name: dog.name,
                    weight: weight,
                    image: dog.image.url,
                    temperament: temperaments
                }
            })
            dogsDatabase = dogsDatabase.map( dog => {
                return {
                    id: dog.id,
                    name: dog.name,
                    weight: dog.weight,
                    image: dog.image,
                    temperament: dog.temperaments && dog.temperaments.map( temp => temp.name )
                }
            })
        let result = [...dogsApi, ...dogsDatabase]
        res.json(result)
        } catch (error) {
            next(error)
        }
    }
    else {
        try {
            // Peticiones a API + DB
            let dogsFromAPI = axios.get('https://api.thedogapi.com/v1/breeds?api_key={API_KEY}')
            let dogsFromDB = Breed.findAll({ include: Temperament})
            Promise.all([dogsFromAPI, dogsFromDB])

            // Data recibed, proceced & filtered for Fronend
            .then ( result => {
            const [ dogsAPI, dogsDB ] = result
            let filteredAPI = dogsAPI.data.map( dog => {
                // Weight transform from string to average number  
                let weight = dog.weight.metric 
                weight = weight.split(' - ').map( str => parseFloat(str) )
                if(weight.length>1) weight = (weight[0]+weight[1])/2
                else weight = weight[0]

                // Temperament transform from string to array
                let temperament
                if(dog.temperament) temperament = dog.temperament.split(', ')

                // Values preparation for Frontend
                return{
                    id: dog.id,
                    name: dog.name,
                    weight: weight,
                    image: dog.image.url,
                    temperament
                }
            })
            let filteredDB = dogsDB.map( dog => {
                return {
                    id: dog.id,
                    name: dog.name,
                    weight: dog.weight,
                    image: dog.image,
                    temperament: dog.temperaments.map( temp => temp.name )
                }
            })
            let allBreeds = [...filteredDB, ...filteredAPI]
            allBreeds.sort((a,b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            })
            res.send(allBreeds)
            })
        } catch (error) {
            next(error)
        }
    }
})


// GET CON ID DE LA RAZA X PARAMS
router.get('/dogs/:id', async(req, res, next) => {
    try {
        let { id } = req.params
        if( id.length <= 3 ){
            id = parseInt(id)
            let allBreeds = await axios.get('https://api.thedogapi.com/v1/breeds/')
            allBreeds = allBreeds.data.find( breed => id === breed.id)

            // Weight transform to average
            allBreeds.weight.metric = allBreeds.weight.metric.split(' - ').map( str => parseFloat(str) )
            if(allBreeds.weight.metric.length>1) allBreeds.weight.metric = parseInt((allBreeds.weight.metric[0]+allBreeds.weight.metric[1])/2)
            else allBreeds.weight.metric = allBreeds.weight.metric[0]
            
            // Height transform to average
            allBreeds.height.metric = allBreeds.height.metric.split(' - ').map( str => parseFloat(str) )
            if(allBreeds.height.metric.length>1) allBreeds.height.metric = parseInt((allBreeds.height.metric[0]+allBreeds.height.metric[1])/2)
            else allBreeds.height.metric = allBreeds.height.metric[0]

            // lifeSpan transform to average
            allBreeds.life_span = allBreeds.life_span.split(' - ').map( str => parseFloat(str) )
            allBreeds.life_span = parseInt((allBreeds.life_span[0]+allBreeds.life_span[1])/2)

            // Temperament transform to array
            if(allBreeds.temperament) allBreeds.temperament = allBreeds.temperament.split(', ')  
        

            allBreeds = {
                    id: allBreeds.id,
                    name: allBreeds.name,
                    height: allBreeds.height.metric,
                    weight: allBreeds.weight.metric,
                    lifeSpan: allBreeds.life_span,
                    image: allBreeds.image.url,
                    temperaments: allBreeds.temperament
            }
            res.send(allBreeds)
        }else{
            let breedFromDB = await Breed.findByPk(id, {
                include: Temperament
            })
            breedFromDB = {
                id: breedFromDB.id,
                name: breedFromDB.name,
                height: parseInt(breedFromDB.height),
                weight: parseInt(breedFromDB.weight),
                lifeSpan: parseInt(breedFromDB.lifeSpan),
                image: breedFromDB.image,
                temperaments: breedFromDB.temperaments.map( temp => temp.name)
            }
            res.send(breedFromDB)


        }
    } catch (error) {
        next(error)
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
            allDogs = allDogs.data.map( dog => dog.temperament && dog.temperament.split(', ') )
            allDogs = allDogs.flat()
            allDogs = [...new Set(allDogs)];
            allDogs = allDogs.filter( temp => typeof temp !== 'undefined' )
            allDogs = allDogs.map( el =>  el = {name:el} )
            Temperament.bulkCreate(allDogs)
            let searchTemp = await Temperament.findAll()
            console.log(searchTemp)
            const sortTemp = Array.from(searchTemp).sort((a,b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            })
            res.send(sortTemp)
        }
    } catch (error) {
        next(error)
    }
})

// POST DE UNA NUEVA RAZA A LA DATABASE
router.post('/dog', async (req, res, next) => {
    const { name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan, imageUrl, temperament } = req.body
    try {
        let height = (parseInt(minHeight) + parseInt(maxHeight))/2
        let weight = (parseInt(minWeight) + parseInt(maxWeight))/2

        const newBreed = await Breed.create({
            name,
            image: imageUrl,
            height,
            weight,
            lifeSpan,
        })

        let temperamentDB = await Temperament.findAll({
            where: {
                name: temperament
            }
        })

        newBreed.addTemperament(temperamentDB)


        res.send(newBreed)
        
    } catch (error) {
        next(error)
    }

})

module.exports = router;