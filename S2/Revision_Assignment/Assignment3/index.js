const express = require('express');
const app = express();
require('dotenv').config();
const {Connection } = require('./db');
const rateLimit = require('express-rate-limit');
const ParkingSlot = require('./models/ParkingSlot');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json()); 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});
app.use(limiter);

// Routes

// Park a Car
app.post('/park', async (req, res) => {
  try {
    const { carNumber } = req.body;
    const parkingLotSize = parseInt(process.env.PARKING_LOT_SIZE);
    const occupiedSlots = await ParkingSlot.countDocuments({ isOccupied: true });
    if (occupiedSlots >= parkingLotSize) {
      return res.status(400).json({ error: 'Parking lot is full.' });
    }

    const firstAvailableSlot = await ParkingSlot.findOne({ isOccupied: false });
    if (firstAvailableSlot) {
      firstAvailableSlot.carNumber = carNumber;
      firstAvailableSlot.isOccupied = true;
      await firstAvailableSlot.save();
      return res.status(200).json({ slot: firstAvailableSlot.slotNumber });
    } else {
      return res.status(400).json({ error: 'No available slots.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Unpark the Car
app.delete('/unpark/:slotNumber', async (req, res) => {
  try {
    const { slotNumber } = req.params;

    const slot = await ParkingSlot.findOne({ slotNumber, isOccupied: true });
    if (slot) {
      slot.carNumber = '';
      slot.isOccupied = false;
      await slot.save();
      res.status(200).send('Car has been unparked.');
    } else {
      res.status(400).json({ error: 'No car found in the specified slot.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get Car/Slot Information
app.get('/info', async (req, res) => {
  try {
    const { slotNumber, carNumber } = req.query;

    if (slotNumber) {
      
      const slotInfo = await ParkingSlot.findOne({ slotNumber });
      if (slotInfo) {
        res.status(200).json({
          carNumber: slotInfo.carNumber,
          slotNumber: slotInfo.slotNumber,
        });
      } else {
        res.status(404).json({ error: 'Slot not found.' });
      }
    } else if (carNumber) {
      
      const carInfo = await ParkingSlot.findOne({ carNumber });
      if (carInfo) {
        res.status(200).json({
          carNumber: carInfo.carNumber,
          slotNumber: carInfo.slotNumber,
        });
      } else {
        res.status(404).json({ error: 'Car not found.' });
      }
    } else {
      res.status(400).json({ error: 'Please provide either a slot number or a car number.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
  try {
    console.log(`Server is running on port ${PORT}`);
    await Connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
