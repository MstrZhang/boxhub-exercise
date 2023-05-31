/**
 * Sorting function to sort `Order` by created date in descending order
 * @param first first comparison item
 * @param next next comparison item
 * @returns -1 if first is earlier than next and 1 if first is after next. 0 on failure
 */
export const sortByDate = (first: any, next: any) => {
    const firstDate = new Date(first.created);
    const nextDate = new Date(next.created);

    if (firstDate < nextDate) return 1;
    if (firstDate > nextDate) return -1;
    return 0;
};
