import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function handleResponsiveZoom() {
    const width = window.innerWidth;
    const html = document.documentElement;

    // Logic: Hanya terapkan zoom jika layar adalah Desktop (di atas 1024px)
    // tapi lebih kecil dari standar 1920px
    if (width >= 1024 && width < 1920) {
        // @ts-ignore
        html.style.zoom = "0.9";
        html.style.setProperty('--app-zoom', '0.9');
    } else {
        // Kembalikan ke normal untuk Mobile (< 1024px) atau layar sangat besar (>= 1920px)
        // @ts-ignore
        html.style.zoom = "1";
        html.style.setProperty('--app-zoom', '1');
    }
}

// Jalankan saat startup
handleResponsiveZoom();

// Jalankan saat window di-resize
window.addEventListener("resize", handleResponsiveZoom);

createRoot(document.getElementById("root")!).render(<App />);