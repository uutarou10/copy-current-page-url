import browser from "webextension-polyfill";

const TRACKING_PARAM_PATTERNS: RegExp[] = [
  // Google Analytics (utm_で始まる全パラメータ)
  /^utm_/,
  // Google Analytics 内部パラメータ
  /^_ga/,
  /^_gl/,
  // Google Ads
  /^gclid$/,
  /^gclsrc$/,
  // Facebook
  /^fbclid$/,
  /^fb_/,
  // Microsoft Ads
  /^msclkid$/,
  // Twitter
  /^twclid$/,
  // Instagram
  /^igshid$/,
  // Mailchimp
  /^mc_/,
  // その他一般的なトラッキング
  /^ref$/,
  /^source$/,
  /^campaign$/,
];

function isTrackingParam(paramName: string): boolean {
  return TRACKING_PARAM_PATTERNS.some((pattern) => pattern.test(paramName));
}

function cleanUrl(urlString: string): string {
  const url = new URL(urlString);
  const paramsToDelete: string[] = [];

  url.searchParams.forEach((_, key) => {
    if (isTrackingParam(key)) {
      paramsToDelete.push(key);
    }
  });

  paramsToDelete.forEach((key) => url.searchParams.delete(key));

  return url.toString();
}

function showToast(message: string): void {
  const existingToast = document.getElementById("copy-url-toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.id = "copy-url-toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 16px;
    right: 16px;
    background-color: #333;
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
    z-index: 2147483647;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  `;

  document.body.appendChild(toast);

  // フェードイン
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  // 2秒後にフェードアウトして削除
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 200);
  }, 2000);
}

async function copyCleanUrl(): Promise<void> {
  const cleanedUrl = cleanUrl(window.location.href);

  try {
    await navigator.clipboard.writeText(cleanedUrl);
    showToast("✓ URL copied!");
  } catch (error) {
    console.error("Failed to copy URL:", error);
    showToast("✗ Failed to copy URL");
  }
}

interface Message {
  action: string;
}

function isValidMessage(message: unknown): message is Message {
  return (
    typeof message === "object" &&
    message !== null &&
    "action" in message &&
    typeof (message as Message).action === "string"
  );
}

browser.runtime.onMessage.addListener((message: unknown) => {
  if (isValidMessage(message) && message.action === "copy-clean-url") {
    copyCleanUrl();
  }
});
