const path = require('path');

const express = require('express');

const eventController = require('../controllers/event');

const router = express.Router();

router.get('/event/:eventId', eventController.getEvent);

router.get('/events', eventController.getEvents)

router.post('/create-event', eventController.createEvent)

router.post('/update-event', eventController.updateEvent)

router.delete('/delete-event', eventController.deleteEvent)

module.exports = router;