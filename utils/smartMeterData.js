const axios = require('axios');
const Energy = require('../models/EnergyUsage');

const fetchSmartMeterData = async (userId) => {
    try {
        const response = await axios.get('https://portal.realto.io/browse-apis/corrently-green-energy-data', {
            headers: {
                'Ocp-Apim-Subscription-Key': `a283fec3f6754c1c80b033047044a8a4`
            }
        });

        const data = response.data; // Assuming data contains consumption and timestamp
        const energy = new Energy({
            userId,
            consumption: data.consumption,
            date: data.timestamp
        });

        await energy.save();
        console.log('Energy data saved:', energy);
    } catch (err) {
        console.error('Error fetching smart meter data:', err);
    }
};

module.exports = fetchSmartMeterData;
