const path = require('path');

const express = require('express');

const eventController = require('../controllers/event');

const router = express.Router();

router.get('/event/:eventId', eventController.getEvent)

router.get('/events', eventController.getEvents)

router.post('/create-event', eventController.createEvent)

router.post('/event/:eventId', eventController.updateEvent)

router.delete('/event/:eventId', eventController.deleteEvent)

module.exports = router;