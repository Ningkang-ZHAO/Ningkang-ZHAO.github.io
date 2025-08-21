// 切换主题函数
function toggleTheme() {
  let currentTheme = localStorage.getItem("theme");
  let newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

// 应用主题样式
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#e0e0e0";

    document.querySelectorAll("a").forEach(el => {
      el.style.color = "#bb86fc";
    });

    document.querySelectorAll("hr").forEach(el => {
      el.style.borderColor = "#333";
    });

    document.querySelectorAll("pre, code").forEach(el => {
      el.style.backgroundColor = "#1e1e1e";
      el.style.color = "#f1f1f1";
    });

    document.querySelectorAll("blockquote").forEach(el => {
      el.style.backgroundColor = "#1a1a1a";
      el.style.borderLeft = "4px solid #444";
      el.style.color = "#ccc";
    });

  } else { // light
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";

    document.querySelectorAll("a").forEach(el => {
      el.style.color = "#1a0dab";
    });

    document.querySelectorAll("hr").forEach(el => {
      el.style.borderColor = "#ccc";
    });

    document.querySelectorAll("pre, code").forEach(el => {
      el.style.backgroundColor = "#f5f5f5";
      el.style.color = "#333";
    });

    document.querySelectorAll("blockquote").forEach(el => {
      el.style.backgroundColor = "#f9f9f9";
      el.style.borderLeft = "4px solid #ccc";
      el.style.color = "#555";
    });
  }
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    savedTheme = "light"; // 默认 light
  }
  applyTheme(savedTheme);
});
