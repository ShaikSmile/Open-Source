const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const boxss = document.querySelector(".boxss");

boxss.addEventListener("mouseenter", function() {
    cursorDot.style.display = "block";
    cursorOutline.style.display = "block";
});

boxss.addEventListener("mousemove", function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

boxss.addEventListener("mouseleave", function() {
    cursorDot.style.display = "none";
    cursorOutline.style.display = "none";
});
