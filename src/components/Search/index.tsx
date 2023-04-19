import React, { useRef } from "react";
import algoliasearch from "algoliasearch/lite";
import type { AutocompleteComponents } from "@algolia/autocomplete-js";
import * as autocompleteJs from "@algolia/autocomplete-js";
import Autocomplete from "./Autocomplete";
import type { SearchItem } from "./types";

import "@algolia/autocomplete-theme-classic";
import "../../styles/algolia-search.css";

const { getAlgoliaResults } = autocompleteJs;

// testing keys
// const appId = 'latency'
// const searchKey = '6be0576ff61c053d5f9a3225e2a90f76';
// const searchIndex = 'instant_search'

const appId = import.meta.env.PUBLIC_ALGOLIA_APP_ID;
const searchKey = import.meta.env.PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY;
const searchIndex = import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME;

const searchClient = algoliasearch(appId, searchKey);

interface SearchResultProps {
    hit: SearchItem;
    components: AutocompleteComponents;
}

const SearchResult = ({ hit, components }: SearchResultProps) => {
    return (
        <a href={hit.urlPath} className="aa-ItemLink">
            <div className="aa-ItemContentBody">
                <div className="aa-ItemContentTitle">
                    <components.Highlight hit={hit} attribute="title" />
                </div>
                <div className="aa-ItemContentDescription">
                    <components.Highlight hit={hit} attribute="description" />
                </div>
            </div>
        </a>
    );
};

const SearchComponent = () => {
    return (
        // @ts-ignore
        <Autocomplete
            openOnFocus={true}
            getSources={({ query }) => [
                {
                    sourceId: "search_results",
                    getItems() {
                        return getAlgoliaResults({
                            searchClient,
                            queries: [
                                {
                                    indexName: searchIndex,
                                    query,
                                },
                            ],
                        });
                    },
                    templates: {
                        item({ item, components }) {
                            return (
                                <SearchResult
                                    hit={item}
                                    components={components}
                                />
                            );
                        },
                    },
                },
            ]}
        />
    );
};

export default SearchComponent;
