Here is a production-ready, highly professional `README.md` tailored specifically for a hackathon submission. It emphasizes your project's technical depth, explains the underlying local-first architecture, and provides clear verification steps for judges to test its offline capabilities.

---

```markdown
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

```

2. Install dependencies:
```bash
npm install

```


3. Spin up the development server:
```bash
npm run dev

```



---

## 🌐 Setting Up Offline Multi-Device P2P Demo (For Judges)

To showcase the offline peer-to-peer syncing capabilities during presentation evaluations across two separate physical machines (e.g., your laptop and a tablet/phone), use this localized networking approach:

### Step 1: Establish Local Mesh Link

Connect both devices to the same network access point or mobile hotspot. *Note: An active internet connection is not required; devices only need to occupy the same local subnet.*

### Step 2: Fire Up Local WebRTC Signaling Discovery

WebRTC requires a lightweight negotiation framework to introduce peers before they hand off connection pipelines directly. Launch a local discovery module on your host server machine:

```bash
npx y-webrtc

```

*This starts a local discovery channel on port `4444` (`ws://localhost:4444`).*

### Step 3: Find Your Local Host IP Address

Obtain your host computer's local IP address:

* **Windows (CMD):** Run `ipconfig` (Look for your `IPv4 Address`, e.g., `192.168.1.45`).
* **Mac/Linux (Terminal):** Run `ifconfig` or `ip a` (Look for the `inet` line under `en0` or `wlan0`).

### Step 4: Expose the Frontend App onto the Network

Launch your application with the external host flag exposed so other devices can log into your frontend server:

```bash
npm run dev -- --host

```

### Step 5: Execute the Peer Demo

1. On the secondary device, navigate to the generated network URL (e.g., `http://192.168.1.45:5173`).
2. Verify that the **Active Peers** meter increments sequentially.
3. Click inside the canvas on Device A—observe the interactive telemetry pin replicate instantaneously to Device B across the direct local channel without traveling through an external server.

```

***

### 💡 Why this README helps you score higher:
* **Hits Key Hackathon Buzzwords:** Terms like *CRDTs*, *Local-First*, *Edge-Computed Network Architecture*, and *Decentralized Topology* stand out immediately to technical judges.
* **Clear Value Proposition:** The "Core Technical Architecture" section justifies your technical stack right away.
* **The Demo Recipe:** Giving judges explicit steps on how to reproduce the multi-device offline sync proves your architecture works exactly as advertised, maximizing your technical execution score.

```
