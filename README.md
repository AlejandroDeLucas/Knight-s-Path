# Knight's Path MVP (Browser-first)

Este MVP está pensado para jugarse en navegador sin instalar nada en el dispositivo final.

## Jugar desde móvil o PC sin instalar

1. Sube el repo a GitHub.
2. Ve a **Settings → Pages** y deja **Source: GitHub Actions**.
3. Haz push a `main` (o `work` en este repo).
4. Espera a que termine el workflow `Deploy Phaser MVP to GitHub Pages`.
5. Abre la URL publicada de GitHub Pages desde cualquier navegador (móvil o PC).

## Desarrollo local (opcional)

```bash
npm install
npm run dev
```

## Controles MVP

- A / D o ← / →: mover
- Espacio: salto
- Shift o K: dash
- J: lanzar daga
- S o ↓: agacharse
- Enter: empezar/reiniciar

## Nota móvil

Para mejor experiencia móvil futura:
- Añadir botones táctiles en HUD (TODO).
- Ajustar escalado y UI responsive (TODO).

Este primer paso ya permite distribución web inmediata, ideal para playtests rápidos.
