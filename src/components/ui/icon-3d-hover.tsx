'use client';

import React, { useState, useRef } from 'react';
import { motion, MotionConfigContext, LayoutGroup } from 'framer-motion';

// Types
export interface IconHover3DProps {
  heading?: string;
  text?: string;
  variant?: 'Default' | 'Hover';
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

// Transitions
const transition1 = {
  bounce: 0,
  delay: 0,
  duration: 0.4,
  type: "spring" as const
};

const transition2 = {
  delay: 0,
  duration: 0.4,
  ease: [0.44, 0, 0.56, 1] as [number, number, number, number],
  type: "tween" as const
};

const transformTemplate1 = (_: unknown, t: string) => `translate(-50%, -50%) ${t}`;

// Transition wrapper component
const Transition: React.FC<{ value: unknown; children: React.ReactNode }> = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [config, transition]);

  return (
    <MotionConfigContext.Provider value={contextValue}>
      {children}
    </MotionConfigContext.Provider>
  );
};

const Variants = motion.create(React.Fragment);

export const IconHover3D: React.FC<IconHover3DProps> = ({
  heading = "Library",
  text = "A comprehensive collection of digital books and resources for learning and research.",
  variant = 'Default',
  className = "",
  style = {},
  width = "100%",
  height = "auto",
  children,
  ...restProps
}) => {
  const [currentVariant, setCurrentVariant] = useState<'Default' | 'Hover'>(variant);
  const [, setGestureState] = useState({ isHovered: false });
  const refBinding = useRef<HTMLDivElement>(null);
  const defaultLayoutId = React.useId();

  const isHoverVariant = currentVariant === 'Hover';
  const variants = [currentVariant === 'Default' ? 'GPnJri30y' : 'zEwHlJ7zp'];

  const handleMouseEnter = async () => {
    setGestureState({ isHovered: true });
    setCurrentVariant('Hover');
  };

  const handleMouseLeave = async () => {
    setGestureState({ isHovered: false });
    setCurrentVariant('Default');
  };

  const cubeSliceVariants = {
    zEwHlJ7zp: {
      "--border-color": "rgb(34, 197, 94)"
    }
  };

  // Transition for the title
  const titleTransition = {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    type: "tween" as const
  };

  const sliceCubeVariants = {
    zEwHlJ7zp: {
      rotateX: -28,
      rotateY: -43,
      scale: 1.1
    }
  };

  const cornerScaleVariants = {
    zEwHlJ7zp: {
      scale: 1.6
    }
  };

  return (
    <div style={{ width, height, maxWidth: "100%" }}>
      <LayoutGroup id={defaultLayoutId}>
        <Variants animate={variants} initial={false}>
          <Transition value={transition1}>
            <motion.div
              {...restProps}
              data-framer-name="Default"
              data-highlight={true}
              ref={refBinding}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={currentVariant === 'Hover' ? handleMouseLeave : undefined}
              className={`icon-hover-3d group p-5 sm:p-6 flex flex-col gap-5 w-full rounded-[18px] border border-border bg-surface ${className}`}
              style={{
                alignContent: "center",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                overflow: "visible",
                position: "relative",
                boxShadow: isHoverVariant ? "0 0 35px rgba(34, 197, 94, 0.15)" : "none",
                borderColor: isHoverVariant ? "rgba(34, 197, 94, 0.4)" : undefined,
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                ...style
              }}
            >
              {/* Top Row: 3D Cube Icon + Title & Description */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">
                {/* Icon Container with 3D Slice Cube */}
                <motion.div
                  className="icon-container shrink-0"
                  data-framer-name="Icon"
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flex: "none",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    gap: "10px",
                    height: "80px",
                    justifyContent: "center",
                    overflow: "visible",
                    padding: "0px",
                    position: "relative",
                    width: "80px",
                    zIndex: 1,
                    borderRadius: "14px",
                    border: "1px solid var(--color-border, #1a3328)",
                    backgroundColor: "rgba(10, 20, 16, 0.7)"
                  }}
                >
                  {/* BG Container */}
                  <motion.div
                    className="bg-container"
                    data-framer-name="BG"
                    style={{
                      flex: "none",
                      height: "348px",
                      overflow: "visible",
                      position: "relative",
                      width: "348px",
                      zIndex: 2,
                      scale: 0.22
                    }}
                  >
                    {/* Slice Cube */}
                    <motion.div
                      className="slice-cube"
                      data-framer-name="Slice Cube"
                      style={{
                        alignContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flex: "none",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        gap: "28px",
                        height: "min-content",
                        justifyContent: "center",
                        left: "50%",
                        overflow: "visible",
                        padding: "0px",
                        position: "absolute",
                        top: "50%",
                        transformStyle: "preserve-3d",
                        width: "min-content",
                        zIndex: 3,
                        rotate: 49,
                        rotateX: 23,
                        rotateY: 33,
                        scale: 0.7,
                        transformPerspective: 1200
                      }}
                      transformTemplate={transformTemplate1}
                      variants={sliceCubeVariants}
                      animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                    >
                      {/* Slice 1 */}
                      <Transition value={transition2}>
                        <motion.div
                          className="slice-1"
                          data-framer-name="Slice 1"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flex: "none",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            gap: "10px",
                            height: "min-content",
                            justifyContent: "center",
                            overflow: "visible",
                            padding: "0px",
                            position: "relative",
                            transformStyle: "preserve-3d",
                            width: "min-content"
                          }}
                        >
                          <motion.div
                            className="slice-1-front"
                            data-framer-name="Front"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              height: "34px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "relative",
                              width: "240px",
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              zIndex: 120
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-back"
                            data-framer-name="Back"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              right: "0px",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: 180,
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-right"
                            data-framer-name="Right"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              left: "120px",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-left"
                            data-framer-name="Left"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              right: "120px",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: -90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-top"
                            data-framer-name="Top"
                            style={{
                              flex: "none",
                              height: "240px",
                              left: "0px",
                              overflow: "hidden",
                              position: "absolute",
                              right: "0px",
                              top: "-120px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateX: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-bottom"
                            data-framer-name="Bottom"
                            style={{
                              flex: "none",
                              height: "240px",
                              left: "0px",
                              overflow: "hidden",
                              position: "absolute",
                              right: "0px",
                              top: "-86px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateX: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                        </motion.div>
                      </Transition>

                      {/* Slice 2 */}
                      <Transition value={transition2}>
                        <motion.div
                          className="slice-2"
                          data-framer-name="Slice 2"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flex: "none",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            gap: "10px",
                            height: "min-content",
                            justifyContent: "center",
                            overflow: "visible",
                            padding: "0px",
                            position: "relative",
                            transformStyle: "preserve-3d",
                            width: "min-content"
                          }}
                        >
                          <motion.div
                            className="slice-1-front"
                            data-framer-name="Front"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              height: "34px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "relative",
                              width: "240px",
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              zIndex: 120
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-back"
                            data-framer-name="Back"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              right: "0px",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: 180,
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-right"
                            data-framer-name="Right"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              left: "120px",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-left"
                            data-framer-name="Left"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              right: "120px",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: -90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-top"
                            data-framer-name="Top"
                            style={{
                              flex: "none",
                              height: "240px",
                              left: "0px",
                              overflow: "hidden",
                              position: "absolute",
                              right: "0px",
                              top: "-120px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateX: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-bottom"
                            data-framer-name="Bottom"
                            style={{
                              flex: "none",
                              height: "240px",
                              left: "0px",
                              overflow: "hidden",
                              position: "absolute",
                              right: "0px",
                              top: "-86px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateX: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                        </motion.div>
                      </Transition>

                      {/* Slice 3 */}
                      <Transition value={transition2}>
                        <motion.div
                          className="slice-3"
                          data-framer-name="Slice 3"
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flex: "none",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            gap: "10px",
                            height: "min-content",
                            justifyContent: "center",
                            overflow: "visible",
                            padding: "0px",
                            position: "relative",
                            transformStyle: "preserve-3d",
                            width: "min-content"
                          }}
                        >
                          <motion.div
                            className="slice-1-front"
                            data-framer-name="Front"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              height: "34px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "relative",
                              width: "240px",
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              zIndex: 120
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-back"
                            data-framer-name="Back"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              right: "0px",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: 180,
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-right"
                            data-framer-name="Right"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              left: "120px",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-left"
                            data-framer-name="Left"
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              bottom: "0px",
                              display: "flex",
                              flex: "none",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              gap: "10px",
                              justifyContent: "center",
                              overflow: "hidden",
                              padding: "0px",
                              position: "absolute",
                              right: "120px",
                              top: "0px",
                              width: "240px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateY: -90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-top"
                            data-framer-name="Top"
                            style={{
                              flex: "none",
                              height: "240px",
                              left: "0px",
                              overflow: "hidden",
                              position: "absolute",
                              right: "0px",
                              top: "-120px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateX: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                          <motion.div
                            className="slice-1-bottom"
                            data-framer-name="Bottom"
                            style={{
                              flex: "none",
                              height: "240px",
                              left: "0px",
                              overflow: "hidden",
                              position: "absolute",
                              right: "0px",
                              top: "-86px",
                              zIndex: 1,
                              border: "4px solid var(--color-foreground, #e8f5ef)",
                              backgroundColor: "var(--color-surface, #0a1410)",
                              rotateX: 90
                            }}
                            variants={cubeSliceVariants}
                            animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                          />
                        </motion.div>
                      </Transition>
                    </motion.div>

                    {/* Corner elements */}
                    <motion.div
                      style={{
                        flex: "none",
                        height: "24px",
                        left: isHoverVariant ? "-6px" : "14px",
                        overflow: "hidden",
                        position: "absolute",
                        top: isHoverVariant ? "-6px" : "14px",
                        width: "24px",
                        zIndex: 2,
                        borderLeft: "4px solid var(--color-accent, #22c55e)",
                        borderTop: "4px solid var(--color-accent, #22c55e)",
                        scale: 1
                      }}
                      variants={cornerScaleVariants}
                      animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                    />
                    <motion.div
                      style={{
                        flex: "none",
                        height: "24px",
                        left: isHoverVariant ? "-6px" : "14px",
                        overflow: "hidden",
                        position: "absolute",
                        top: isHoverVariant ? "330px" : "310px",
                        width: "24px",
                        zIndex: 2,
                        borderLeft: "4px solid var(--color-accent, #22c55e)",
                        borderBottom: "4px solid var(--color-accent, #22c55e)",
                        scale: 1
                      }}
                      variants={cornerScaleVariants}
                      animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                    />
                    <motion.div
                      style={{
                        bottom: isHoverVariant ? "-6px" : "14px",
                        flex: "none",
                        height: "24px",
                        overflow: "hidden",
                        position: "absolute",
                        right: isHoverVariant ? "-6px" : "14px",
                        width: "24px",
                        zIndex: 2,
                        borderRight: "4px solid var(--color-accent, #22c55e)",
                        borderBottom: "4px solid var(--color-accent, #22c55e)",
                        scale: 1
                      }}
                      variants={cornerScaleVariants}
                      animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                    />
                    <motion.div
                      style={{
                        flex: "none",
                        height: "24px",
                        overflow: "hidden",
                        position: "absolute",
                        right: isHoverVariant ? "-6px" : "14px",
                        top: isHoverVariant ? "-6px" : "14px",
                        width: "24px",
                        zIndex: 2,
                        borderRight: "4px solid var(--color-accent, #22c55e)",
                        borderTop: "4px solid var(--color-accent, #22c55e)",
                        scale: 1
                      }}
                      variants={cornerScaleVariants}
                      animate={isHoverVariant ? 'zEwHlJ7zp' : 'default'}
                    />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  {/* Heading Text with hover fill effect */}
                  <motion.div
                    className="relative flex items-center overflow-hidden w-fit select-none"
                    style={{
                      height: "32px",
                      fontFamily: 'var(--font-sans)',
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "var(--color-foreground, #e8f5ef)",
                    }}
                  >
                    <span className="relative z-[1] pr-2">
                      {heading}
                    </span>

                    {/* Animated overlay text */}
                    <motion.span
                      className="absolute inset-0 z-[2] pr-2 flex items-center"
                      style={{
                        color: "var(--color-background, #050a07)",
                        clipPath: `inset(0 ${isHoverVariant ? '0%' : '100%'} 0 0)`,
                      }}
                      animate={{
                        clipPath: `inset(0 ${isHoverVariant ? '0%' : '100%'} 0 0)`
                      }}
                      transition={titleTransition}
                    >
                      {heading}
                    </motion.span>

                    {/* Background fill */}
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "var(--color-accent-bright, #4ade80)",
                        borderRadius: "4px",
                        transformOrigin: "left center",
                        scaleX: 0,
                        zIndex: 1
                      }}
                      animate={{
                        scaleX: isHoverVariant ? 1 : 0
                      }}
                      transition={titleTransition}
                    />
                  </motion.div>

                  {/* Description Text */}
                  {text && (
                    <p
                      className="mt-1.5 text-sm leading-relaxed text-muted select-none"
                    >
                      {text}
                    </p>
                  )}
                </div>
              </div>

              {/* Children (Form / Action Elements / Calendar) */}
              {children && (
                <div className="w-full pt-2">
                  {children}
                </div>
              )}
            </motion.div>
          </Transition>
        </Variants>
      </LayoutGroup>
    </div>
  );
};
