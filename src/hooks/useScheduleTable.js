import { useMemo } from 'react';
import { sorter, toMidnight } from '../utils.js';
import { langs } from '../Schedule/constants.js';
import { getTime, isSameDay, toDate } from 'date-fns';

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
        const days = Array.from(new Set(filteredSlots.map(slot => getTime(toMidnight(slot))))).map(ts => toDate(ts));
        const microslots = Array.from(new Set(filteredSlots.flatMap(slot => [
            getTime(slot.starts_at),
            getTime(slot.ends_at),
        ]))).sort().map(ts => toDate(ts));
        const filteredHallIds = new Set(filteredSlots.map(slot => slot.hall_id));
        const filteredHalls = halls.filter(hall => filteredHallIds.has(hall.id));
        const hallSlots = Object.fromEntries(filteredHalls.map(hall => [
            hall.id,
            filteredSlots.filter(slot => slot.hall_id === hall.id),
        ]));

        void(days);
        void(hallSlots);

        const header = [{
                id: 0,
                name: Object.fromEntries(Object.keys(langs).map(lang => [lang, ''])),
            },
            ...filteredHalls,
        ];

        const rows = microslots.flatMap((date, index, array) => {
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const nextDate = !isLast ? array[index + 1] : null;
            const isFirstForTheDay = index > 0 && !isSameDay(date, array[index - 1]);
            const isLastForTheDay = array?.[index + 1] && !isSameDay(date, array[index + 1]);

            const showHeader = isFirst || isFirstForTheDay;
            const showSlot = !isLast && !isLastForTheDay;

            return [
                ...showHeader ? [{
                    id: 'header-'.concat(getTime(date).toString()),
                    cells: [{
                        id: 1,
                        attributes: {
                            colSpan: header.length,
                        },
                        dateHeader: date,
                    }],
                }] : [],
                ...showSlot ? [{
                    id: 'slot-'.concat(getTime(date).toString()),
                    cells: [{
                        id: 1,
                        slotTime: {
                            start: date,
                            end: nextDate,
                        }
                    }, {
                        id: 2,
                        // attributes: {
                        //     className: 'schedule-'.concat(slot.event.language).concat(' ').concat(slot.event.track?.css_class),
                        //     colSpan: 2,
                        // },
                        // event: slot.event,
                    }],
                }] : [],
            ];
        });

        return {
            header,
            rows,
        };
    }, [eventTypeId, events, halls, slots]);
}
