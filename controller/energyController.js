const EnergyUsage = require('../models/EnergyUsage');
const { calculateEnergyInsights } = require('../utils/calculateInsights');

exports.logEnergyUsage = async (req, res) => {
    try {
        const { date, usage } = req.body;

        const newUsage = new EnergyUsage({
            user: req.user.id,
            date,
            usage,
        });

        await newUsage.save();
        res.json(newUsage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getEnergyUsage = async (req, res) => {
    try {
        const usage = await EnergyUsage.find({ user: req.user.id }).sort({ date: -1 });
        const insights = calculateEnergyInsights(usage);
        res.json({ usage, insights });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
