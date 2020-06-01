const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitedPlaceSchema = new Schema({});

module.exports = VisitedPlace = mongoose.model(
    'visitedplace',
    VisitedPlaceSchema
);
