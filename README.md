# Awesome Shop, a shopping list 🛒

<p align="left">
  <!-- Expo -->
  <img src="https://img.shields.io/badge/Expo-54.0.31-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo Badge" />
  <!-- React Native -->
  <img src="https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native Badge" />
  <!-- React -->
  <img src="https://img.shields.io/badge/React-19.1.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge" />
  <!-- TypeScript -->
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge" />
  <!-- AsyncStorage -->
  <img src="https://img.shields.io/badge/AsyncStorage-2.2.0-6DB33F?style=for-the-badge&logo=android&logoColor=white" alt="AsyncStorage Badge" />
</p>


---

Comprar is a simple shopping list app built with **React Native** and **Expo**.  
It lets you add items you need to buy, mark them as done, filter between pending and completed items, and persist everything locally using **AsyncStorage**.

---

## Table of Contents

- [Features](#features)
- [Screens](#screens)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Storage Behavior](#storage-behavior)
- [Available Scripts](#available-scripts)
- [TODO / Improvements](#todo--improvements)
- [License](#license)

---

## Features

- Add items with a text description.
- Item list filtered by status:
  - **Pending** items (things you still need to buy).
  - **Done** items (things already purchased).
- Toggle an item’s status between **pending** and **done**.
- Remove a single item from the list.
- Clear the entire list with a confirmation dialog.
- Persistent storage using `@react-native-async-storage/async-storage` so your list survives app restarts.
- Clean UI with reusable components (`Button`, `Input`, `Filter`, `Item`, `StatusIcon`).

---

## Screens

### Home

File: `src/app/Home/index.tsx`

Main functionalities:

- Text input for the item description.
- **Add** button to create a new item:
  - Validates that the description is not empty.
  - Automatically sets the new item to `pending`.
- Filter buttons:
  - Switch between **Pending** and **Done** items.
  - The list refreshes according to the selected filter.
- **Clear** button:
  - Shows a confirmation alert before wiping all items.
- Item list:
  - Shows all items that match the current filter.
  - Each item:
    - Can toggle its status (pending/done).
    - Can be removed individually.
- Empty state:
  - Displays `"Empty list."` when there are no items for the current filter.

---

## Tech Stack

- **React Native** `0.81.5`
- **React** `19.1.0`
- **Expo** `~54.0.31`
- **TypeScript** `~5.9.2`
- **AsyncStorage**
  - `@react-native-async-storage/async-storage`
- **UI & Icons**
  - `lucide-react-native` (for icons)
  - Custom components under `src/components`
- **Tooling**
  - `eslint` for linting

---

## Project Structure

Main relevant folders and files:

- `app.json`  
  Expo configuration.

- `index.ts`  
  App entry point (Expo).

- `src/app/Home/`
  - `index.tsx` – Home screen (main screen with list, filters, add/clear logic).
  - `styles.ts` – Styles for the Home screen.

- `src/components/`
  - `Button/` – Button component.
  - `Input/` – Text input component.
  - `Filter/` – Filter chip/button to select status.
  - `Item/` – List item component (description + status + actions).
  - `StatusIcon/` – Icon representing item status.

- `src/storage/`
  - `itemsStorage.ts` – Storage layer using AsyncStorage.
    - `ItemStorage` type
    - `ItemsStorage.get`
    - `ItemsStorage.getByStatus`
    - `ItemsStorage.add`
    - `ItemsStorage.remove`
    - `ItemsStorage.clear`
    - `ItemsStorage.toggleStatus`

- `src/types/`
  - `FilterStatus.ts` – Enum defining filter and item statuses:
    - `FilterStatus.PENDING = "pending"`
    - `FilterStatus.DONE = "done"`

- `src/assets/`
  - `logo.png`, `logo@2x.png`, `logo@3x.png` – app logo.
  - `icon.png`, `adaptive-icon.png`, `splash-icon.png`, `favicon.png` – assorted app icons.

---

## Getting Started

### Prerequisites

Make sure you have:

- **Node.js** (LTS is recommended).
- **npm** (or another package manager such as `yarn`/`pnpm`).
- **Expo CLI** (optional but recommended for development):
  ```bash
  npx expo --version
  ```
- A device or emulator:
  - Android: Android emulator or physical device with Expo Go.
  - iOS: Xcode simulator or physical device with Expo Go (macOS).

### Installation

1. Clone this repository and go into the project directory:
   ```bash
   cd comprar
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   # yarn
   # pnpm install
   ```

### Running the Project

Start the Expo development server:

```bash
# Start the Metro bundler
npm start

# Or run directly on each platform:
npm run android
npm run ios
npm run web
```

- **Android**: Press `a` in the terminal or scan the QR code with Expo Go.
- **iOS**: Press `i` in the terminal (macOS) or use Expo Go on a physical device.
- **Web**: Press `w` to open in the browser.

---

## Storage Behavior

All items are stored locally on the device using **AsyncStorage** with the key:

```ts
const ITEMS_STORAGE_KEY = "@comprar:items";
```

Operations:

- `get()`  
  Loads all stored items.

- `getByStatus(status)`  
  Returns items filtered by `FilterStatus.PENDING` or `FilterStatus.DONE`.

- `add(newItem)`  
  Appends a new item and saves the updated list.

- `remove(id)`  
  Filters out an item by `id` and persists the new list.

- `clear()`  
  Empties the list completely.

- `toggleStatus(id)`  
  Toggles an item’s `status` between `pending` and `done`, then saves.

If something goes wrong during storage operations, the functions throw errors with descriptive prefixes such as `GET_ITEMS`, `ITEMS_SAVE`, `ITEMS_ADD`, `ITEMS_REMOVE`, `ITEMS_CLEAR`.

---

## Available Scripts

From `package.json`:

```json
"scripts": {
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
}
```

Usage:

- `npm start` – Start Expo dev server.
- `npm run android` – Start Expo targeting Android.
- `npm run ios` – Start Expo targeting iOS.
- `npm run web` – Start Expo in a web browser.

