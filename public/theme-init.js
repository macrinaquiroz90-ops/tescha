// Script de inicialización de tema — cargado antes del render para evitar flash
// Se mantiene en archivo separado para cumplir con Content Security Policy (no inline scripts)
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (e) {
    // localStorage puede no estar disponible (modo privado, iframe sandboxed)
  }
})();
