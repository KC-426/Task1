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
  const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;

  const event = new Event({
    name: name,
    tagline: tagline,
    schedule: schedule,
    description: description,
    moderator: moderator, 
    category: category,
    sub_category: sub_category,
    rigor_rank: rigor_rank,
  });

  event
    .save()
    .then((result) => {
      const data = {
        id: result._id,
        name: result.name,
        tagline: result.tagline,
        schedule: result.schedule,
        description: result.description,
        moderator: result.moderator,
        category: result.category,
        sub_category: result.sub_category,
        rigor_rank: result.rigor_rank,
      };

      res.status(201).json({
        message: "Event created successfully!",
        event: event,
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
  const updatedEvent = req.body; 

  Event.update(eventId, updatedEvent, { new: true })
    .then((event) => {
      if (!event) {
        const error = new Error("Could not find event.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Event updated.", event: event });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Unable to update event.");
      error.statusCode = 500;
      next(error);
    });
};

exports.deleteEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.deleteOne(eventId)
    .then(() => {
      res.status(200).json({ message: 'Deleted event.' });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error('Could not delete event.');
      error.statusCode = 500;
      next(error);
    });
};