const mongoose = require('mongoose');

const EnergyUsageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true,
    },
    usage: {
        type: String, // in kWh
        required: true,
    },
});

module.exports = mongoose.model('EnergyUsage', EnergyUsageSchema);
