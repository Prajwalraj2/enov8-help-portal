// public/js/theme.js

document.addEventListener("DOMContentLoaded", () => {
    const themeIcon = document.querySelector(".theme-indicator i");
  
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);
  
    // Toggle theme on click
    document.querySelector(".theme-indicator").addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");
      applyTheme(isDark ? "light" : "dark");
    });
  
    function applyTheme(theme) {
      document.body.classList.remove("dark-theme", "light-theme");
      document.body.classList.add(`${theme}-theme`);
      localStorage.setItem("theme", theme);
  
      if (themeIcon) {
        themeIcon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
      }
    }
  });
  