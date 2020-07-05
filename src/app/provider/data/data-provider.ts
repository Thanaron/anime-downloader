import { Anime } from "./anime.interface";
import { ApiModel } from "./model.interface";
import { DataFeature } from "./data-feature.enum";
import { SearchFilterOption } from "./search-filter.enum";

export interface DataProvider<T extends ApiModel> {
    supportedFeatures: DataFeature[]
    getSearchResults(input: string): Promise<Anime[]>;
    convertToAnimeObject(source: T): Anime;
}

export interface FilterableDataProvider {
    supportedSearchFilter: SearchFilterOption[]
    filter(anime: Anime[]): Anime[];
}