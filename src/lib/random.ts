export const getRandomInt = (min: number, max: number, seed: number) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    let rfl = Math.sin(seed) * 10000;
    rfl = rfl - Math.floor(rfl);
    return Math.floor(rfl * (max - min) + min);
};