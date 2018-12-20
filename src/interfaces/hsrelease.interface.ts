interface HSRelease {
    bot: string;
    name: string;
    episode: number;
    resolution?: number;
    pack: number;
    size: number;
    extension?: string;
}

interface HSReleaseDownloadInfo {
    release: HSRelease;
    received: number | string;
    progress: number;
}
