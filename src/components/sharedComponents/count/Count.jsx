"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

const Count = ({ number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, number, { duration:5});
    return () => controls.stop();
  }, [count, number]);

  return <motion.pre>{rounded}</motion.pre>;
};


export default Count;
