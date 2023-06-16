const path = require('path');
const multer = require('multer')
var upload = multer({storage: multer.memoryStorage()})

const express = require('express');

const eventController = require('../controllers/event');

const router = express.Router();

router.get('/event/:eventId', eventController.getEvent);

router.get('/events', eventController.getEvents)

router.post('/create-event',upload.single('file'), eventController.createEvent)

router.delete('/delete-event', eventController.deleteEvent)

module.exports = router;
