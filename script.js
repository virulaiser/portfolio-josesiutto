(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme) {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function currentEffectiveTheme() {
    var stored = root.getAttribute("data-theme");
    return stored || getSystemTheme();
  }

  // Al cargar: si el usuario ya eligió un tema manualmente, respetarlo.
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    }
  } catch (e) {
    /* localStorage no disponible: se usa prefers-color-scheme */
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentEffectiveTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* ignorar si no hay almacenamiento disponible */
      }
    });
  }
})();
