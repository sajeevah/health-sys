'use strict';

const mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');


const Schema = mongoose.Schema;

const GpslocationSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geoJson: {
        type: mongoose.Schema.Types.FeatureCollection
    }
});

const Gpslocation = mongoose.model('Gpslocation', GpslocationSchema);

module.exports = Gpslocation;
