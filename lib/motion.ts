export const slideInRef = (delay: number = 0): any => {
    return {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: delay
            }
        }
    };
};

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): any => {
    return {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren,
            }
        }
    };
};

export const fadeIn = (delay: number = 0): any => {
    return {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: delay
            }
        }
    }
}
