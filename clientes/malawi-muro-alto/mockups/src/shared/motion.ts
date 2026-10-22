import * as React from "react"

// Mesmo hook do exemplo drawer-dialog do shadcn/ui.
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(() => window.matchMedia(query).matches)
  React.useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])
  return matches
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)")

const hasWebGL2 = () => {
  try {
    return !!document.createElement("canvas").getContext("webgl2")
  } catch {
    return false
  }
}

// Fundo em WebGL só em tela grande, com WebGL2 e movimento permitido; no resto, a página usa um gradiente parado.
export function useWebGL() {
  const reduced = useReducedMotion()
  const wide = useMediaQuery("(min-width: 768px)")
  const [supported] = React.useState(hasWebGL2)
  return !reduced && wide && supported
}
