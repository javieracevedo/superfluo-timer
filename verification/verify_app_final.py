from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Wait for Vite to start
            page.goto("http://localhost:5173")

            # Wait for main elements to be visible
            page.wait_for_selector("#app-container")
            page.wait_for_selector("h1")
            page.wait_for_selector("#timer")
            page.wait_for_selector("twisty-player")

            # Take a screenshot
            page.screenshot(path="verification/app_screenshot_final.png")
            print("Screenshot taken successfully")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app()
