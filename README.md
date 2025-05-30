
---

````markdown
# 🎰 El Lotteria Frontend

This is the frontend for **El Lotteria** — a real-time, grid-based lottery-style game. Players compete on unique 3×3 number grids while random numbers are drawn, with live updates powered by MongoDB change streams.

🔗 **Live Demo**: [https://el-lotteria-frontend.vercel.app/](https://el-lotteria-frontend.vercel.app/)

---

## 🛠️ Tech Stack

- **React.js** – Frontend library for building UI  
- **Vite** – Fast development build tool  
- **Axios** – For making HTTP requests  
- **Tailwind CSS** – Utility-first CSS framework  
- **MUI (Material UI)** – For UI components and responsiveness  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/el-lotteria-frontend.git
cd el-lotteria-frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root and add:

```
VITE_BACKEND_URL=http://localhost:3000/api/game
```

Make sure this matches your backend URL.

### 4. Run the development server

```bash
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
el-lotteria-frontend/
├── components/
│   ├── ControlButtons.jsx
│   └── GridInput.jsx
├── pages/
│   └── UserGrid.jsx
├── utils/
│   └── generateUniqueRandomNumbers.js
├── App.jsx
├── main.jsx
├── index.css
└── vite.config.js
```

---

## 📸 Screenshot

![El Lotteria UI](https://el-lotteria-frontend.vercel.app/screenshot.png)

---

## 📦 Production

Deployed via **Vercel**
🔗 [https://el-lotteria-frontend.vercel.app/](https://el-lotteria-frontend.vercel.app/)

---

## 🧠 Author

**Dipraj** – [GitHub](https://github.com/your-username)

```
```
