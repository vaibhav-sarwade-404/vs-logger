import { Logger } from "../src/index";
test("My Logger", () => {
  const logger = Logger.getInstance("info");
  const log = logger.getLogger();
  log.info("testing");
  const log2 = logger.getLogger("methodName");
  log2.info("testing");
  process.env.VS_LOGGER_LEVEL = "debug";
  const logger2 = Logger.getInstance();
  const log3 = logger2.getLogger("testing");
  log3.debug(`Something`);
  expect(true).toBe(true);
});
