export default function useScheduleTable({
    halls = {},
    lang,
}) {
    const hallIds = new Set(Object.keys(halls));
    const header = Object.entries(halls).filter(([id]) => hallIds.has(id)).map(([id, hall]) => ({
        id,
        name: hall.name[lang],
    }));

    const rows = [];

    return {
        header,
        rows,
    };
}
