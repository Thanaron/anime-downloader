export interface RootState {}

export interface ConfigState {
    visibleColumns: {
        bot: boolean;
        name: boolean;
        episode: boolean;
        resolution: boolean;
        pack: boolean;
        size: boolean;
    };
    autoDownload: boolean;
    autoCheckUpdate: boolean;
    uniqueEpisodesOnly: boolean;
    downloadPath: string;
    username: string;
}

export interface ApplicationState {
    searchText: string;
    tableData: HSRelease[];
    selectedEpisodes: HSRelease[];
}

export interface HSRelease {
    bot: string;
    name: string;
    episode: string;
    resolution?: number;
    pack: number;
    size: number;
    extension?: string;
}

export interface HSReleaseDownloadInfo {
    release: HSRelease;
    received?: number | string;
    progress?: number;
    finished?: boolean;
    error?: string;
}
