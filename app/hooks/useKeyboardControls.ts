import { useEffect } from "react";

type KeyHandlers = {
  onArrowRight?: () => void;
  onArrowLeft?: () => void;
  onEnter?: () => void;
};

export const useKeyboardControls = ({
  onArrowRight,
  onArrowLeft,
  onEnter,
}: KeyHandlers) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          if (onArrowRight) onArrowRight();
          break;
        case "ArrowLeft":
          if (onArrowLeft) onArrowLeft();
          break;
        case "Enter":
          if (onEnter) onEnter();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onArrowRight, onArrowLeft, onEnter]);
};
