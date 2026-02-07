# Text Util Extension

A powerful and simple Chrome Extension to manage, organize, and sync frequently used text snippets across all your devices using your Google account.

Built for the **Boksepyunsal** organization.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- **Cross-Device Sync**: Automatically syncs your snippets across all Chrome browsers where you are logged in (uses `chrome.storage.sync`).
- **Smart Categorization**: Organize snippets into custom categories (e.g., "Work", "Personal", "IDs") for quick access.
- **One-Click Copy**: Instantly copy text to your clipboard with a single click.
- **Search**: Real-time search by title or content.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS.

## 🛠 Tech Stack

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Platform**: Chrome Extension Manifest V3

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation (For Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Boksepyunsal/text-util-extension.git
   cd text-util-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```
   This will create a `dist` directory containing the compiled extension.

4. **Load into Chrome**
   - Open Chrome and navigate to `chrome://extensions`.
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the `dist` directory from this project.

## 📦 Build for Production

To create a production build (minified and optimized):

```bash
npm run build
```

Then zip the contents of the `dist` folder to submit to the Chrome Web Store or share manually.

## 📂 Project Structure

```
.
├── src/
│   ├── lib/          # Storage logic (Chrome sync wrapper)
│   ├── types.ts      # TypeScript definitions
│   ├── App.tsx       # Main UI Component
│   └── main.tsx      # Entry point
├── public/
│   └── manifest.json # Chrome Extension Manifest V3
├── dist/             # Build output (Load this folder in Chrome)
└── vite.config.ts    # Vite configuration
```

## 🤝 Contribution

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add some NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---
Developed by **Boksepyunsal**.