const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Event {
  constructor(name, file, tagline, schedule, description, moderator, category, sub_category, rigor_rank) {
    this.name = name;
    this.file = req.file;
    this.tagline = tagline;
    this.schedule = schedule;
    this.description = description;
    this.moderator = moderator;
    this.category = category;
    this.sub_category = sub_category;
    this.rigor_rank = rigor_rank;
  }
  
  static async find(eventId) {
    try {
      const db = getDb();
      const event = await db.collection("event")
        .findOne({ _id: new mongodb.ObjectId(eventId) });
      console.log(event);
      return event;
    } catch (err) {
      console.log(err);
    }
  }
    
  static async fetchAll() {
    try {
      const db = getDb();
      const events = await db
        .collection("events")
        .find()
        .toArray();
      console.log(events);
      return events;
    } catch (err) {
      console.log(err);
    }
  }

  save() {
    const db = getDb();
    return db
      .collection("events")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static async find(eventId) {
    try {
      const db = getDb();
      const result = await db.collection("event")
        .deleteOne({ _id: new mongodb.ObjectId(eventId) });
      if (result.deletedCount === 1) {
        console.log("Event deleted successfully");
      } else {
        console.log("Event not found");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Event ;
