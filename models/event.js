const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Event {
  constructor(name, tagline, schedule, description, moderator, category, sub_category, rigor_rank) {
    this.name = name;
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
      const event = await db.collection("event").findOne({ _id: new ObjectId(eventId) });
      return event;
    } catch (err) {
      console.log(err);
    }
  }
    
  static async countDocuments() {
    try {
      const db = getDb();
      const count = await db.collection('events').countDocuments();
      return count;
    } catch (err) {
      console.log(err);
    }
  }
  
  static async find() {
    try {
      const db = getDb();
      const events = await db.collection('events').find().toArray();
      return events;
    } catch (err) {
      console.log(err);
    }
  }

  save() {
    const db = getDb();
    return db
      .collection("events")
      .insert(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static async update(eventId, updatedEvent) {
    try {
      const db = getDb();
      const result = await db.collection("event").updateOne({ _id: new ObjectId(eventId) }, { $set: updatedEvent });
      if (result.matchedCount === 0) {
        const error = new Error("Could not find event.");
        error.statusCode = 404;
        throw error;
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteOne(eventId) {
    try {
      const db = getDb();
      const result = await db.collection('event').deleteOne({ _id: new ObjectId(eventId) });
      if (result.deletedCount === 1) {
        console.log('Event deleted successfully');
      } else {
        console.log('Event not found');
      }
    } catch (err) {
      console.log(err);
    }
  }

}

module.exports = Event ;
