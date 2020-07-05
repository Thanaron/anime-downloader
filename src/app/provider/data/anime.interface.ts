type AnimeImages = { thumbnail?: string, header?: string }

// TODO: This could also possibly just be a string as key
type AnimeDetails = Map<AnimeDetail, any>;

export enum AnimeDetail {
    EnglishName = "English",
    JapaneseName = "Japanese",
    StartDate = "Started",
    EpisodeCount = "Episodes",
    // ...
}

export interface Anime {
    id: number;
    name: string;
    description?: string;
    images?: AnimeImages;
    details?: AnimeDetails
}

