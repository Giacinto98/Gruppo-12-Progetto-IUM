import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  from: number;
  to: number;
}

const Counter = ({ from, to }: Props) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const node = nodeRef.current;

    if (inView) {
      const controls = animate(from, to, {
        duration: 0.5,
        onUpdate(value) {
          if (node) {
            node.textContent = value.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return (
    <span ref={ref}>
      <span ref={nodeRef}></span>
    </span>
  );
};

export default Counter;
