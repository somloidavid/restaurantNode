const express = require('express');
const router = express.Router();
const restaurantModel = require('../models/restaurant.model');
const RestaurantController = require('../controllers/restaurant.controller');

router.post('/', async (req, res) => {
    const data = new restaurantModel(req.body);
    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.get('', async (req, res) => {
    try {
        const data = await RestaurantController.getRestaurants(req, res);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await RestaurantController.getRestaurantById(req, res);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const result = await RestaurantController.updateRestaurant(req, res);
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await RestaurantController.deleteRestaurant(req, res);
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;