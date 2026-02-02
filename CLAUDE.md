# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with this repository.

## Project Overview

Chrome extension that copies the current page URL to clipboard with tracking parameters removed. Triggered by keyboard shortcut (Cmd+Shift+C on Mac, Ctrl+Shift+C on Windows/Linux).

## Tech Stack

- TypeScript
- Vite + vite-plugin-web-extension
- webextension-polyfill
- Chrome Extension Manifest V3

## Project Structure

```
/
├── manifest.json       # Extension manifest (Manifest V3)
├── src/
│   ├── background.ts   # Service Worker - handles Commands API
│   └── content.ts      # Content Script - URL cleaning, clipboard, toast UI
├── dist/               # Build output (load this in Chrome)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Architecture

```
[User: Cmd+Ctrl+C]
       ↓
[Chrome Commands API]
       ↓
[background.ts: command event]
       ↓ (chrome.tabs.sendMessage)
[content.ts: message received]
       ↓
[Clean URL → Copy to clipboard → Show toast]
```

## Common Commands

```bash
pnpm install     # Install dependencies
pnpm dev         # Watch mode (auto-rebuild on change)
pnpm build       # Production build
pnpm typecheck   # TypeScript type checking
```

## Key Implementation Details

### Tracking Parameter Removal

Tracking parameters are defined as regex patterns in `src/content.ts` (`TRACKING_PARAM_PATTERNS`). To add new tracking parameters, add a new regex pattern to this array.

### Message Protocol

Background script sends: `{ action: "copy-clean-url" }`
Content script handles this message and performs the copy operation.

### Toast Notification

The toast is injected directly into the page DOM with inline styles. It uses `z-index: 2147483647` (max value) to ensure visibility. Auto-dismisses after 2 seconds with fade animation.

## Testing Changes

1. Run `pnpm build` or `pnpm dev`
2. Go to `chrome://extensions`
3. Click refresh icon on the extension
4. Test on any webpage with tracking parameters (e.g., `?utm_source=test&fbclid=abc`)
