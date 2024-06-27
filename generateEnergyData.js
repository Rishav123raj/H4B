// Import necessary modules
const mongoose = require('mongoose');
const EnergyUsage = require('./models/EnergyUsage'); // Adjust the path as per your project structure

// Function to generate random userId (for demonstration purposes)
function generateRandomUserId() {
    const userIds = [
        '5ff4d5b8b483035b362b71b2',
        '5ff4d5b8b483035b362b71b3',
        '5ff4d5b8b483035b362b71b4'
        // Add more userIds if needed
    ];
    return userIds[Math.floor(Math.random() * userIds.length)];
}

// Function to generate a random date (within the last 30 days)
function generateRandomDate() {
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const endDate = new Date();
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

// Function to generate random energy usage (between 1 and 50 kWh)
function generateRandomEnergyUsage() {
    return Math.floor(Math.random() * 50) + 1;
}

// Function to generate 500 random energy usage entries
async function generateEnergyUsageData() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/ecosynergy', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing data
        await EnergyUsage.deleteMany();

        // Generate and insert 500 random data entries
        const data = [];
        for (let i = 0; i < 500; i++) {
            const newEntry = {
                user: generateRandomUserId(),
                date: generateRandomDate(),
                usage: generateRandomEnergyUsage() + "kWh"
            };
            data.push(newEntry);
        }

        await EnergyUsage.insertMany(data);
        console.log('Generated 500 energy usage entries successfully');
    } catch (err) {
        console.error('Error generating energy usage data:', err);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
    }
}

// Call the function to generate data
generateEnergyUsageData();
