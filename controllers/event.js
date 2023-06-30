const Event = require("../models/event");

const ITEMS_PER_PAGE = 5;

exports.getEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.find(eventId)
    .then((event) => {
      if (!event) {
        const error = new Error("Could not find event.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Event fetched.", event: event });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Could not fetch event.");
      error.statusCode = 500;
      next(error);
    });
};

exports.getEvents = (req, res, next) => {
  const page = +req.query.page || 1;
  const ITEMS_PER_PAGE = 10; 
  let totalEvents;

  Event.countDocuments()
    .then(numEvents => {
      totalEvents = numEvents;
      return Event.find()
    })
    .then(events => {
      res.status(200).json({
        message: 'Events fetched',
        events: events,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalEvents,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalEvents / ITEMS_PER_PAGE)
      });
    })
    .catch(err => {
      console.log(err);
      const error = new Error('Could not fetch events.');
      error.statusCode = 500;
      next(error);
    });
};


exports.createEvent = (req, res, next) => {
  const eventData = {
    _id: req.body._id,
    name: req.body.name,
    tagline: req.body.tagline,
    schedule: req.body.schedule,
    description: req.body.description,
    moderator: req.body.moderator,
    category: req.body.category,
    sub_category: req.body.sub_category,
    rigor_rank: req.body.rigor_rank
  };

  const event = new Event(eventData);
  event
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Event created successfully!",
        event
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.deleteOne(eventId)
    .then(() => {
      res.status(200).json({ message: 'Event deleted.' });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error('Could not delete event.');
      error.statusCode = 500;
      next(error);
    });
};