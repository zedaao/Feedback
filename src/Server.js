import express from "express";
import bodyParser from "body-parser";
import { tasksRouter } from "./routes/tasks.rout.js";

export class Server {
  constructor(port) {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
    this.listen(port);
  }

  setMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  setRoutes() {
    this.app.use(express.static("public"));
    this.app.use("/tasks/api", tasksRouter);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log("App start. Listen at port" + port);
    });
  }
}
