export const getNextStep = (prev: number, max: number): number => {
    if (max === 0) return 0;
    return (prev + 1) % max;
}

export const getPreviousStep = (prev: number, max: number): number => {
    if (max === 0) return 0;
    return (prev - 1 + max) % max;
}