import { createRoot } from "react-dom/client"
import { App } from "./App"

// Estilo escuro: liga as variantes "dark:" dos componentes shadcn (ver shared/base.css).
document.documentElement.classList.add("dark")
createRoot(document.getElementById("root")!).render(<App />)
