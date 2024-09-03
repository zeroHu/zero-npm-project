import React, { useEffect, useState } from "react";

const ScreenAdapter = ({
  mode = "fit",
  designWidth = 1920,
  designHeight = 1080,
  children,
}) => {
  const [scale, setScale] = useState(1);

  const calculateScale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newScale = 1;
    switch (mode) {
      case "width":
        newScale = windowWidth / designWidth;
        break;
      case "height":
        newScale = windowHeight / designHeight;
        break;
      case "fit":
      default:
        newScale = Math.min(
          windowWidth / designWidth,
          windowHeight / designHeight
        );
        break;
    }

    setScale(newScale);
  };

  const debounce = (fn, t) => {
    const delay = t || 500;
    let timer;
    return function () {
      const args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      const context = this;
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  };

  const dUpdateScale = debounce(calculateScale, 300);

  useEffect(() => {
    calculateScale();
    window.addEventListener("resize", dUpdateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  const style = {
    transform: `scale(${scale}) translate(-50%, -50%)`,
    width: `${designWidth}px`,
    height: `${designHeight}px`,
    transformOrigin: '0 0',
    position: 'absolute', 
    left: '50%',
    top: '50%',
    transition: '0.3s',
    background: 'transparent'
  };

  return <div style={style}>{children}</div>;
};

export default ScreenAdapter;
