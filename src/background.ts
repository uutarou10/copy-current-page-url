import browser from "webextension-polyfill";

browser.commands.onCommand.addListener(async (command) => {
  if (command === "copy-clean-url") {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab?.id) {
      try {
        await browser.tabs.sendMessage(tab.id, { action: "copy-clean-url" });
      } catch (error) {
        console.error("Failed to send message to content script:", error);
      }
    }
  }
});
