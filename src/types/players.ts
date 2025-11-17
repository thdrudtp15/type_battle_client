export type Players = {
    currentSentenceIndex: number;
    sentence: string;
    progress: number;
    point: number;
    accuracy: number;
    isCompleted: boolean;
    finished?: number;
};
