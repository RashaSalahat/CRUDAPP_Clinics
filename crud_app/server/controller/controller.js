var Clinicdb = require('../model/model');
// This file is for the 4 CRUD Operations:
// create and save new user 
// Api Request
//create call back function:
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"}); // when the req make a post req with empty body 
        return; // if the user make an empty req
    }
// Whenever the user make a post Req using a form ,
//All the data of the form is stored in the body of the req object
//and using this body we can access all the form Data
//Get Data from post method: and create and instance called user of the Userdb model
    // new user , new instance of the userdb schema 
    const clinic = new Clinicdb({
        //values for the user Schema 
        //When the user make a post req: 
        name : req.body.name,
        doctor : req.body.doctor,
        information: req.body.information,
        status : req.body.status
    })

    // save user (Data) in the database
    //.save (object we declared above) 
    clinic
        .save(clinic) 
        .then(data => {
          //  res.send(data); //For Postman
            res.redirect('/add-clinic'); //For actual App//redirect the user to a page you can redirect them to any page you want 
        })
        .catch(err =>{

            res.status(500).send({
            // if this variable(err.message) return nothing 
            //i'm going to specify value :"Some error occurred while creating a create operation"
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){ // if the user wanted to find a selected id 
      //  retrive and return a single user we use params in postman + select a certain id the url is diff like this : http://localhost:3000/api/users?id=6252e9a55b5291c52a429dbd
        const id = req.query.id; 
        Clinicdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found clinic with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving clinic with id " + id})
            })

    }else{
        //return all records inside the database
        Clinicdb.find()
            .then(clinic => {
                res.send(clinic)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving clinic information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Clinicdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update clinic with ${id}. Maybe clinic not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update clinic information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id; //get id value from the req

    Clinicdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){ //if we don't have data
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Clinic was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Clinic with id=" + id
            });
        });
}