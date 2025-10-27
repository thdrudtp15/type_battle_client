export const getTime = (time: number) => {
    return {
        minutes: Math.floor(time / 1000 / 60),
        seconds: Math.floor((time % 60000) / 1000),
    };
};
