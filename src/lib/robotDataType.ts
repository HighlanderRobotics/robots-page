type Metric = {
    top?: string;
    big?: string;
    bottom?: string;
}

type Subassembly = {
    heading: string;
    body: string;
    position: 'left' | 'right' | 'center';
    pokeIntoAnimationPercent?: number;
}

export type RobotData = {
    name: string;
    seasonName: string;
    nameScalePercent: number;
    revealVideoURL: string;
    animationFrameCount: number;
    unfinished?: boolean;
    metrics: Metric[];
    subassemblies: Subassembly[];
}