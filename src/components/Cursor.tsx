import styled from "styled-components";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const [mouseInWindow, setMouseInWindow] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    const handleMouseOver = () => setMouseInWindow(true);
    const handleMouseOut = () => setMouseInWindow(false);
    const handleMouseDown = () => setMouseDown(true);
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [setMouseX, setMouseX, setMouseInWindow, setMouseDown]);
  return mouseX !== null && mouseY !== null && mouseInWindow ? (
    <CursorElement
      style={{
        transform: `translate(${mouseX - 15}px,${mouseY - 15}px)`,
        opacity: mouseDown ? 0.8 : 1,
      }}
    />
  ) : null;
}

const CursorElement = styled.div`
  position: absolute;
  pointer-events: none;

  z-index: 9999;

  width: 30px;
  height: 30px;
  background: #e8e6dc;

  mix-blend-mode: difference;

  border-radius: 50%;
`;
