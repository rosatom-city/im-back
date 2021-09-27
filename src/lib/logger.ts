import chalk from "chalk";
import { DateTime } from "luxon";

export default class Logger {
  static debug(message?: any, startDuration?: Date) {
    Logger.log("debug", Logger.duration(startDuration), chalk.gray(message));
  }
  static info(message?: any, startDuration?: Date) {
    Logger.log("info", Logger.duration(startDuration), chalk.green(message));
  }
  static warn(message?: any, startDuration?: Date) {
    Logger.log("warn", Logger.duration(startDuration), chalk.keyword("orange")(message));
  }
  static error(message?: any, startDuration?: Date) {
    Logger.log("error", Logger.duration(startDuration), chalk.bold.red(message));
  }

  private static duration(start: Date): string {
    if (!start) return ``;
    const zeroPad = (num, places) => String(num).padStart(places, "0");
    let ms = new Date().getTime() - start.getTime();
    let sec = Math.floor(ms / 1000); ms -= sec * 1000;
    let m = Math.floor(sec / 60); sec -= m * 60;
    let h = Math.floor(m / 60); m -= h * 60;
    return ` [${zeroPad(h, 2)}:${zeroPad(m, 2)}:${zeroPad(sec, 2)}.${zeroPad(ms, 3)} мс]`;
  }

  private static log(label: string, duration: string, message: string) {
    let logger = console.log;
    let color = chalk.green;
    switch (label) {
      case "debug":
        color = chalk.grey;
      case "warn":
        logger = console.warn;
        color = chalk.keyword("orange");
        break;
      case "error":
        logger = console.error;
        chalk.bold.red
        break;
    }
    logger(color(`[${DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS")}] [${label.toLocaleUpperCase()}]${duration}: ${message}`));
  }
}