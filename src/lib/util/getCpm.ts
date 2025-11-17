export const getCpm = (keyDownCount: number, matchStartTime: number | null) => {
    if (!keyDownCount || !matchStartTime) return 0;
    const elapsedSeconds = (Date.now() - matchStartTime) / 1000;
    const cpm = Math.round((keyDownCount / elapsedSeconds) * 60);
    return cpm;
};
