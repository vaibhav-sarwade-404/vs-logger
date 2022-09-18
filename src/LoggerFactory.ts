import { LOG_LEVEL_TYPES } from "./types/LoggerTypes";
import constants from "./utils/constants";
import { dateFormat } from "./utils/dateUtils";

const getDefaultLogLevel = (): LOG_LEVEL_TYPES =>
  (process.env.VS_LOGGER_LEVEL || "info").toLowerCase() === "debug"
    ? "debug"
    : "info";
const { CONSOLE_COLORS, LOG_LEVEL_COLOR, LOG_LEVEL } = constants;

class Logger {
  private _logLevel: LOG_LEVEL_TYPES;
  private loggerName: string;
  constructor(
    _logLevel: LOG_LEVEL_TYPES = getDefaultLogLevel(),
    loggerName?: string
  ) {
    this._logLevel = _logLevel;
    this.loggerName = loggerName || "";
  }

  private formatMsg(
    msg: string[],
    _logLevel: LOG_LEVEL_TYPES = this._logLevel,
    msgColor: string = LOG_LEVEL_COLOR[LOG_LEVEL.info]
  ): string {
    //prettier-ignore
    return `[${dateFormat()}] ${CONSOLE_COLORS.green}${_logLevel.toUpperCase()}${CONSOLE_COLORS.reset}:${msgColor}${this.loggerName ? ` ${this.loggerName}:` : ""} ${msg.join("")}${CONSOLE_COLORS.reset}`;
  }

  getLoggerName() {
    return this.loggerName;
  }

  info(...msg: string[]) {
    console.log(this.formatMsg(msg, "info"));
  }
  warn(...msg: string[]) {
    console.warn(this.formatMsg(msg, "info", CONSOLE_COLORS.yellow));
  }
  error(...msg: string[]) {
    console.error(this.formatMsg(msg, "info", CONSOLE_COLORS.red));
  }
  debug(...msg: string[]) {
    if (this._logLevel?.toLowerCase() !== LOG_LEVEL.debug) return;
    console.log(this.formatMsg(msg), "debug");
  }
  cyan(...msg: string[]) {
    console.log(this.formatMsg(msg), "info", CONSOLE_COLORS.cyan);
  }
  red(...msg: string[]) {
    console.log(this.formatMsg(msg), "info", CONSOLE_COLORS.red);
  }
  green(...msg: string[]) {
    console.log(this.formatMsg(msg), "info", CONSOLE_COLORS.green);
  }
  yellow(...msg: string[]) {
    console.log(this.formatMsg(msg), "info", CONSOLE_COLORS.yellow);
  }
}

/**
 * Logger to use when method names are required in log along with msg.
 *
 * Eg:
 * import { Logger } from "vs-logger";
 * const logger = Logger.getInstance("info");
 * const log = Logger.getLogger("methodName");
 * log.info(`some msg`);
 *
 * output: [2022-8-20 T14:42:1:740 UTC+02:00] INFO: methodName: some msg
 *
 * const log2 = Logger.getLogger();
 * log2.info(`some msg`);
 *
 * output: [2022-8-20 T14:42:1:740 UTC+02:00] INFO: some msg
 *
 * // Control log level with env variable
 * process.env.VS_LOGGER_LEVEL="info";
 *
 * const logger = Logger.getInstance();
 * const log = Logger.getLogger("MethodName");
 * log.info(`some msg`);
 *
 * output: [2022-8-20 T14:42:1:740 UTC+02:00] INFO: methodName: some msg
 */
class LoggerFactory {
  private static _logLevel: LOG_LEVEL_TYPES = "info";
  private static loggerInstance: LoggerFactory;

  private constructor(__logLevel: LOG_LEVEL_TYPES = getDefaultLogLevel()) {
    LoggerFactory._logLevel = __logLevel;
  }

  public static getInstance(
    _logLevel: LOG_LEVEL_TYPES = getDefaultLogLevel()
  ): LoggerFactory {
    if (LoggerFactory.loggerInstance && LoggerFactory._logLevel === _logLevel) {
      return LoggerFactory.loggerInstance;
    }
    LoggerFactory.loggerInstance = new LoggerFactory(_logLevel);
    return LoggerFactory.loggerInstance;
  }

  public getLogger(loggerName?: string): Logger {
    return new Logger(LoggerFactory._logLevel, loggerName);
  }
}

export default LoggerFactory;
