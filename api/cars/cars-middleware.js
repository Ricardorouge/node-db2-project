const Cars = require('./cars-model')
const db = require('../../data/db-config')
const vinValidator = require('vin-validator')


const checkCarId = async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const car = await Cars.getById(req.params.id)
    !car?
    res.status(404).json({message:`car with id ${req.params.id} is not found`})
    :
    req.car = car
    next()
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin,make,model,mileage} = req.body
  if(vin === undefined){
    return res.status(400).json({message:`vin is missing`})
  } else if( make === undefined){
    return res.status(400).json({message:`make is missing`})
  } else if( model=== undefined){
    return res.status(400).json({message:`model is missing`})
  } else if(mileage===undefined){
    return res.status(400).json({message:`mileage is missing`})
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  
  const isValid = vinValidator.validate(`${req.body.vin}`)
  if(!isValid){
    return res.status(400).json({message:`vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  try{
    const exists = await db('cars').where({vin:req.body.vin}).first()
   if(exists){
    return res.status(400).json({message:`vin ${req.body.vin} already exists`})
   }
   next()
  }catch(err){
    next(err)
  }
  

}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}