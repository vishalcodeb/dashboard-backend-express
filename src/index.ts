require("dotenv").config();

import * as http from "http";
import { app } from "./app";
import { DatabaseService } from "./app/services/databaseService";
import { Logger } from "./lib/logger";

const logger: any = new Logger();

DatabaseService.getConnection().then(() => {
  const server = http
    .createServer(app)
    .listen(parseInt(process.env.PORT || "3000", 10));
  server.on("listening", async () => {
    logger.log("info", `Server running on ${process.env.PORT}`);
  });
});
