const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const Restaurant = require('../../models/restaurant.model');
const newRestaurant = require('../mock-data/new-restaurant.json');

let uniqueRestaurant = {};

beforeAll(async () => {
    const connString = process.env.DATABASE_URL;
    await mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true });
    delete newRestaurant._id;
    uniqueRestaurant = {};
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Restaurant API', () => {
    it('GET /api - should return all restaurants', async () => {
        const response = await request(app).get('/api');
        uniqueRestaurant = response.body[0];
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('POST /api - should create a new restaurant', async () => {
        const response = await request(app).post('/api').send({ name: `Restaurant-${Date.now()}`, borough: uniqueRestaurant.borough });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBeDefined();
    });

    it('GET /api/:id - should return a restaurant by ID', async () => {
        const response = await request(app).get(`/api/${uniqueRestaurant._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(uniqueRestaurant.name);
    });

    it('PATCH /api/:id - should update a restaurant by ID', async () => {
        const updatedData = { name: 'Updated Name' };
        const response = await request(app).patch(`/api/${uniqueRestaurant._id}`).send(updatedData);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
    });

    it('DELETE /api/:id - should delete a restaurant by ID', async () => {
        const response = await request(app).delete(`/api/${uniqueRestaurant._id}`);
        expect(response.statusCode).toBe(200);
        const deletedRestaurant = await Restaurant.findById(uniqueRestaurant._id);
        expect(deletedRestaurant).toBeNull();
    });
});