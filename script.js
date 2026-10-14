/* ==========================================================================
   CV - Script ligero
   Cambio de tema vía [data-theme] en <html> (solo cambia el atributo,
   los colores los resuelve el CSS con Custom Properties).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("theme-selector");

  // Restaurar el tema guardado por el usuario (si existe)
  const saved = loadTheme();
  if (saved && selector) {
    selector.value = saved;
    applyTheme(saved);
  }

  // Cambio de tema al seleccionar una opción
  if (selector) {
    selector.addEventListener("change", () => {
      applyTheme(selector.value);
      saveTheme(selector.value);
    });
  }

  // Botón de impresión / PDF
  const btnPrint = document.getElementById("btn-print");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => window.print());
  }
});

// Aplica el tema: "default" (Original) quita el atributo, el resto lo fija.
// Los colores se definen en styles.css con [data-theme="..."].
function applyTheme(theme) {
  if (theme === "default") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

// Guardado seguro: localStorage puede fallar en algunos navegadores/archivos
function saveTheme(theme) {
  try {
    localStorage.setItem("cv-theme", theme);
  } catch (e) {
    // Sin almacenamiento disponible: el tema aplica solo en esta sesión
  }
}

function loadTheme() {
  try {
    return localStorage.getItem("cv-theme");
  } catch (e) {
    return null;
  }
}
