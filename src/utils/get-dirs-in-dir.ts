import fs from "fs";

const getDirsInDir = (dir: string) => {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
};

export default getDirsInDir;
