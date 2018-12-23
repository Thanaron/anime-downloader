export interface RootState {}
export interface ConfigState {
    visibleColumns: string[];
    autoDownload: boolean;
    autoCheckUpdate: boolean;
    uniqueEpisodesOnly: boolean;
    downloadPath: string;
    username: string;
}

export enum StatusType {
    None = 'has-text-info',
    Error = 'has-text-danger',
    Warning = 'has-text-warning',
    Info = 'has-text-info',
    Success = 'has-text-success',
}

export interface Status {
    message: string;
    type: StatusType;
}

export interface ApplicationState {
    status: Status;
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
