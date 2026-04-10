const mongoose = require('mongoose');
const Pharmacy = require('../models/Pharmacy');
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing
    await Pharmacy.deleteMany();

    // Insert new data matching the frontend filter options
    await Pharmacy.create([
      { 
        name: "MedPlus Central", 
        address: "Main St 101", 
        stockStatus: "in-stock", 
        is24Hours: true, 
        rating: 4.8 
      },
      { 
        name: "Apollo Pharmacy", 
        address: "Healthcare Ave 202", 
        stockStatus: "low-stock", 
        is24Hours: false, 
        rating: 4.2 
      },
      { 
        name: "Local Health Hub", 
        address: "Suburban Rd 303", 
        stockStatus: "out-of-stock", 
        is24Hours: true, 
        rating: 3.5 
      },
      { 
        name: "Wellness Drugstore", 
        address: "Park Plaza 50", 
        stockStatus: "in-stock", 
        is24Hours: false, 
        rating: 4.5 
      }
    ]);

    console.log('✅ Sample Pharmacies Seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();