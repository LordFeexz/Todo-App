const { mongoConnect } = require("../config/mongo");

const app = require("../app");

const port = process.env.PORT || 3001;

mongoConnect()
  .then(() =>
    app.listen(port, () => console.log(`app listening on port ${port}`))
  )
  .catch((err) => console.log(err));
