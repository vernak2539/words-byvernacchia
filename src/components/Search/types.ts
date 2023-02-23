import type { BaseItem } from "@algolia/autocomplete-core";
export interface SearchItem extends BaseItem {
    content: string;
    description: string;
    title: string;
}
