const res = require('express/lib/response');
const models = require('../models');
const CarModel = require('../models/Car');

const { Car } = models;

const carPage = (req, res) => res.render('car');

const makeCar = async (req, res) => {
  const carData = {
    skin: req.body.skin,
    owner: req.session.account._id,
  };

  const newCar = new Car(carData);
  await newCar.save();
  return res.status(201).json({ skin: newCar.skin, });
};

const getCar = (req, res) => CarModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ car: docs[docs.length - 1] });
});

module.exports = {
  carPage,
  makeCar,
  getCar,
};