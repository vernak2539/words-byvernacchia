import React, { createElement, Fragment, useEffect, useRef } from "react";
import * as autocompleteJs from "@algolia/autocomplete-js";
import { createRoot, type Root } from "react-dom/client";
import type { SearchItem } from "./types";
import type { AutocompleteOptions } from "@algolia/autocomplete-js";

const { autocomplete } = autocompleteJs;

const Autocomplete = (props: AutocompleteOptions<SearchItem>) => {
    const containerRef = useRef(null);
    const panelRootRef = useRef<null | Root>(null);
    const rootRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const search = autocomplete({
            ...props,
            container: containerRef.current,
            placeholder: "",
            detachedMediaQuery: "",
            renderer: {
                createElement,
                Fragment,
                render: () => {},
            },
            render({ children }, root) {
                if (!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root;

                    panelRootRef.current?.unmount();
                    panelRootRef.current = createRoot(root);
                }

                panelRootRef.current.render(children);
            },
        });

        return () => {
            search.destroy();
        };
    }, [props]);

    return <div ref={containerRef} />;
};

export default Autocomplete;
