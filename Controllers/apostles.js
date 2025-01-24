const mongodb = require("../Database/MongoDB");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Apostles"]
    try {
    const result = await mongodb.getDatabase().db().collection("apostles").find()
    .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    //#swagger.tags=["Apostles"]
    try {
        if(!ObjectId.isValid(req.params.id)) {
            res.status(404).json("Invalid apostle ID. Please check again and use a valid one")
        }
    const apostleId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("apostles").find({ _id: apostleId}).toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createApostle = async (req, res) => {
    //#swagger.tags=["Apostles"]
    const apostle = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        ordained: req.body.ordained,
        birthday: req.body.birthday,
        studies: req.body.studies,
        wifeName: req.body.wifeName
    };
    const response = await mongodb.getDatabase().db().collection("apostles").insertOne(apostle);

    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Something happened while creating the apostle.");
    }
};

const updateApostle = async (req, res) => {
    //#swagger.tags=["Apostles"]
    if(!ObjectId.isValid(req.params.id)) {
        res.status(404).json("Invalid apostle ID. Please check again and use a valid one")
    }
    const apostleId = new ObjectId(req.params.id);
    const apostle = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        ordained: req.body.ordained,
        birthday: req.body.birthday,
        studies: req.body.studies,
        wifeName: req.body.wifeName
    };
    const response = await mongodb.getDatabase().db().collection("apostles").replaceOne({ _id: apostleId }, apostle);

    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Something happened while updating the apostle.");
    }
};

const deleteApostle = async (req,res) => {
    //#swagger.tags=["Apostles"]
    if(!ObjectId.isValid(req.params.id)) {
        res.status(404).json("Invalid apostle ID. Please check again and use a valid one")
    }
    const apostleId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("apostles").deleteOne({ _id: apostleId });

    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Something happened while deleting the apostle.");
    }
}

module.exports = { getAll, getById, createApostle, updateApostle, deleteApostle };