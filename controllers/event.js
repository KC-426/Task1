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

exports.updateEvent = (req, res, next) => {
  const eventId = req.params.eventId;

 const name = req.body.name
 const tagline = req.body.tagline
 const schedule = req.body.schedule
 const description = req.body.description
 const moderator = req.body.moderator
 const category = req.body.category
 const sub_category = req.body.sub_category
 const rigor_rank = req.body.rigor_rank

 Event.findByIdandUpdate(eventId)
 .then((event) => {
   if (!event) {
     const error = new Error("Could not find event.");
     error.statusCode = 404;
     throw error;
   }

   event.name = name;
   event.tagline = tagline;
   event.schedule = schedule;
   event.description = description;
   event.moderator = moderator;
   event.category = category;
   event.sub_category = sub_category;
   event.rigor_rank = rigor_rank;

   return event.save();
 })
 .then((result) => {
   res.status(200).json({ message: "Event updated!", event: result });
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

  Event.deleteOne({ _id: eventId })
      .then(event => {
          if (eventId.stringToHex(stringValue) === event._id.stringToHex(stringValue)) {
              res.status(200).json({ msg: 'Event deleted successfully' });
          } else {
              res.status(404).json({ msg: 'Event not found' });
          }
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ msg: 'Error deleting event' });
      });
};
