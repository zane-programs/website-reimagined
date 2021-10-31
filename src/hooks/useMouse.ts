import { useEffect, useState } from "react";

export default function useMouse() {
  // whether or not device has mouse support
  const [mouseAvailable, setMouseAvailable] = useState(false);

  useEffect(() => {
    setMouseAvailable(window.matchMedia("(pointer:fine)").matches);
  }, [setMouseAvailable]);

  return { mouseAvailable };
}
