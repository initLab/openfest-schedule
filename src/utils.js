import { parseJSON, set } from 'date-fns';

export const sorter = field => (a, b) => {
    const fieldA = a[field];
    const fieldB = b[field];

    return fieldA === fieldB ? 0 : (
        fieldA < fieldB ? -1 : 1
    );
};

export const parseDateFields = (item, dateFields) => Object.fromEntries(Object.entries(item).map(([key, value]) =>
    [key, dateFields.includes(key) ? parseJSON(value) : value]
));

export function calculateProgress(...elements) {
    const totalCount = elements.length;

    if (totalCount === 0) {
        return {
            totalCount,
            completeCount: 0,
            incompleteCount: 0,
            progress: 1,
            remainingProgress: 0,
            isComplete: true,
            isIncomplete: false,
            isStarted: true,
            isNotStarted: false,
        };
    }

    const completeCount = elements.filter(element => !!element).length;
    const progress = completeCount / totalCount;

    return {
        totalCount,
        completeCount,
        incompleteCount: totalCount - completeCount,
        progress,
        remainingProgress: 1 - progress,
        isComplete: completeCount === totalCount,
        isIncomplete: completeCount < totalCount,
        isStarted: completeCount > 0,
        isNotStarted: completeCount === 0,
    };
}

export const normalizeResponse = (items = [], relations = []) =>
    Object.entries(items).map(([id, item]) =>
        ({
            id: parseInt(id, 10),
            ...item,
            ...Object.fromEntries(relations.map(([field, collection, idField]) => {
                const key = item[idField];

                return [
                    field,
                    Array.isArray(key) ?
                        collection.filter(item => key.includes(item.id)) :
                        collection.find(item => item.id === key),
                ];
            })),
        })
    );

export const toMidnight = date => set(date, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
});
