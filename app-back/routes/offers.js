var express = require('express');
var router = express.Router();
const Mongolib = require("../db/Mongolib");

/* GET home page. */
router.get('/', function (req, res, next) {
    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(db, docs => {
            res.send(docs);
        })
    })
});

/* POST */
router.post('/', function(req, res, next){
    const {error} = validateOffer(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const { name, company, salary, city } = req.body;
    const obj = {name, company, salary, city};

    Mongolib.getDatabase(db => {
        Mongolib.createDocument(db, obj, (message)=>res.send(message));
    })

});

const validateOffer = (offer)=>{
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        company: Joi.string().min(2).required(),
        salary : Joi.min(2).required(),
        city: Joi.string().min(2).required()
    });
    return schema.validate(offer);
}


module.exports = router;