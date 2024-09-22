export default function useScheduleTable({
    events = {},
    halls = {},
    lang,
}) {
    const hallIds = new Set(Object.keys(halls));
    const header = Object.entries(halls).filter(([id]) => hallIds.has(id)).map(([id, hall]) => ({
        id,
        name: hall.name[lang],
    }));

    const rows = Object.entries(events).map(([eventId, event]) => ({
        id: eventId,
        cells: [{
            id: 1,
            attributes: {
                className: 'schedule-'.concat(event.language).concat(' ').concat(event.track?.css_class),
                colSpan: 2,
            },
            event,
        }],
    }));

    return {
        header,
        rows,
    };
}
