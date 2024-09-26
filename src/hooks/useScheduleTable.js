import { useMemo } from 'react';
import { getMidnightTimestamp, isSameDay, sorter } from '../utils.js';

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
            getMidnightTimestamp(slot.starts_at)
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
        const rows = days.flatMap(day => [{
            id: 'header-'.concat(day.getTime().toString()),
            cells: [{
                id: 1,
                attributes: {
                    colSpan: header.length,
                },
                day,
            }]
        },
            ...filteredSlots.filter(slot => isSameDay(slot.starts_at, day)).map(slot => ({
                id: slot.id,
                cells: [{
                    id: 1,
                    attributes: {
                        className: 'schedule-'.concat(slot.event.language).concat(' ').concat(slot.event.track?.css_class),
                        colSpan: 2,
                    },
                    event: slot.event,
                }],
            }))
        ]);

        return {
            header,
            rows,
        };
    }, [eventTypeId, events, halls, slots]);
}
