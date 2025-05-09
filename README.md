
# 🛋️ RoomCraft 3D – Web-Based Interior Design Tool

[![Watch Demo](https://img.shields.io/badge/RoomCraft_3D-Demo_Video-red?logo=youtube)](https://youtu.be/1TVqX17_4fQ)

---

RoomCraft 3D is a browser-based interior design application built with **Three.js**, allowing **designers** to create, customize, and visualize floor plans in both **2D and 3D**. It’s ideal for in-store furniture design consultations and requires login access for authenticated designers.


---


## 🎨 Figma UI Prototype

View the high-fidelity prototype created in Figma:

👉 [View Figma Design](https://www.figma.com/design/DpZNj0FzVmLNVGGLJUQRqm/RoomCraft-3D?node-id=0-1&t=w0zo9nx4txccDSsb-1)


---

## 🖼️ Project Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/adfb7384-fbce-47f3-a384-6c3b4a769efb" alt="Screenshot 1" width="500" />
  <img src="https://github.com/user-attachments/assets/e889b407-b119-44cd-9260-0ad56dacd770" alt="Screenshot 2" width="500" />
  <img src="https://github.com/user-attachments/assets/64fed37b-3ee1-474a-9583-2b90765fbab9" alt="Screenshot 3" width="500" />
  <img src="https://github.com/user-attachments/assets/1690bab4-96b5-443d-a2a2-b0e3817ae189" alt="Screenshot 4" width="500" />
  <img src="https://github.com/user-attachments/assets/fadf7f34-172e-4863-b4da-3343b11b3b4e" alt="Screenshot 5" width="500" />
</div>

---

## 👨‍💻 GitHub Repository

📂 [RoomCraft 3D Source Code](https://github.com/Kishalsj/Room-Craft-3D.git)

---

## ✨ Features

✅ 2D floor plan creation (click-and-drag wall drawing)  
✅ Real-time 3D rendering of the room layout  
✅ Add, move, scale, and rotate 3D furniture items  
✅ Dynamic resizing (height, width, depth)  
✅ Local saving and loading of designs (JSON format)  
✅ Lightweight, responsive browser interface  
✅ Secured access – designer-only login system

---


## 🚀 Getting Started

### ✅ Prerequisites
- Node.js ≥ 14.x
- npm ≥ 6.x
- Python ≥ 3.x (for running local server)

### 📦 Install

```bash
npm install --legacy-peer-deps
npm install grunt@0.4.5
npm install -g grunt-cli
npm install --save-dev grunt-cli
```

### ▶ Run Locally

```bash
npx grunt
cd example
python -m http.server
```

Visit [`http://localhost:8000`](http://localhost:8000) to start designing!

---

## 💡 What Can You Do With It?

- ✏️ Draw accurate 2D floor plans
- 🪑 Add and arrange furniture
- 🎨 Scale and resize objects to fit the space
- 🧠 Visualize realistic 3D layouts instantly
- 💾 Save your designs for future editing

---

## 🧠 Technology Stack

- `Three.js` – 3D graphics and scene management
- `Bootstrap 3` – UI styling
- `jQuery` – DOM manipulation
- `Grunt` + `Browserify` – Build tools
- `Python HTTP Server` – For local testing

---

## 🗂️ Project Structure

```
RoomCraft-3D/
├── src/              # Core logic and rendering engine
│   ├── core/         # Utilities and configuration
│   ├── floorplanner/ # 2D drawing and layout tools
│   ├── items/        # Furniture item logic
│   ├── model/        # Data model (rooms, objects)
│   └── three/        # 3D controller and viewer
├── example/          # Complete demo app with HTML, CSS, models
├── models/           # 3D furniture models
├── textures/         # Textures for items and environment
├── package.json
├── gruntfile.js
└── README.md
```

---

## 👨‍💻 For Developers

After editing code in `src/`, rebuild the main JavaScript file:

```bash
grunt
```

This outputs the latest `roomCraft3d.js` into `example/js/`.

---

## 🤝 Contributing

RoomCraft 3D is open-source and welcomes improvements!

**TODOs:**
- ✅ Modernize Three.js version
- ✅ Add furniture color customization
- ❌ Refactor core architecture (remove jQuery)
- ❌ Add backend support for saving user profiles
- ❌ Improve serialization format

Want to help? Submit a pull request or open an issue!

---

## 📄 License

This project is licensed under both the **MIT** and **Apache 2.0** licenses. See the `LICENSE.txt` file for details.
