# mlcardosa.space — sitio para publicar

Sitio estático de varias páginas. **Sin paso de compilación.** Para que funcione,
sube TODA la carpeta tal cual está, conservando las subcarpetas `assets/` y `uploads/`.

## Páginas
| Archivo | Página |
|---------|--------|
| `index.html` | Home (carga `app.jsx` + `styles.css`) |
| `nextstep50.html` | NextStep50 · Smart Match (registro completo) |
| `ai-lab.html` | AI Lab (con Playbooks) |
| `bloom-sessions.html` | Bloom Sessions |
| `ai-studio.html` | AI Studio |
| `networking.html` | Networking |
| `field-notes.html` | Field Notes |
| `The Claude Playbook v3.html` | Playbook Vol.01 (se abre desde AI Lab) |
| `My Job Coach Playbook.html` | Playbook Vol.02 (se abre desde AI Lab) |

Archivos de apoyo: `app.jsx`, `tweaks-panel.jsx`, `styles.css`,
`assets/` (1 imagen) y `uploads/` (fotos de las páginas).

> El tercer playbook ("How to Claude Design") apunta a una URL externa de
> claude.ai que requiere inicio de sesión — un visitante normal no podrá abrirlo.

## Publicar en Netlify (arrastrar y soltar)
1. Entra en https://app.netlify.com/drop
2. Arrastra **toda esta carpeta** (no solo el index.html).
3. Listo. Netlify te da una dirección `*.netlify.app`.

Cada vez que haya cambios, vuelve a arrastrar la carpeta completa.

## Publicar con GitHub (despliegue automático)
1. Crea un repositorio en https://github.com/new
2. Sube **todo el contenido de esta carpeta** (incluidas `assets/` y `uploads/`).
3. En Netlify: **Add new site → Import an existing project → GitHub**,
   elige el repo, deja el build vacío y publish directory `.`, y **Deploy**.

## Importante
- Sube siempre la carpeta entera. Si subes solo el HTML, las imágenes y la home
  (que usa `app.jsx`/`styles.css`) dejarán de funcionar.
- La home necesita conexión a internet la primera vez (carga React y las fuentes
  desde un CDN). Las páginas y los playbooks funcionan igual.
