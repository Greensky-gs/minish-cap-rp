// Typage
type randomOptions = {
    max?: number;
    min?: number;
};

// Export
export const random = (options: randomOptions) => {
    let max = options.max ?? 100;
    let min = options.min ?? 0;
    
    if (max === min) return max;
    if (max < min) {
        let old = max;
        max = min;
        min = old;
    };

    return Math.floor(Math.random() * max - min) + min;
};