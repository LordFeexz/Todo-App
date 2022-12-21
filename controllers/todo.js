const Category = require("../models/category");
const Todo = require("../models/todo");
const User = require("../models/user");

class Controller {
  static async getAll(req, res, next) {
    try {
      const todos = await Todo.findAll();

      if (!todos || todos.length < 1) throw { name: "data not found" };

      if (todos.ok) throw { name: "fail auth to db" };

      const users = await User.findAll();

      const categories = await Category.findAll();

      const todoUser = todos.map((todo) => {
        let user = users.filter((user) => {
          if (user._id === todo.UserId) return user;
        });
        if (user.length > 0) {
          return {
            ...todo,
            User: user,
          };
        }
        return {
          ...todo,
          User: [],
        };
      });

      const result = todoUser.map((todo) => {
        let category = categories.filter((category) => {
          if (category._id === todo.CategoryId) return category;
        });

        if (category.length > 0) {
          return {
            ...todo,
            Category: category,
          };
        }
        return {
          ...todo,
          Category: [],
        };
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getMyData(req, res, next) {
    try {
      const { _id, name } = req.user;

      const todos = await Todo.findMyData(_id);

      if (!todos || todos.length < 1) throw { name: "data not found" };

      if (!todos.ok) throw { name: "fail auth to db" };

      const categories = await Category.findAll();

      const result = todos.map((el) => {
        let category = categories.filter((category) => {
          if (category._id === el.CategoryId) return category;
        });
        return {
          ...el,
          User: name,
          Category: category,
        };
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async completed(req, res, next) {
    try {
      const { id: _id } = req.params;
      const todo = await Todo.updateData(_id, {
        complete: true,
        finishDate: new Date(),
      });

      if (!todo.acknowledged) throw { name: "failed update" };

      res.status(201).json({ message: "success update" });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { _id } = req.user;
      const { name, CategoryId } = req.body;

      const todo = await Todo.create({
        name,
        UserId: _id,
        CategoryId,
        complete: false,
        startDate: new Date(),
        finishDate: null,
      });

      if (!todo.acknowledged) throw { name: "failed create" };

      res.status(201).json({ message: "success create" });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { _id } = req.params;

      const todo = await Todo.destroy(_id);

      if (!todo.acknowledged) throw { name: "failed delete" };

      res.status(200).json({ message: "success delete" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
