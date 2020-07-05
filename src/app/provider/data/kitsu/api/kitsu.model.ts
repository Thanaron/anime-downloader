import { ApiModel } from "../../model.interface";

interface Titles {
    en: string;
    en_jp: string;
    ja_jp: string;
}

interface Image {
    tiny?: string;
    small?: string;
    large?: string;
    original?: string;
}

interface Attributes {
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    synopsis: string;
    titles: Titles;
    canonicalTitle: string;
    abbreviatedTitles: any[];
    averageRating: string;
    userCount: number;
    favoritesCount: number;
    startDate: string;
    endDate: string;
    nextRelease?: any;
    popularityRank: number;
    ratingRank: number;
    ageRating: string;
    ageRatingGuide: string;
    subtype: string;
    status: string;
    tba: string;
    posterImage?: Image;
    coverImage?: Image;
    episodeCount: number;
    episodeLength: number;
    totalLength: number;
    showType: string;
}

export interface KitsuAnimeModel extends ApiModel {
    id: number;
    type: string;
    attributes: Attributes;
}