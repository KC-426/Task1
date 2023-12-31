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

  static async findOne(eventId) {
    try {
      const db = getDb();
      const event = await db.collection("events").findOne({ _id: new mongodb.ObjectId(eventId) });
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

  static async findByIdandUpdate(eventId) {
    try {
      const db = getDb();
      const event = await await db.collection("events").findByIdandUpdate({ _id: new mongodb.ObjectId(eventId) });
      return event;
    } catch (err) {
      console.log(err);
    }
    }
  
  static async deleteOne(eventId) {
    try {
      const db = getDb();
      const result = await db.collection('events').deleteOne({ _id: new mongodb.ObjectId(eventId) });
      return result;
    } catch (err) {
      console.log(err);
      throw err; 
    }
  }


}

module.exports = Event ;
