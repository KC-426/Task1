const Event = require("../models/event");
const getDb = require("../util/database").getDb;

const ITEMS_PER_PAGE = 5;


exports.getEvent = (req, res, next) => {
const eventId = req.params.eventId;
Event.findOne(eventId) 
  .then((event) => {
    if (!event) {
      const error = new Error("Could not find event.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Event fetched.", event: event });
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.getEvents = (req, res, next) => {
  const page = +req.query.page || 1;
  const ITEMS_PER_PAGE = 10;
  let totalEvents;

  Event.countDocuments()
    .then((numEvents) => {
      totalEvents = numEvents;
      return Event.find();
    })
    .then((events) => {
      res.status(200).json({
        message: "Events fetched",
        events: events,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalEvents,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalEvents / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createEvent = (req, res, next) => {
  const eventData = {
    name: req.body.name,
    tagline: req.body.tagline,
    schedule: req.body.schedule,
    description: req.body.description,
    moderator: req.body.moderator,
    category: req.body.category,
    sub_category: req.body.sub_category,
    rigor_rank: req.body.rigor_rank,
  };

  const event = {
    event: eventData
  };

  const db = getDb();
  db.collection("events")
    .insertOne(event)
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Event created successfully!",
        event: event.event,
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
  console.log("Event deleted with this id: " + eventId);
  Event.deleteOne(eventId)
    .then((event) => {
      if (!event) {
        res.status(404).json({ msg: "No event found" });
      }
      res.status(200).json({ message: "Event deleted." });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Could not delete event.");
      error.statusCode = 500;
      next(error);
    });
};
