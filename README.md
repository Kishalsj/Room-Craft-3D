
# 🛋️ RoomCraft 3D – Web-Based Interior Design Tool

[RoomCraft 3D Demo Video]

RoomCraft 3D is a browser-based interior design application built with **Three.js**, allowing **designers** to create, customize, and visualize floor plans in both **2D and 3D**. It’s ideal for in-store furniture design consultations and requires login access for authenticated designers.

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

## 📸 Screenshots

| 2D Floor Plan | Add Items | 3D Visualization |
|---------------|-----------|------------------|
| ![floorplan](https://s3.amazonaws.com/furnishup/floorplan.png) | ![add_items](https://s3.amazonaws.com/furnishup/add_items.png) | ![3d_design](https://s3.amazonaws.com/furnishup/design.png) |

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

This outputs the latest `blueprint3d.js` into `example/js/`.

---

## 🌍 Live Example

👉 Explore our working example here:  
🔗 [http://furnishup.github.io/blueprint3d/example/](http://furnishup.github.io/blueprint3d/example/)

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
