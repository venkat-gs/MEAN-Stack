const express = require('express');
const customerSchema = require('../Model/users.js');
const router = express.Router();
const objectId= require('mongoose').Types.ObjectId;

router.get('/', async (req, res) => {

    try{
        const customers = await customerSchema.find();
        res.json(customers);
    }
    catch(e){
        console.log('Error on get request: ' + e); 
    }
});

router.get('/:id', async (req, res) =>{
    try{
        if(!objectId.isValid(req.params.id)){
            return res.status(400).send('No record for given id: ' + req.params.id);
        }
        else{
            const customer = await customerSchema.findById(req.params.id);
            res.json(customer);
        }
    }
    catch(err){
        res.send('Error on get request:' + err);
    }
});

router.post('/', async(req, res) => {

    try{
        const customersList = new customerSchema({
            customerid: req.body.customerid,
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            mobileno: req.body.mobileno
        });
        
        const data = await customersList.save();
        res.json(data);
    }
    catch(err){
        res.send('Error on post request:' + err);
    }
});

router.delete('/:id', async (req, res) =>{
    try{
            const customer = await customerSchema.findById(req.params.id);
            const data = await customer.delete();
            res.json(req.params.id +' record deleted');
    }
    catch(err){
        res.send('Error on get request:' + err);
    }
});

router.put('/:id', async (req, res) => {

    try{
        if(!objectId.isValid(req.params.id)){
            return res.status(400).send('No record for given id: ' + req.params.id);
        }
        else{
            const customerReq = {
                customerid: req.body.customerid,
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
                mobileno: req.body.mobileno
            }
            customerSchema.findByIdAndUpdate(req.params.id, {$set:customerReq}, {new:true}, (err, doc) => {
                if(!err){ res.send(doc); }
                else{
                    res.send('Error on update the customer:' + JSON.stringify(err, undefined, 2));
                }
            })
        }
    }
    catch(err){
        res.send('Error on get request:' + err);
    }
});

module.exports = router;
