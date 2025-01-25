const mongodb = require("../Database/MongoDB");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Prophets"]
    try {
    const result = await mongodb.getDatabase().db().collection("prophets").find()
    .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    //#swagger.tags=["Prophets"]
    try {
        if(!ObjectId.isValid(req.params.id)) {
            res.status(404).json("Invalid prophet ID. Please check again and use a valid one")
        }
    const prophetId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("prophets").find({ _id: prophetId}).toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createProphet = async (req, res) => {
    //#swagger.tags=["Prophets"]
    const prophet = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        studies: req.body.studies,
        wifeName: req.body.wifeName
    };
    const response = await mongodb.getDatabase().db().collection("prophets").insertOne(prophet);

    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Something happened while creating the prophet.");
    }
};

const updateProphet = async (req, res) => {
    //#swagger.tags=["Prophets"]
    if(!ObjectId.isValid(req.params.id)) {
        res.status(404).json("Invalid prophet ID. Please check again and use a valid one")
    }
    const prophetId = new ObjectId(req.params.id);
    const prophet = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        studies: req.body.studies,
        wifeName: req.body.wifeName
    };
    const response = await mongodb.getDatabase().db().collection("prophets").replaceOne({ _id: prophetId }, prophet);

    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Something happened while updating the prophet.");
    }
};

const deleteProphet = async (req,res) => {
    //#swagger.tags=["Prophets"]
    if(!ObjectId.isValid(req.params.id)) {
        res.status(404).json("Invalid prophet ID. Please check again and use a valid one")
    }
    const prophetId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("prophets").deleteOne({ _id: prophetId });

    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Something happened while deleting the prophet.");
    }
}

module.exports = { getAll, getById, createProphet, updateProphet, deleteProphet };