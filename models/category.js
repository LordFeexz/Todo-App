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
}

module.exports = Category;
