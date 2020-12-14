const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil');
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
    let db = MongoUtil.getDB();
    let faults = await db.collection('faults').find().toArray();
    res.send(faults);
})

router.get('/:id', async (req, res) => {
    let db = MongoUtil.getDB();
    let fault = await db.collection('faults').findOne({
        '_id': ObjectId(req.params.id)
    });
    res.send(fault);
})

router.post('/', async (req, res) => {
    let db = MongoUtil.getDB()

    // Extract all fields
    let {
        name,
        location,
        tags,
        block,
        reporter_name,
        reporter_email,
        date
    } = req.body

    // Javascript black magic
    // let newFault = {...req.body};

    // tags could be an array or a single item, or undefined (Because user did not check any checkboxes)

    // for undefined: if tags is undefined, it will be an empty array
    tags = tags || [];

    // if tags is not array, convert to array
    tags = Array.isArray(tags) ? tags : [tags];

    date = new Date(date);

    let results = await db.collection('faults').insertOne({
        name,
        location,
        tags,
        block,
        reporter_name,
        reporter_email,
        date
    })

    // if i use res.send and it sends back an array or object, express will convert it to be JSONx
    res.send({'message': 'New fault report has been created successfully!', 'inserterdid': results.inserterdId})
})

router.patch('/:id', async (req, res) => {
    let db = MongoUtil.getDB();
    let id = req.params.id;

    let {
        name,
        location,
        tags,
        block,
        reporter_name,
        reporter_email,
        date
    } = req.body;

    // JavaScript black magic
    // let newFault = {...req.body};

    // tags could be an array, or a single item, or undefined (because the user didn't check any checkbox)

    // for undefined: if tags is undefined, it will be an empty array
    tags = tags || [];

    // if tags is not an array, convert to array
    tags = Array.isArray(tags) ? tags : [tags];

    date = new Date(date);

    let results = await db.collection('faults').updateOne({
        '_id': ObjectId(id)
    }, {
        '$set': {
            name,
            location,
            tags,
            block,
            reporter_name,
            reporter_email,
            date
        }

    });

    res.send({'message': 'Update done', 'status': 'OK'})

})

router.delete('/:id', async (req, res) => {
    let db = MongoUtil.getDB();
    await db.collection('faults').deleteOne({
        _id: ObjectId(req.params.id)
    })

    res.send({'status': 'OK'})
})

module.exports = router;
