import { DataProvider, FilterableDataProvider } from "../data-provider";
import { SearchFilterOption } from "../search-filter.enum";
import { DataFeature } from "../data-feature.enum";
import { KitsuApi } from "./api/kits.api";
import { Anime, AnimeDetail } from "../anime.interface";
import { KitsuAnimeModel } from "./api/kitsu.model";

export class KitsuDataProvider implements DataProvider<KitsuAnimeModel>, FilterableDataProvider {
    supportedFeatures = [DataFeature.All];
    supportedSearchFilter = [SearchFilterOption.All]

    private api = KitsuApi.shared;

    async getSearchResults(input: string): Promise<Anime[]> {
        const { data } = await this.api.getAnime(input);
        console.log(data);

        return data.map(kitsuAnime => this.convertToAnimeObject(kitsuAnime));
    }

    convertToAnimeObject(source: KitsuAnimeModel): Anime {
        let details = new Map<AnimeDetail, any>();
        details.set(AnimeDetail.EnglishName, source.attributes.titles.en);
        details.set(AnimeDetail.JapaneseName, source.attributes.titles.ja_jp);
        details.set(AnimeDetail.EpisodeCount, source.attributes.episodeCount);
        details.set(AnimeDetail.StartDate, source.attributes.startDate)

        return {
            id: source.id,
            name: source.attributes.slug,
            description: source.attributes.synopsis,
            images: {
                header: source.attributes.coverImage?.original,
                thumbnail: source.attributes.posterImage?.small,
            },
            details
        }
    }

    filter(anime: Anime[]): Anime[] {
        throw new Error("Method not implemented.");
    }
}
