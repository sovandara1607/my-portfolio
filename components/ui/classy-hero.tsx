'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedPathProps {
    className?: string;
    duration?: number;
    delay?: number;
    repeat?: number | boolean;
    d: string;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
}

export const AnimatedPath = ({
    className = "",
    duration = 2,
    delay = 0,
    repeat = Infinity,
    d,
    stroke = "currentColor",
    strokeWidth = 2,
    fill = "none"
}: AnimatedPathProps) => {
    return (
        <motion.path
            className={className}
            d={d}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: 1,
            }}
            transition={{
                pathLength: {
                    duration,
                    delay,
                    repeat: repeat as number,
                    repeatType: "reverse",
                    ease: "easeInOut",
                },
                opacity: {
                    duration: 0.2,
                    delay,
                }
            }}
            fill={fill}
        />
    );
};

interface TextRotatorProps {
    words: string[];
    className?: string;
    interval?: number;
    textGradient?: boolean;
    letterAnimation?: boolean;
}

export const TextRotator = ({
    words,
    className = "",
    interval = 3000,
    textGradient = true,
    letterAnimation = true
}: TextRotatorProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words.length, interval]);

    const letterVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)", scale: 0.9 },
        visible: (i: number) => ({
            opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
            transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }),
        exit: (i: number) => ({
            opacity: 0, y: -20, filter: "blur(5px)", scale: 0.9,
            transition: { delay: i * 0.02, duration: 0.3, ease: "easeInOut" }
        })
    };

    const getGradientColors = (index: number, total: number) => {
        const hueStart = (currentIndex * 30) % 360;
        const hue = hueStart + (index / total * 60);
        return `hsl(${hue}, 80%, 60%)`;
    };

    return (
        <span className={cn(
            "relative inline-block min-w-[250px] min-h-[1.5em]",
            !letterAnimation && textGradient && "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
            className
        )}>
            <AnimatePresence mode="wait">
                {letterAnimation ? (
                    <motion.span
                        key={currentIndex}
                        className="absolute inset-0 flex items-center justify-center w-full -mt-3"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {words[currentIndex].split('').map((letter, i, array) => (
                            <motion.span
                                key={`${currentIndex}-${i}`}
                                custom={i}
                                variants={letterVariants}
                                style={textGradient ? {
                                    color: getGradientColors(i, array.length),
                                    display: 'inline-block',
                                    textShadow: '0 0 15px rgba(100, 100, 200, 0.15)',
                                    fontWeight: 'inherit'
                                } : {}}
                                className={letter === ' ' ? 'ml-2' : ''}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </motion.span>
                ) : (
                    <motion.span
                        key={currentIndex}
                        className="absolute inset-0 flex items-center justify-center w-full"
                        initial={{ y: 40, opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                        exit={{ y: -40, opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                        transition={{
                            y: { type: "spring", stiffness: 100, damping: 15 },
                            opacity: { duration: 0.5 },
                            filter: { duration: 0.4 },
                            scale: { duration: 0.4 }
                        }}
                    >
                        {words[currentIndex]}
                    </motion.span>
                )}
            </AnimatePresence>
            <span className="opacity-0">{words[0]}</span>
        </span>
    );
};

interface RippleProps { x: number; y: number; size: number; }

export const ButtonRipple = ({
    children,
    className = "",
    onClick,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    [key: string]: unknown;
}) => {
    const [ripples, setRipples] = useState<RippleProps[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 1.5;
        const newRipple = { x, y, size };
        setRipples([...ripples, newRipple]);
        setTimeout(() => {
            setRipples((prev) => prev.filter(r => r !== newRipple));
        }, 1000);
        if (onClick) onClick(e);
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`relative overflow-hidden ${className}`}
            {...props}
        >
            <AnimatePresence>
                {ripples.map((ripple, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0.5, scale: 0, x: ripple.x - ripple.size / 2, y: ripple.y - ripple.size / 2 }}
                        animate={{ opacity: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            position: 'absolute', width: ripple.size, height: ripple.size,
                            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                            borderRadius: '50%', pointerEvents: 'none',
                        }}
                    />
                ))}
            </AnimatePresence>
            {children}
        </button>
    );
};

export const HeroBackground = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div
                className="absolute inset-0 mix-blend-overlay opacity-30 z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat', backgroundSize: '150px 150px',
                }}
            />
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
                animate={{ opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px, 30px 30px',
                    backgroundPosition: '0 0, 15px 15px',
                    opacity: 0.3,
                }}
            />
            <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/20 blur-2xl"
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
                className="absolute bottom-40 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='white' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '80px 80px'
                }}
            />
            <motion.div
                className="absolute -inset-full h-[300%] w-[200%] opacity-10"
                style={{
                    background: 'linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
                    transform: 'rotate(-15deg)',
                }}
                animate={{ left: ['-100%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
            />
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
            </div>
        </div>
    );
};
