const WORDS_PER_MINUTE = 200;

const getReadingTime = (postContent: string) => {
    if (!postContent) return;

    const clean = postContent.replace(/<\/?[^>]+(>|$)/g, "");
    const numberOfWords = clean.split(/\s/g).length;
    const readingMin = Math.ceil(numberOfWords / WORDS_PER_MINUTE);

    if (readingMin === 1) {
        return `${readingMin} minute`;
    } else {
        return `${readingMin} minutes`;
    }
};

export default getReadingTime;
