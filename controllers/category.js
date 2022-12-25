const Category = require("../models/category");
const Todo = require("../models/todo");

class Controller {
  static async getAll(req, res, next) {
    try {
      const categories = await Category.findAll();

      if (!categories || categories.length < 1)
        throw { name: "data not found" };

      if (categories.ok) throw { name: "fail auth to db" };

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { name } = req.body;

      const category = await Category.create({ name });

      if (!category.acknowledged) throw { name: "failed create" };

      res.status(201).json({ message: "success create" });
    } catch (err) {
      next(err);
    }
  }

  static async updateData(req, res, next) {
    try {
      const { id: _id } = req.params;
      const { name } = req.body;

      const category = await Category.updateData(_id, { name });

      if (!category.acknowledged) throw { name: "failed update" };

      res.status(201).json({ message: "success update" });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id: _id } = req.params;

      const todo = await Todo.findByCategoryId(_id);

      if (todo.length > 0) throw { name: "data required" };

      const category = await Category.destroy(_id);

      if (!category.acknowledged) throw { name: "failed delete" };

      res.status(200).json({ message: "success delete" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
