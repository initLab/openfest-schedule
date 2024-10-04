import { useMemo } from 'react';
import { sorter } from '../utils.js';
import { compareAsc, getTime, isSameDay, toDate } from 'date-fns';

export default function useScheduleTable({
    eventTypeId,
    speakers: allSpeakers = [],
    tracks: allTracks = [],
    halls: allHalls = [],
    events: allEvents = [],
    slots: allSlots = [],
}) {
    return useMemo(() => {
        const events = allEvents.filter(event => eventTypeId > 0 ? event.event_type_id === eventTypeId : true);
        const eventIds = events.map(event => event.id);
        const speakerIds = events.flatMap(event => event.participant_user_ids);
        const speakers = allSpeakers.filter(speaker => speakerIds.includes(speaker.id));
        const trackIds = Array.from(new Set(events.map(event => event.track_id)));
        const tracks = allTracks.filter(track => trackIds.includes(track.id));
        const slots = allSlots.sort(sorter('starts_at')).filter(slot => eventIds.includes(slot.event_id));
        const hallIds = new Set(slots.map(slot => slot.hall_id));
        const halls = allHalls.filter(hall => hallIds.has(hall.id));

        const microslots = Array.from(new Set(slots.flatMap(slot => [
            getTime(slot.starts_at),
            getTime(slot.ends_at),
        ]))).sort().map(ts => toDate(ts));

        const rows = microslots.flatMap((date, slotsIndex, slotsArray) => {
            const isFirst = slotsIndex === 0;
            const isLast = slotsIndex === slotsArray.length - 1;
            const nextDate = !isLast ? slotsArray[slotsIndex + 1] : null;
            const isFirstForTheDay = slotsIndex > 0 && !isSameDay(date, slotsArray[slotsIndex - 1]);
            const isLastForTheDay = slotsArray?.[slotsIndex + 1] && !isSameDay(date, slotsArray[slotsIndex + 1]);

            const eventCells = halls.flatMap(hall => {
                const currentHallSlot = slots.find(slot =>
                    slot.hall_id === hall.id &&
                    compareAsc(slot.starts_at, date) <= 0 &&
                    compareAsc(slot.ends_at, nextDate) >= 0
                );

                if (!currentHallSlot) {
                    return [{
                        id: 'blank-'.concat(hall.id),
                    }];
                }

                return [{
                    id: 'slot-'.concat(currentHallSlot.id),
                    attributes: {
                        className: 'schedule-'.concat(currentHallSlot.event.language).concat(' ').concat(currentHallSlot.event.track?.css_class),
                    },
                    event: currentHallSlot.event,
                }];
            });

            const showHeader = isFirst || isFirstForTheDay;
            const showSlot = !isLast && !isLastForTheDay;

            return [
                ...showHeader ? [{
                    id: 'header-'.concat(getTime(date).toString()),
                    cells: [{
                        id: 'header',
                        attributes: {
                            colSpan: halls.length + 1,
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
            rows,
            tracks,
            halls,
            events,
            speakers,
        };
    }, [eventTypeId, allSpeakers, allTracks, allEvents, allHalls, allSlots]);
}
