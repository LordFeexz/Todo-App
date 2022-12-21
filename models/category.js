class Category {
  static getCollection() {
    return getDb().collection("Category");
  }

  static async findAll() {
    try {
      return await this.getCollection().find().toArray();
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

module.exports = Category;
