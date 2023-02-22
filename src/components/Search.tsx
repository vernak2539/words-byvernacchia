import "instantsearch.css/themes/reset.css";
import "instantsearch.css/themes/satellite.css";
import React from "react";
import algoliasearch from "algoliasearch/lite";
import type { BaseHit, Hit } from "instantsearch.js/es/types/results";
import {
    Highlight,
    Hits,
    InstantSearch,
    SearchBox,
} from "react-instantsearch-hooks-web";

const searchClient = algoliasearch(
    import.meta.env.PUBLIC_ALGOLIA_APP_ID,
    import.meta.env.PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

// objectID is the blog slug
interface MyHit extends Hit<BaseHit> {
    content: string;
    description: string;
    title: string;
}

const Hit = ({ hit }: { hit: MyHit }) => {
    return (
        <>
            <Highlight hit={hit} attribute="title" />
            <Highlight hit={hit} attribute="description" />
        </>
    );
};

const SearchComponent = () => (
    <InstantSearch
        indexName={import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
    >
        <SearchBox />
        <Hits hitComponent={Hit} />
    </InstantSearch>
);

export default SearchComponent;
