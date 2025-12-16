# CARGOOPT
CargoOpt is a web application that helps plan how to pack boxes into containers and cargos into ships using optimization algorithms and interactive 3D visualizations. Users enter container/ship dimensions, item sizes, and material cautions; the app computes an efficient stacking layout and renders it in 3D along with a downloadable report.

# 🚀 Features
**Key Features:**
- **Container packing flow**: input container dimensions, number of boxes, per‑box sizes, and cautions (fragile, decomposable, waste, edible, etc.).
- **Ship stowage flow**: input ship bay dimensions and cargo sizes to get an optimized cargo arrangement.
- Optimization engine returns best‑effort packing and utilization metrics.
- Interactive 3D visualization of containers and ships using React Three Fiber scenes (containerScene.tsx, shipScene.tsx, scene.ts).
- Downloadable report per run (generated from backend in the full stack setup).
- Frontend deployed as a SPA with client‑side routing support via vercel.json.
## TechStack 

- **Frontend**: React, TypeScript, Vite, React Three Fiber / Three.js, Tailwind CSS (config in tailwind.config.js), Axios client code (packing.ts, stowage.ts).
- **Backend**: Flask API with optimization logic, Postgres / Neon DB, report generation.
- *Deployment*:** Vercel and Heroku
- **Deployed Link**: https://cargodeployement.vercel.app/packing

---

# 📄 License
MIT — free for educational and personal use.




