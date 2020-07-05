import axios from 'axios';
import { KitsuAnimeModel } from './kitsu.model';

interface KitsuApiAnimeCallFilter {
    key: string;
    value: any;
}

type KitsuApiCallOptions = {
    pages?: {
        limit?: number;
        offset?: number;
    };
    filter?: KitsuApiAnimeCallFilter[];
    includes?: string[];
    fields?: string[];
};

interface KitsuApiResponse {
    data: KitsuAnimeModel[];
}

export class KitsuApi {
    public static shared: KitsuApi = new KitsuApi();
    private baseUrl = 'https://kitsu.io/api/edge';

    private constructor() { }

    // getCategories() {
    //     this.performApiCall('categories', {
    //         filter: [
    //             {
    //                 key: 'text',
    //                 value: 'name',
    //             },
    //         ],
    //         includes: ['categories', 'subtype'],
    //         fields: ['id', 'createdAt'],
    //     });
    // }

    async getAnime(name: string): Promise<KitsuApiResponse> {
        return (await this.performApiCall('anime', {
            filter: [
                {
                    key: 'text',
                    value: name,
                },
            ],
            includes: ['episodes'],
        }));
    }

    async getEpisodesForAnime(animeId: number) {

    }

    private async performApiCall(endpoint: string, options: KitsuApiCallOptions) {
        let queryParameter = '';
        queryParameter += `page[limit]=${options.pages?.limit ?? 20}`;
        queryParameter += `&page[offset]=${options.pages?.offset ?? 0}`;

        if (options.filter) {
            for (const filter of options.filter) {
                queryParameter += `&filter[${filter.key}]=${filter.value}`;
            }
        }

        if (options.includes) {
            queryParameter += `&includes=${options.includes.join(',')}`;
        }

        if (options.fields) {
            queryParameter += `&fields[${endpoint}]=${options.fields.join(
                ','
            )}`;
        }

        const url = `${this.baseUrl}/${endpoint}?${queryParameter}`;

        const { data } = await axios.get(url, {
            headers: [
                'Accept: application/vnd.api+json',
                'Content-Type: application/vnd.api+json',
            ],
        });

        return data;
    }
}