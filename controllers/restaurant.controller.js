const restaurantModel = require('../models/restaurant.model');

exports.createRestaurant = (req, res, next) => {
    const restaurant = restaurantModel.create(req.body);
    res.status(201).json(restaurant);
}

exports.getRestaurants = async (req, res, next) => {
    const restaurants = await restaurantModel.find();
    res.status(200).json(restaurants);
}

exports.getRestaurantById = async (req, res, next) => {
    const restaurant = await restaurantModel.findById(req.params.id);
    res.status(200).json(restaurant);
}

exports.updateRestaurant = async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await restaurantModel.findByIdAndUpdate(
        id, updatedData, options
    )
    res.status(200).json(result);
}

exports.deleteRestaurant = async (req, res, next) => {
    const id = req.params.id;
    const data = await restaurantModel.findByIdAndDelete(id);
    res.status(200).json(data);
}