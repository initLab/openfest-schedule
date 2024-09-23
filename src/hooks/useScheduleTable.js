import { useMemo } from 'react';
import { sorter } from '../utils.js';

export default function useScheduleTable({
    eventTypeId,
    halls = {},
    events = {},
    slots = {},
}) {
    return useMemo(() => {
        const filteredEvents = events.filter(event => eventTypeId > 0 ? event.event_type_id === eventTypeId : true);
        const filteredEventIds = filteredEvents.map(event => event.id);
        const filteredSlots = slots.sort(sorter('starts_at')).filter(slot => filteredEventIds.includes(slot.event_id));
        const days = Array.from(new Set(filteredSlots.map(slot =>
            slot.starts_at.setHours(0, 0, 0, 0)
        ))).map(ts => new Date(ts));
        const filteredHallIds = new Set(filteredSlots.map(slot => slot.hall_id));
        const filteredHalls = halls.filter(hall => filteredHallIds.has(hall.id));
        const hallSlots = Object.fromEntries(filteredHalls.map(hall => [
            hall.id,
            filteredSlots.filter(slot => slot.hall_id === hall.id),
        ]));

        void(days);
        void(hallSlots);

        const header = filteredHalls;
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
