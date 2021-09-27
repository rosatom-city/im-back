import http from "http";
import { Server, Socket } from "socket.io";
import Logger from "../lib/logger";

export default class IO {
  private static _instance: IO = null;
  static get instance() {
    if (!IO._instance) IO._instance = new IO();
    return IO._instance;
  }

  private io: Server;

  private constructor() { }

  config(server: http.Server) {
    this.io = new Server(server);
    return this;
  }

  run() {
    if (!this.io) throw new Error("IO server is not configured");
    this.io.on("connection", (socket: Socket) => {
      Logger.info(`[SOCKET]: user connected !!!`);
    });
  }

  emit(event: string, data: any): boolean {
    Logger.debug(`[SOCKET] [EMIT] [${event}]: ${JSON.stringify(data)}`);
    this.io.emit(event, data);
    return true;
  }
}