export default function useScheduleTable({
    events = {},
    halls = {},
    lang,
}) {
    const header = Object.values(halls).map(hall => ({
        id: hall.id,
        name: hall.name[lang],
    }));

    const rows = Object.values(events).map(event => ({
        id: event.id,
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
