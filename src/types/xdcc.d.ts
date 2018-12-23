interface XdccInstance {
    xdccInfo: XdccInfo;
    start(): void;
    cancel(): void;
    reset(): void;
    restart(): void;
    getIndex(): number;
}

interface XdccInfo {
    botNick: string;
    packId: number;
    server: string;
    started: boolean;
    queued: boolean;
    finished: boolean;
    canceled: boolean;
    xdccPoolIndex: number;
    resumePos: number;
    received: number;
    progress: number;
    speed: number;
    startedAt?: number[];
    duration?: any;
    intervalId?: number;
    fileName?: string;
    command?: string;
    ip?: string;
    port?: number;
    fileSize?: number;
    location?: string;
    sender: string;
    target: string;
    message: string;
    params: string[];
    error?: string;
}
