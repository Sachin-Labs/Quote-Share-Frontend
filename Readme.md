# SINA Quotes Client

An interactive, responsive frontend portal built with **React**, **Redux Toolkit**, and **Vite** for the SINA Quotes ecosystem.

## 🚀 Key Features

* **Overview Dashboard**:
  * Real-time statistics cards indicating personal counts for *Total*, *Pending*, *Approved*, and *Rejected* quotes.
  * Segmented filter pills to toggle list views instantly.
  * Server-side paginated tables supporting keyword searches and sorting criteria.
* **Immersive Write Quote Editor**:
  * Split-pane desktop design: editing form on the left, sticky browser preview mockup card on the right.
  * Live-synced typography updates and social media connection validation.
  * Visual preset avatar strip with direct local file upload integration.
* **Admin Review Queue**:
  * Complete moderating interface for administrators to approve, reject, or comment on pending quotes.
* **Responsive Design**:
  * Fluid margins, flex shrink protections, and dynamic stacking layouts for tablet and mobile viewports.
* **Dark Mode**:
  * Premium global theme toggling with custom styling tokens.

## 🛠️ Technology Stack

* **Core**: React 19, React Router 7, Vite
* **State Management**: Redux Toolkit (slices for user, quotes)
* **Styling**: Vanilla CSS with modern custom properties and typography rules
* **HTTP Client**: Axios (configured for credentialed requests)
* **Icons**: Lucide React

## 📦 Getting Started

### 1. Prerequisites
Ensure you have Node.js (version 18 or higher) and npm installed.

### 2. Environment Configuration
Create a `.env` file in the root of the client directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api/
```

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Development Server
Run the local dev server:
```bash
npm run dev
```
The client app should spin up on `http://localhost:5173/`.

### 5. Production Build
Compile the optimized production bundle:
```bash
npm run build
```
The static assets will compile into the `dist/` directory.

## 📁 Project Directory Structure

```text
├── public/                 # Static asset public directory
└── src/
    ├── components/         # Reusable application Shells, Toggles, etc.
    ├── layouts/            # Page layouts wrapper components
    ├── pages/              # Routing views: Dashboard, Quotes, Admin, Settings, Auth
    ├── protectedRoute/     # Authentication routing wrappers
    ├── slice/              # Redux slices for global state management
    ├── store/              # Redux Toolkit configuration store
    ├── styles/             # Global variables and page-specific styles
    └── utils/              # Client utility functions
```
