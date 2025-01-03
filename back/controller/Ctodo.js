const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const ids = await Todo.findAll();
    res.send(ids);
  } catch (e) {
    console.error(e);
    res.status(500).send("server error");
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    const { id } = req.params;

    const todo_id = await Todo.findOne({
      where: { id: id },
    });

    if (!id) {
      return res.send({ message: "Todo not found" });
    } else res.send(todo_id);
  } catch (e) {
    console.error(e);
    res.status(500).send("server error");
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const { title, done } = req.body;

    const updateTodo = await Todo.create(req.body);
    if (title && done) {
      res.send(updateTodo);
    } else if (done && !title) {
      res.send({ message: "Internal Server Error" });
    } else res.send(updateTodo);
  } catch (e) {
    console.error(e);
    res.status(500).send("server error");
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const updateTodo = await Todo.update(
      {
        id: req.body.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!id) {
      return res.send({ message: "Todo not found" });
    } else res.send(updateTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("server error");
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await Todo.destroy({
      where: {
        id: id,
      },
    });

    if (!id) {
      return res.send({ message: "Todo not found" });
    } else res.send({ deletedId: id, message: "Todo deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).send("server error");
  }
};
