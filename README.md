# Una cartita para Esther 💗 — versión con álbum de fotos

Landing page HTML + CSS + JavaScript, sin frameworks ni compilación.

## Abrir en VS Code

Abre el directorio `Carta-para-Esther` y ejecuta `index.html` con la extensión **Live Server**. Tras la barra de carga, haz clic en el sobre, abre la carta y pulsa **Ver nuestros recuerdos ♡**.

## Estructura

- `index.html`: portada, carta, álbum y visor de fotos.
- `style.css`: diseño original + marcos Polaroid y galería responsiva.
- `script.js`: carga, carta, corazones, galería y navegación.
- `images/`: las 8 fotos originales, sin cambiar sus nombres.

### Agregar fotos en el futuro

1. Copia la foto nueva en la carpeta `images/`.
2. En `script.js`, ubica el arreglo `const recuerdos = [...]` y añade una línea como:
   `{ file: 'mi-foto.jpg', title: 'Un día especial' },`
3. Guarda y vuelve a subir los cambios a GitHub.

**Importante:** GitHub Pages no lista automáticamente el contenido de `images/`. Debes agregar las nuevas fotografías al arreglo de JavaScript para que se muestren.

## Actualizar GitHub Pages

Desde la raíz del repositorio ya configurado en VS Code:

```bash
git add .
git commit -m "feat: agregar album de nuestros recuerdos"
git push origin main
```

Si ya activaste GitHub Pages desde la rama `main`, la web se actualizará cuando termine el despliegue.

**Privacidad:** GitHub Pages en un repositorio público permite ver también las fotografías. Publica las fotos solamente si ambas personas están cómodas con ello.
