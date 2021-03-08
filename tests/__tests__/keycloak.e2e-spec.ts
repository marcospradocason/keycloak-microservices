import { Builder, By, until,Condition, Key, Capabilities, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import * as Keycloak from 'keycloak-connect';
import * as session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
//import * as chromedriver from "chromedriver";

// const chromeCapabilities = Capabilities.chrome();
// chromeCapabilities.set('chromeOptions', {
//   binary: chromedriver.path,
//   'args': [
//     '--headless',
//     '--window-size=800,600',
//     '--disable-gpu',
//     '--whitelisted-ips=',
//     '--no-sandbox',
//     '--disable-extensions'
//   ]
// });

const options = new Options();

options
  // .addArguments('--no-sandbox')
  //.addArguments('--disable-dev-shm-usage')

  .addArguments("--disable-gpu")
  .addArguments("--headless")
  .addArguments("--window-size=1920,1080")
  .addArguments("--enable-javascript")
  .addArguments("--ignore-certificate-errors");
//.setChromeBinaryPath(chromedriver.path)
// .headless()
// .addArguments('--whitelisted-ips')
//.addArguments('--whitelisted-ips=')
//.addArguments('--allowed-ips=');
//.addArguments('--disable-infobars');

// chrome.setDefaultService(service);

describe("validate themes", () => {
  let driver: WebDriver;
  beforeEach(async (done) => {
    driver = await new Builder()
      .forBrowser("chrome")
      //.withCapabilities(chromeCapabilities)
      .setChromeOptions(options)
      .usingServer("http://selenium:4444/wd/hub")
      .build();
  }, 20000);
  afterEach(async (done) => {
    await driver.quit();
  }, 10000);

  // test("validate codeflix theme", async () => {
  //     await driver.get("http://app:8080/auth/admin/codeflix-test/console/");
  //     await driver.sleep(2000);
  //     await driver.wait(until.elementLocated({xpath: "//span[text()='Log In']"}), 5000);
  //     await driver.wait(until.elementLocated({className: "MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock"}));
  // }, 10000);

  test("validate codeflix theme", async () => {
      const memoryStore = new session.MemoryStore();
      const keycloak = new Keycloak({store: memoryStore}, {
        realm: "test", 
        resource: "theme1", 
        "auth-server-url": "http://app:8080/auth/",
        "ssl-required": "external",
        "confidential-port": 0
      });
      const loginUrl = keycloak.loginUrl(uuidv4(), 'http://localhost:8000');
      await driver.get(loginUrl);
      await driver.sleep(2000);
      await driver.wait(until.elementLocated({xpath: "//span[text()='Log In']"}), 5000);
      await driver.wait(until.elementLocated({className: "MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock"}));
  }, 10000);
});