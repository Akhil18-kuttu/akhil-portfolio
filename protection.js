// ===============================
// Portfolio Image Protection
// ===============================

// Disable Right Click
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

// Disable Drag & Drop on Images
document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");

    img.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
});

// Disable Text Selection
document.addEventListener("selectstart", (e) => {
    e.preventDefault();
});

// Disable Copy
document.addEventListener("copy", (e) => {
    e.preventDefault();
});

// Disable Cut
document.addEventListener("cut", (e) => {
    e.preventDefault();
});

// Disable Paste
document.addEventListener("paste", (e) => {
    e.preventDefault();
});

// Disable Common Keyboard Shortcuts
document.addEventListener("keydown", (e) => {

    const key = e.key.toLowerCase();

    // Ctrl + S
    if (e.ctrlKey && key === "s") {
        e.preventDefault();
    }

    // Ctrl + U
    if (e.ctrlKey && key === "u") {
        e.preventDefault();
    }

    // Ctrl + C
    if (e.ctrlKey && key === "c") {
        e.preventDefault();
    }

    // Ctrl + P
    if (e.ctrlKey && key === "p") {
        e.preventDefault();
    }

    // Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && key === "i") {
        e.preventDefault();
    }

    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && key === "j") {
        e.preventDefault();
    }

    // Ctrl + Shift + C
    if (e.ctrlKey && e.shiftKey && key === "c") {
        e.preventDefault();
    }

    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }

    // Print Screen
    if (e.key === "PrintScreen") {
        e.preventDefault();
    }
});

// Disable Image Save (extra)
document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("mousedown", (e) => {
        if (e.button === 2) {
            e.preventDefault();
        }
    });

});

// Disable Double Click
document.addEventListener("dblclick", (e) => {
    e.preventDefault();
});

// Blur Page When DevTools Size Changes (Optional)
let threshold = 160;

setInterval(() => {

    if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
    ) {

        document.body.style.filter = "blur(10px)";
        document.body.innerHTML =
            "<h1 style='text-align:center;margin-top:100px;'>Developer Tools Detected</h1>";

    }

}, 1000);

// Disable Image Drag from Browser
window.addEventListener("dragstart", function(e) {
    e.preventDefault();
});

// Disable Drop
window.addEventListener("drop", function(e) {
    e.preventDefault();
});

// Disable Touch Hold Menu (Mobile)
document.addEventListener("touchstart", function () {}, {
    passive: false
});

// Prevent Image Touch Menu
document.querySelectorAll("img").forEach((img) => {

    img.style.webkitTouchCallout = "none";
    img.style.webkitUserSelect = "none";
});