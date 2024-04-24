export const formatDate = (input: Date): string => {
    return input.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
