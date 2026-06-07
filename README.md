# ShadowState 🌐

### Local-First Sync Engine & Interactive Blueprint Workspace

ShadowState is a high-performance, decentralized, local-first application designed for real-time collaborative map and blueprint telemetry. Built entirely on a peer-to-peer (P2P) mesh networking matrix, it enables multiple devices to orchestrate, drop, and synchronize data points interactively—even when completely disconnected from the traditional internet.

---

## ⚡ Core Technical Architecture

The system avoids a centralized server framework, opting instead for a resilient edge-computed network architecture using three core technological pillars:

1. **Conflict-Free Replicated Data Types (CRDTs):** Powered by **Yjs**, state mutations across grid nodes are automatically resolved at the mathematical layer, eliminating merge conflicts during concurrent mutations across tabs or devices.
2. **Offline-First Persistence Storage:** Powered by **IndexedDB (`y-indexeddb`)**, state histories are securely cached locally within the client's browser context. The application boots instantaneously and functions without any active server connection.
3. **Decentralized P2P Mesh Network Transport:** Powered by **WebRTC (`y-webrtc`)**, browsers discover and connect to neighbors on the same network node to directly swap telemetry frames without intermediate server clouds.

---

## 🚀 Key Features

* **Interactive Tactical Mesh Grid:** Click anywhere across the dark blueprint matrix to drop geo-referenced tracking sensors and operational nodes synchronously.
* **Shared Session Ledger Logs:** A real-time timeline ledger tracking data points, sequence timelines, and data state histories directly inside the dashboard sidebar.
* **Network Operations Panel:** Integrates structural diagnostic metrics tracking peer topology, online/offline mesh status, and a manual "Heal Mesh" network pipeline recovery layout switch.
* **Zero-Block Main Execution Thread:** State management flows asynchronously to ensure slow connectivity or high latency environments never freeze UI frame renders or network heartbeats.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 + TypeScript
* **Build System & Tooling:** Vite + Tailwind CSS
* **Decentralized State Layer:** Yjs
* **Persistence Layer:** `y-indexeddb`
* **Transport Protocol Layer:** `y-webrtc`
* **Icon Infrastructure:** Lucide React

---

## 💻 Getting Started Locally

### Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your system.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/atharvapatil0426-boop/shadowstate2.git](https://github.com/atharvapatil0426-boop/shadowstate2.git)
   cd shadowstate2
