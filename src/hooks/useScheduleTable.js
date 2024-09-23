import { useMemo } from 'react';

export default function useScheduleTable({
    eventTypeId,
    halls = {},
    events = {},
    slots = {},
}) {
    return useMemo(() => {
        const filteredEvents = events.filter(event => eventTypeId > 0 ? event.event_type_id === eventTypeId : true);
        const filteredEventIds = filteredEvents.map(event => event.id);
        const filteredSlots = slots.filter(slot => filteredEventIds.includes(slot.event_id));
        const filteredHallIds = new Set(filteredSlots.map(slot => slot.hall_id));
        const header = halls.filter(hall => filteredHallIds.has(hall.id));

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
    }, [eventTypeId, events, halls, slots]);
}
