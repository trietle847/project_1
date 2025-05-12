export default {
  mounted(el) {
    el.style.position = "absolute";

    const handle = el.querySelector(".drag-handle");
    if (!handle) return;

    handle.style.cursor = "move";

    handle.addEventListener("mousedown", (e) => {
      const offsetX = e.clientX - el.offsetLeft;
      const offsetY = e.clientY - el.offsetTop;

      const onMouseMove = (e) => {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  },
};
