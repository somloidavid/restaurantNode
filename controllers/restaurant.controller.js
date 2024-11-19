const RestaurantModel = require('../models/restaurant.model');

exports.createRestaurant = (req, res, next) => {
    const restaurant = RestaurantModel.create(req.body);
    res.status(201).json(restaurant);
}

exports.getRestaurants = async (req, res, next) => {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
}

exports.getRestaurantById = async (req, res, next) => {
    const restaurant = await RestaurantModel.findById(req.params.id);
    res.status(200).json(restaurant);
}