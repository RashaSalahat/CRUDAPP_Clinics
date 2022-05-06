const express = require('express');
//const app = express() would create new app so we create route
const route = express.Router() // method of express :we create a different touter in a separate file

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-clinic', services.add_clinic)

/**
  *  @description for update user
  *  @method GET /update-user
  */
route.get('/update-clinic', services.update_clinic)


// API/*
route.post('/api/clinics', controller.create);
route.get('/api/clinics', controller.find); // this route to get single & multiple clinics
route.put('/api/clinics/:id', controller.update);
route.delete('/api/clinics/:id', controller.delete);


module.exports = route