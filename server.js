const express = require("express");
const fs = require("fs");
const sqlite = require("sql.js");

const filebuffer = fs.readFileSync("db/users.sqlite3");

const db = new sqlite.Database(filebuffer);

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const COLUMNS = ["department", "failureRate"];

const processData = require("./processData");

app.get("/api/users", (req, res) => {
  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  // const query = `select ${COLUMNS.join(', ')} from users`;
  const query = `select ${COLUMNS.join(", ")} from users where department="${
    req.query.department
  }"`;
  const r = db.exec(query);
  console.log(req.query);

  // TODO we could maybe split he data here per org
  // TODO Consider decimating the data per org, e.g.
  // interdependent of the length(users) we send
  // max. 1000 etc. (configurable) points out which
  // will be visually descriptive of the underlying data
  if (r[0]) {
    res.json(processData(r[0], COLUMNS));
  } else {
    res.json([]);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

// app.get("/api/users?:department", async (req, res, users) {
//   const users = await res.send('user' + req.params.department);
//     if (!users) {
//       res.status(404).send("no users in this deparment");
//     }
//   res.json(users);
// });
