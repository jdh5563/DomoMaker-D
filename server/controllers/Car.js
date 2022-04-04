const res = require('express/lib/response');
const models = require('../models');
const CarModel = require('../models/Car');

const { Car } = models;
let car;

const carPage = (req, res) => res.render('car');

const makeCar = async (req, res) => {
  const carData = {
    skin: req.body.skin,
    owner: req.session.account._id,
  };

  if(!car) car = new Car(carData);
  else car.skin = carData.skin;
  
  await car.save();
  return res.status(201).json({ skin: car.skin, });
};

const getCar = (req, res) => CarModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ car: docs });
});

module.exports = {
  carPage,
  makeCar,
  getCar,
};