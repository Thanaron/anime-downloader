interface RootState {}

interface ConfigState {
    visibleColumns: string[];
    autoDownload: boolean;
    autoCheckUpdate: boolean;
    uniqueEpisodesOnly: boolean;
    downloadPath: string;
    username: string;
}

interface ApplicationState {
    status: string;
    searchText: string;
    tableData: HSRelease[];
    selectedEpisodes: HSRelease[];
}
