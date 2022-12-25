const { getDb, ObjectId } = require("../config/mongo");

class Todo {
  static getCollection() {
    return getDb().collection("Todo");
  }

  static async findAll() {
    try {
      return await this.getCollection().find().toArray();
    } catch (err) {
      return err;
    }
  }

  static async findByCategoryId(data) {
    try {
      return await this.getCollection().find({ CategoryId: data }).toArray();
    } catch (err) {
      return err;
    }
  }

  static async findMyData(id) {
    try {
      return await this.getCollection().find({ UserId: id }).toArray();
    } catch (err) {
      return err;
    }
  }

  static async create(data) {
    try {
      return await this.getCollection().insertOne(data);
    } catch (err) {
      return err;
    }
  }

  static async updateData(id, data) {
    try {
      return this.getCollection().updateOne(
        { _id: ObjectId(id) },
        { $set: data }
      );
    } catch (err) {
      return err;
    }
  }

  static async destroy(data) {
    try {
      return await this.getCollection().findOneAndDelete({
        _id: ObjectId(data),
      });
    } catch (err) {
      return err;
    }
  }
}

module.exports = Todo;
