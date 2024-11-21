const RestaurantController = require('../../controllers/restaurant.controller');
const RestaurantModel = require('../../models/restaurant.model');
const httpMocks = require('node-mocks-http')
const newRestaurant = require('../mock-data/new-restaurant.json');

RestaurantModel.create = jest.fn();
RestaurantModel.find = jest.fn();
RestaurantModel.findById = jest.fn();
RestaurantModel.findByIdAndUpdate = jest.fn();
RestaurantModel.findByIdAndDelete = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('RestaurantController.createRestaurant', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });
    it('should have a createRestaurant function', () => {
        expect(typeof RestaurantController.createRestaurant).toBe('function');
    });
    it('should call reastaurantModel.create', () => {
        RestaurantController.createRestaurant(req, res, next)
        expect(RestaurantModel.create).toHaveBeenCalledWith(newRestaurant);
    });
    it('should return 201 response code', () => {
        RestaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', () => {
        RestaurantModel.create.mockReturnValue(newRestaurant);
        RestaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });
});

describe('RestaurantController.getRestaurants', () => {
    it('should have a getRestaurants function', () => {
        expect(typeof RestaurantController.getRestaurants).toBe('function');
    });
    it('should call restaurantModel.find()', async () => {
        await RestaurantController.getRestaurants(req, res);
        expect(RestaurantModel.find).toHaveBeenCalled();
    });
    it('should return response with status 200 and all restaurants', async () => {
        RestaurantModel.find.mockReturnValue([newRestaurant]);
        await RestaurantController.getRestaurants(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual([newRestaurant]);
    });
});

describe('restaurantController.getRestaurantById', () => {
    it('should have a getRestaurantById function', () => {
        expect(typeof RestaurantController.getRestaurantById).toBe('function');
    });
    it('should call restaurantModel.findById', async () => {
        req.params.id = '60f1c7f8d1c4f4b3b8b2b0a6';
        await RestaurantController.getRestaurantById(req, res);
        expect(RestaurantModel.findById).toHaveBeenCalledWith(req.params.id);
    });
    it('sould return code response 200', async () => {
        req.params.id = '60f1c7f8d1c4f4b3b8b2b0a6';
        await RestaurantController.getRestaurantById(req, res);
        expect(res.statusCode).toBe(200);
    });
    it('should return json body in response', async () => {
        RestaurantModel.findById.mockReturnValue(newRestaurant);
        req.params.id = '60f1c7f8d1c4f4b3b8b2b0a6';
        await RestaurantController.getRestaurantById(req, res);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });
});

describe('restaurantController.updateRestaurant', () => {
    it('should have a updateRestaurant function', () => {
        expect(typeof RestaurantController.updateRestaurant).toBe('function');
    });
    it('should call restaurantModel.findByIdAndUpdate', async () => {
        RestaurantController.updateRestaurant(req, res, next)
        expect(RestaurantModel.create).toHaveBeenCalledWith(newRestaurant);
    });
    it('should return response with json data and code 200', async () => {
        const updatedRestaurant = { name: 'Updated Name' };
        RestaurantModel.findByIdAndUpdate.mockReturnValue(updatedRestaurant);
        await RestaurantController.updateRestaurant(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedRestaurant);
    });
});

describe('restaurantController.deleteRestaurant', () => {
    it('should have a deleteRestaurant function', () => {
        expect(typeof RestaurantController.deleteRestaurant).toBe('function');
    });
    it('should call restaurantModel.findByIdAndDelete', async () => {
        req.params.id = '60f1c7f8d1c4f4b3b8b2b0a6';
        await RestaurantController.deleteRestaurant(req, res);
        expect(RestaurantModel.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    });
    it('should return code response 200', async () => {
        req.params.id = '60f1c7f8d1c4f4b3b8b2b0a6';
        await RestaurantController.deleteRestaurant(req, res);
        expect(res.statusCode).toBe(200);
    });
    it('should return json body in response', async () => {
        RestaurantModel.findByIdAndDelete.mockReturnValue(newRestaurant);
        req.params.id = '60f1c7f8d1c4f4b3b8b2b0a6';
        await RestaurantController.deleteRestaurant(req, res);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });
});