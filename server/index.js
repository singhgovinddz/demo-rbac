const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require("express-oauth2-jwt-bearer");
const authConfig = require("../src/auth_config.json");

const { todosRouter } = require("./todos/todos.router");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");

const app = express();

// const mongoose = require('mongoose');
// ​
// mongoose.connect('mongodb+srv://priyankasheoran:decipherzone123@cluster0.dszvra0.mongodb.net/sample_weatherdata')
//   .then(() => console.log('Database is Connected!'))
//   .catch(() => console.log('Error'))


const apiRouter = express.Router();

app.use(express.json());

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

app.use("/api", apiRouter);

apiRouter.use("/todos", todosRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => console.log(`API Server listening on port ${port}`));
