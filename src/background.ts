import browser from "webextension-polyfill";

async function copyCleanUrl() {
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

// ショートカットキー
browser.commands.onCommand.addListener(async (command) => {
  if (command === "copy-clean-url") {
    await copyCleanUrl();
  }
});

// ツールバーボタンクリック
browser.action.onClicked.addListener(async () => {
  await copyCleanUrl();
});
