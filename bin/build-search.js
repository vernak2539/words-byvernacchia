import * as dotenv from "dotenv";
dotenv.config();

import algoliasearch from "algoliasearch";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";
import {globSync} from 'glob'

const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_WRITE_API_KEY
);

const pathToBlog = "./src/content/blog/**/**.md";

const filenames = globSync(path.join(pathToBlog));
const data = filenames.map((filename) => {
    try {
        const markdownWithMeta = fs.readFileSync(filename);
        const { data: frontmatter, content } = matter(markdownWithMeta);
        return {
            objectID: path.parse(filename).name,
            title: frontmatter.title,
            description: frontmatter.description,
            content: removeMd(content).replace(/\n/g, ""),
        };
    } catch (e) {
        // console.log(e.message)
    }
});

console.log(data);

client
    .initIndex(process.env.ALGOLIA_INDEX_NAME)
    .saveObjects(JSON.parse(JSON.stringify(data)))
    .then((res) => console.log(res)) //show the result
    .catch((err) => console.log(err));
