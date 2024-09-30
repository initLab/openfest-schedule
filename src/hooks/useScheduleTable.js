import { useMemo } from 'react';
import { sorter } from '../utils.js';
import { langs } from '../Schedule/constants.js';
import { compareAsc, getTime, isSameDay, toDate } from 'date-fns';

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
        const microslots = Array.from(new Set(filteredSlots.flatMap(slot => [
            getTime(slot.starts_at),
            getTime(slot.ends_at),
        ]))).sort().map(ts => toDate(ts));
        const filteredHallIds = new Set(filteredSlots.map(slot => slot.hall_id));
        const filteredHalls = halls.filter(hall => filteredHallIds.has(hall.id));
        const skipHallSlots = new Map();

        const header = [{
                id: 0,
                name: Object.fromEntries(Object.keys(langs).map(lang => [lang, ''])),
            },
            ...filteredHalls,
        ];

        const rows = microslots.flatMap((date, slotsIndex, slotsArray) => {
            const isFirst = slotsIndex === 0;
            const isLast = slotsIndex === slotsArray.length - 1;
            const nextDate = !isLast ? slotsArray[slotsIndex + 1] : null;
            const isFirstForTheDay = slotsIndex > 0 && !isSameDay(date, slotsArray[slotsIndex - 1]);
            const isLastForTheDay = slotsArray?.[slotsIndex + 1] && !isSameDay(date, slotsArray[slotsIndex + 1]);
            const rowEvents = new Set();

            const eventCells = filteredHalls.flatMap((hall, hallIndex, hallsArray) => {
                if (skipHallSlots.has(hall.id)) {
                    const leftToSkip = skipHallSlots.get(hall.id);

                    if (leftToSkip <= 1) {
                        skipHallSlots.delete(hall.id);
                    }
                    else {
                        skipHallSlots.set(hall.id, leftToSkip - 1);
                    }

                    return [];
                }

                const currentTimeSlots = filteredSlots.filter(slot => compareAsc(slot.starts_at, date) === 0);
                const currentHallSlot = currentTimeSlots.find(slot => slot.hall_id === hall.id);

                if (!currentHallSlot) {
                    return [{
                        id: 'blank-'.concat(hall.id),
                    }];
                }

                if (rowEvents.has(currentHallSlot.event_id)) {
                    return [];
                }

                let rowSpan = 1;

                const spanningMicroslots = microslots.filter(slotDate =>
                    currentHallSlot.starts_at <= slotDate &&
                    currentHallSlot.ends_at >= slotDate
                );

                if (spanningMicroslots.length > 1) {
                    rowSpan = spanningMicroslots.length - 1;

                    if (rowSpan > 1) {
                        skipHallSlots.set(hall.id, rowSpan - 1);
                    }
                }

                let colSpan = 1;

                for (const index of hallsArray.keys()) {
                    if (index <= hallIndex) {
                        continue;
                    }

                    const currentHall = hallsArray[index];
                    const currentSlot = currentTimeSlots.find(slot =>
                        slot.hall_id === currentHall.id &&
                        slot.event_id === currentHallSlot.event_id
                    );

                    if (!currentSlot) {
                        break;
                    }

                    rowEvents.add(currentHallSlot.event_id);
                    colSpan++;
                }

                return [{
                    id: 'slot-'.concat(currentHallSlot.id),
                    attributes: {
                        className: 'schedule-'.concat(currentHallSlot.event.language).concat(' ').concat(currentHallSlot.event.track?.css_class),
                        colSpan,
                        rowSpan,
                    },
                    event: currentHallSlot.event,
                }];
            });

            const isEmptyRow = false; // TODO !eventCells.find(slot => !!slot?.event);
            const showHeader = isFirst || isFirstForTheDay;
            const showSlot = !isLast && !isLastForTheDay && !isEmptyRow;

            return [
                ...showHeader ? [{
                    id: 'header-'.concat(getTime(date).toString()),
                    cells: [{
                        id: 'header',
                        attributes: {
                            colSpan: header.length,
                        },
                        dateHeader: date,
                    }],
                }] : [],
                ...showSlot ? [{
                    id: 'row-'.concat(getTime(date).toString()),
                    cells: [
                        {
                            id: 'timeslot',
                            timeSlot: {
                                start: date,
                                end: nextDate,
                            }
                        },
                        ...eventCells,
                    ],
                }] : [],
            ];
        });

        return {
            header,
            rows,
        };
    }, [eventTypeId, events, halls, slots]);
}
