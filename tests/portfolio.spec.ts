import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const caseStudies = [
  { slug: "industrial-rag", title: "From manuals to answers" },
  { slug: "food-beverage-lakehouse", title: "A clearer picture of performance" },
  { slug: "aviation-etl", title: "Built for data at altitude" },
];
const email = "pandrajuisaac@outlook.com";

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, `Document overflows: ${JSON.stringify(dimensions)}`)
    .toBeLessThanOrEqual(dimensions.viewport + 1);
  expect(dimensions.body, `Body overflows: ${JSON.stringify(dimensions)}`)
    .toBeLessThanOrEqual(dimensions.viewport + 1);
}

test("homepage exposes selected work, real contact links, and no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Isaac Pandraju.*Senior Data Engineer/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("real impact");

  for (const section of ["work", "experience", "expertise", "contact"]) {
    await expect(page.locator(`#${section}`)).toBeAttached();
  }
  for (const project of caseStudies) {
    await expect(page.getByRole("link", { name: `Read case study: ${project.title}` }))
      .toHaveAttribute("href", `/work/${project.slug}`);
  }

  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: email, exact: true }))
    .toHaveAttribute("href", `mailto:${email}`);
  await expect(footer.getByRole("link", { name: "LinkedIn", exact: true }))
    .toHaveAttribute("href", "https://www.linkedin.com/in/isaacpandraju");
  await expect(footer.getByRole("link", { name: "GitHub", exact: true }))
    .toHaveAttribute("href", "https://github.com/Mr18-IsaacCodes");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.getByRole("heading", { level: 2 })).toBeVisible();
  expect(errors).toEqual([]);
});

for (const [index, project] of caseStudies.entries()) {
  test(`case study ${project.slug} renders and links to the next project`, async ({ page }) => {
    const response = await page.goto(`/work/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${project.title} | Isaac Pandraju`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(project.title);
    await expect(page.getByRole("heading", { name: "The challenge" })).toBeVisible();
    await expect(page.getByRole("list", { name: "Project technologies" })).toBeAttached();

    const next = caseStudies[(index + 1) % caseStudies.length];
    await page.getByRole("link", { name: new RegExp(`NEXT CASE STUDY.*${next.title}`, "i") }).click();
    await expect(page).toHaveURL(`/work/${next.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(next.title);
    await page.getByRole("link", { name: "All selected work" }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.locator("#work")).toBeInViewport();
  });
}

test("unknown projects return a proper 404 with a working recovery link", async ({ page }) => {
  const response = await page.goto("/work/not-a-real-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn’t");
  await page.getByRole("link", { name: "Explore selected work" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("the resume is a real downloadable PDF", async ({ page, request }) => {
  const response = await request.get("/Isaac_Pandraju_Data_Engineer.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");

  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("banner").getByRole("link", { name: "Resume", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Isaac_Pandraju_Data_Engineer.pdf");
  expect(await download.failure()).toBeNull();
});

test("desktop navigation reaches every home section from a case study", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/industrial-rag");
  const navigation = page.getByRole("navigation", { name: "Main navigation", exact: true });

  for (const label of ["Work", "Experience", "Expertise", "Contact"]) {
    await navigation.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/\\#${label.toLowerCase()}$`));
    await expect(page.locator(`#${label.toLowerCase()}`)).toBeInViewport();
  }
});

test("mobile navigation contains keyboard focus, closes on Escape and anchor navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  const dialog = page.getByRole("dialog", { name: "Navigation", exact: true });

  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const closeButton = dialog.getByRole("button", { name: "Close navigation menu" });
  const resumeLink = dialog.getByRole("link", { name: "Download resume" });
  await closeButton.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(resumeLink).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.click();
  await dialog.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();

  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main navigation", exact: true })).toBeVisible();
});

test("theme choice persists across reloads and client navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);

  await page.reload();
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await page.getByRole("link", { name: `Read case study: ${caseStudies[0].title}` }).click();
  await expect(page).toHaveURL("/work/industrial-rag");
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
});

test("copy email writes the contact address to the clipboard and confirms success", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Copied!");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
});

for (const width of [375, 768, 1440]) {
  for (const theme of ["light", "dark"] as const) {
    test(`${theme} theme at ${width}px stays readable with reduced motion and no horizontal overflow`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });

      for (const path of ["/", ...caseStudies.map((project) => `/work/${project.slug}`)]) {
        await page.goto(path);
        await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
        const heading = page.getByRole("heading", { level: 1 });
        await expect(heading).toBeVisible();
        await expect(heading).toBeInViewport();
        await expectNoHorizontalOverflow(page);

        await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
        await expect(page.getByRole("contentinfo").getByRole("heading", { level: 2 })).toBeVisible();
        await expectNoHorizontalOverflow(page);

        const hiddenHeadings = await page.getByRole("heading").evaluateAll((headings) => headings.filter((headingElement) => {
          let element: Element | null = headingElement;
          while (element) {
            const style = getComputedStyle(element);
            if (style.opacity === "0" || style.visibility === "hidden") return true;
            element = element.parentElement;
          }
          return false;
        }).map((headingElement) => headingElement.textContent));
        expect(hiddenHeadings, "Reduced motion must not leave content hidden").toEqual([]);

        if (path === "/") {
          await page.screenshot({ path: testInfo.outputPath(`home-${theme}-${width}.png`), fullPage: true });
        }
      }
    });
  }
}
