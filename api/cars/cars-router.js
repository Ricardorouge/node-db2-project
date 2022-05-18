// DO YOUR MAGIC
const {checkCarId,checkCarPayload,checkVinNumberUnique,checkVinNumberValid} = require('./cars-middleware')
const Car = require('./cars-model')
const router = require('express').Router()

router.get('/',(req,res,next)=>{
    Car.getAll()
    .then(result=>{
        result?
        res.json(result)
        :
        res.json([])
    })
    .catch(next)
})

router.get('/:id',checkCarId,(req,res,next)=>{
    res.json(req.car)
})

router.post('/',checkCarPayload,checkVinNumberUnique,checkVinNumberValid,async(req,res,next)=>{
    try{
        
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    }catch(err){
        next(err)
    }
})


module.exports = router