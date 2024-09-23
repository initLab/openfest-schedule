import { useMemo } from 'react';

export default function useScheduleTable({
    eventTypeId,
    halls = {},
    events = {},
    slots = {},
}) {
    const filteredEvents = useMemo(() => events.filter(event => eventTypeId > 0 ? event.event_type_id === eventTypeId : true), [eventTypeId, events]);
    const filteredEventIds = useMemo(() => filteredEvents.map(event => event.id), [filteredEvents]);
    const filteredHallIds = useMemo(() => new Set(slots.filter(slot => filteredEventIds.includes(slot.event_id)).map(slot => slot.hall_id)), [filteredEventIds, slots]);
    const header = useMemo(() => halls.filter(hall => filteredHallIds.has(hall.id)), [filteredHallIds, halls]);

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
