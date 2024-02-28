const asyncHandler = require('express-async-handler');
const Client = require('../Models/clientModel');
const ApiError = require('../utils/apiError');
const PAGE_SIZE = 6;

exports.getClients = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const skip = (page - 1) * PAGE_SIZE;

    const totalClients = await Client.countDocuments();
    const totalPages = Math.ceil(totalClients / PAGE_SIZE);

    const clients = await Client.find().skip(skip).limit(PAGE_SIZE);

    res.status(200).json({
        clients,
        totalPages,
        currentPage: page,
    });
});


exports.addClient = asyncHandler(async (req, res, next) => {
    const { name, surname, email, location, status } = req.body;

    const existingClient = await Client.findOne({ googleId: req.body.email });

    if (existingClient) {
        return next(new ApiError('email is already in use', 400));
    }

    const newClient = await Client.create({
        name,
        surname,
        email,
        location,
        status,
    });

    res.status(201).json(newClient);
});

exports.editClient = asyncHandler(async (req, res) => {
    const clientId = req.params.id;
    const { name, surname, email, location, status } = req.body;

    const updatedClient = await Client.findByIdAndUpdate(clientId, {
        name,
        surname,
        email,
        location,
        status,

    }, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(updatedClient);
});

exports.deleteClient = asyncHandler(async (req, res) => {
    const clientId = req.params.id;

    await Client.findByIdAndDelete(clientId);

    res.status(204).send();
});
