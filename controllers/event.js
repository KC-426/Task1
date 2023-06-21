const Event = require("../models/event");

const ITEMS_PER_PAGE = 5;

exports.getEvent = (req, res, next) => {
  const eventId = req.params.eventId;
  Event.findById(eventId)
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
  let totalEvents;

  Event.fetchAll()
    // .countDocuments()
    .then(numEvents => {
      totalEvents = numEvents;
      return Event.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(events => {
      res.status(200).render({ message: 'Events fetched', 
        event: events,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalEvents,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalEvents / ITEMS_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.createEvent = (req, res, next) => {

  const name = req.file.name;
  const file = req.file;
  const tagline = req.body.tagline;
  const schedule = req.body.schedule;
  const description = req.body.description;
  const moderator = req.body.moderator;
  const category = req.body.category;
  const sub_category = req.body.sub_category;
  const rigor_rank = req.body.rigor_rank;

  var imageName = 'file' + randomString.generate(7) + '.jpg'

  path = __dirname + `/../uploads/${imageName}`
  fs.createWriteStream(path).write(image.buffer)
  console.log(path)

  const event = new Event({
    name: name,
    imagePath: imageName,
    tagline: tagline,
    schedule: schedule,
    description: description,
    schedule: moderator,
    category: category,
    sub_category: sub_category,
    rigor_rank: rigor_rank,
  });
  event
    .save()
    .then((result) => {
      json.status(201).json({
        message: "Event created successfully!",
        event: event
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
  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        const error = new Error("Could not find event.");
        error.statusCode = 404;
        throw error;
      }
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted event." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
