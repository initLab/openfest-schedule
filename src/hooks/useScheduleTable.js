export default function useScheduleTable({
    events = {},
    halls = {},
}) {
    const header = Object.values(halls);

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
