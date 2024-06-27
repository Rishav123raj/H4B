const express = require('express');
const router = express.Router();
const EnergyUsage = require('../models/EnergyUsage');

// GET all energy usage entries
router.get('/', async (req, res) => {
    try {
        const energyUsages = await EnergyUsage.find();
        res.json(energyUsages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific energy usage entry by ID
router.get('/:id', getEnergyUsage, (req, res) => {
    res.json(res.energyUsage);
});

// POST a new energy usage entry
router.post('/', async (req, res) => {
    const energyUsage = new EnergyUsage({
        user: req.body.user,
        date: req.body.date,
        usage: req.body.usage
    });

    try {
        const newEnergyUsage = await energyUsage.save();
        res.status(201).json(newEnergyUsage);
        // Check if energy usage exceeds threshold after saving
        checkAndActOnEnergyUsageThreshold(newEnergyUsage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update an energy usage entry
router.put('/:id', getEnergyUsage, async (req, res) => {
    if (req.body.user != null) {
        res.energyUsage.user = req.body.user;
    }
    if (req.body.date != null) {
        res.energyUsage.date = req.body.date;
    }
    if (req.body.usage != null) {
        res.energyUsage.usage = req.body.usage;
    }
    try {
        const updatedEnergyUsage = await res.energyUsage.save();
        res.json(updatedEnergyUsage);
        // Check if energy usage exceeds threshold after updating
        checkAndActOnEnergyUsageThreshold(updatedEnergyUsage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an energy usage entry
router.delete('/:id', getEnergyUsage, async (req, res) => {
    try {
        await res.energyUsage.remove();
        res.json({ message: 'Deleted Energy Usage Entry' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getEnergyUsage(req, res, next) {
    try {
        const energyUsage = await EnergyUsage.findById(req.params.id);
        if (!energyUsage) {
            return res.status(404).json({ message: 'Cannot find energy usage entry' });
        }
        res.energyUsage = energyUsage;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Function to check and act on energy usage threshold
function checkAndActOnEnergyUsageThreshold(energyUsage) {
    const threshold = "29 kWh"; // Define your threshold value in kWh

    if (energyUsage.usage > threshold) {
        // Implement necessary actions here, e.g., send notification, trigger automation
        console.log(`User ${energyUsage.user} has exceeded the energy usage threshold.`);
        // Example: Notify user via email
        // sendEmailNotification(energyUsage.user, 'Exceeded energy usage threshold');
    }
}

module.exports = router;
