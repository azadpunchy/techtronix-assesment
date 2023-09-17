const { test, expect } = require("@playwright/test");
const { default: methods } = require("./methods");
const { default: variables } = require("./variables");

test.describe(
  ("technotrix assesment",
  () => {
    test("Scenario 1", async ({ page }) => {
      // Open the Upwork website
      await page.goto("https://www.upwork.com/");

      // Click on the "Log In" link
      await page.click("text=Log In");

      // Enter an invalid email address
      await page
        .locator("#login_username")
        .fill(`${variables.incorrect_email}`);

      // Click the "Continue with Email" button
      await page.click("text=Continue with Email");
      await methods.wait(2000);

      // Wait for the error message to appear
      const errorMessage = await page
        .locator("css=#username-message span")
        .textContent();

      // Validate that the error message is displayed
      expect(errorMessage).toBe("Oops! Username is incorrect.");
    });

    test("Scenario 2", async ({ page }) => {
      // Open the Upwork website
      await page.goto("https://www.upwork.com/");

      // Click on the "Log In" link
      await page.click("text=Log In");

      // Click on the "Continue with Email" button
      await page.click("text=Continue with Email");

      // custom wait with promise for 2secs
      await methods.wait(200);

      // assertion to verify 'Please fix the errors below' message
      await expect(page.locator(".air3-alert-content")).toHaveText(
        "Please fix the errors below."
      );
      // custom wait with promise for 2secs
      await methods.wait(200);

      // assertion to verify 'This field is required' message
      await expect(page.locator("#username-message")).toHaveText(
        "This field is required"
      );

      // await page.screenshot({ path: "upwork_login_error.png" });
    });

    test("Scenario 3", async ({ page }) => {
      test.setTimeout(60 * 5 * 1000);

      await page.goto("https://www.upwork.com/");

      // enter email address
      await page.getByRole("link", { name: "Log in" }).click();
      await page.getByPlaceholder("Username or Email").click();
      await page
        .getByPlaceholder("Username or Email")
        .fill(`${variables.test_email}`);

      // enter password
      await methods.wait(500);
      await page.getByRole("button", { name: "Continue with Email" }).click();
      await page.getByRole("textbox", { name: "Password" }).fill("womelib650@");

      // press login button
      await page.getByRole("button", { name: "Log in" }).click();
      await methods.wait(5000);

      // closing popup appears after login
      const closeBtn = await page.locator(`${variables.closwBtnPath}`)
        .textContent;

      if (closeBtn) {
        await page.locator(`${variables.closwBtnPath}`).click();
      }

      await methods.wait(500);

      // search QA Automation in search bar
      await page
        .locator("xpath=//div/nav/ul/li[5]/div/form/div/input[2]")
        .click();
      await methods.wait(200);

      await page
        .locator("xpath=//div/nav/ul/li[5]/div/form/div/input[2]")
        .fill("QA Automation");
      await methods.wait(1000);
      await page.keyboard.press("Enter");

      // click on 2nd section of search result (QA Automation)
      await page
        .locator("xpath=//div[@data-test='job-tile-list']/section[2]")
        .click();
      await methods.wait(5000);

      // navigate to 2nd search result detailed page
      const element = await page.$(`${variables.applyNow}`);
      await methods.wait(2000);
      const baseURL = "https://www.upwork.com";
      let endPoints = await element.getAttribute("href");

      await page.goto(`${baseURL}${endPoints}`);

      // click on apply now to send a proposal
      await page.getByRole("button", { name: "Apply Now" }).click();
      await methods.wait(2000);

      // send proposal without entering any detail
      await page.locator("xpath=//div[2]/footer/div/button[1]").hover();
      await methods.wait(1000);
      await page.locator("xpath=//div[2]/footer/div/button[1]").click();

      // validating error message
      let submitProposalErrorText = await page
        .locator("xpath=//div[@data-test='alert-content']/div[2]/p")
        .textContent();
      expect(submitProposalErrorText).toBe("Please fix the errors below");

      //--------------------------------END-----------------------------------------------
    });
  })
);
