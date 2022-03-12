const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Breed, Temperament } = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', (req, res, next) => {
    const { name } = req.query
    if(name){
        try {
            Breed.findAll({ where:{
                name: {
                    include : `%${name}%`
                }
            }})
            .then(data => res.send(data))
        } catch (error) {
            next(error)
        }
    }
    else {
        try {
            Breed.findAll()
            .then( dog => res.send(dog) ) //Pendiente modificar res.
        } catch (error) {
            next(error)
        }

    }
})


router.get('/dogs/:id', (req, res, next) => {
    const { id } = req.params
    Breed.findAll()
    .then()
    res.send('Get en /dogs/:id')
})

router.get('/temperament', (req, res, next) => {

    res.send('Get en /temperament')
})

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
