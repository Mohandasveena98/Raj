import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.1; // Adjust speed: 0.1 = smooth following

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;
      if (cursor) {
        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";
      }
      requestAnimationFrame(animate);
    };

    // Detect hover over links and buttons
    const addHoverEvents = () => {
      const hoverElements = document.querySelectorAll("a, button");

      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", move);
    animate();
    addHoverEvents();

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "40px" : "20px",
          height: isHovering ? "40px" : "20px",
          backgroundColor: isHovering
            ? "rgba(255, 100, 0, 0.8)"
            : "rgba(255, 165, 0, 0.7)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "all 0.2s ease",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      ></div>
    </div>
  );
};

export default CustomCursor;
