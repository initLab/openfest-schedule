import { useMemo } from 'react';

export default function useScheduleTable({
    eventTypeId,
    halls = {},
    events = {},
    slots = {},
}) {
    const filteredEvents = useMemo(() => Object.values(events).filter(event => eventTypeId > 0 ? event.event_type_id === eventTypeId : true), [eventTypeId, events]);
    const filteredEventIds = useMemo(() => new Set(filteredEvents.map(event => event.id)), [filteredEvents]);
    const filteredHallIds = useMemo(() => new Set(Object.values(slots).filter(slot => filteredEventIds.has(slot.event_id)).map(slot => slot.hall_id)), [filteredEventIds, slots]);
    const header = useMemo(() => Object.values(halls).filter(hall => filteredHallIds.has(hall.id)), [filteredHallIds, halls]);

    const rows = filteredEvents.map(event => ({
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
