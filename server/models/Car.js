const mongoose = require('mongoose');
const _ = require('underscore');

let CarModel = {};

const CarSchema = new mongoose.Schema({
  skin: {
    type: Image,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

CarSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

CarSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return CarModel.find(search).select('name age').lean().exec(callback);
};

CarModel = mongoose.model('Car', CarSchema);

module.exports = CarModel;