export const formatDate = (input: Date): string => {
    return input.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
