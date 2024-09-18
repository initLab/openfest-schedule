import PropTypes from 'prop-types';
import useEvents from './hooks/useEvents.js';
import useSpeakers from './hooks/useSpeakers.js';
import useTracks from './hooks/useTracks.js';
import useEventTypes from './hooks/useEventTypes.js';
import useHalls from './hooks/useHalls.js';
import useSlots from './hooks/useSlots.js';

export default function Schedule({
    conferenceId,
}) {
    const {
        data: events,
    } = useEvents(conferenceId);

    const {
        data: speakers,
    } = useSpeakers(conferenceId);

    const {
        data: tracks,
    } = useTracks(conferenceId);

    const {
        data: eventTypes,
    } = useEventTypes(conferenceId);

    const {
        data: halls,
    } = useHalls(conferenceId);

    const {
        data: slots,
    } = useSlots(conferenceId);

    return (<>
        <div>conference id: {conferenceId}</div>
        <div>events:</div>
        <div>{JSON.stringify(events)}</div>
        <div>speakers:</div>
        <div>{JSON.stringify(speakers)}</div>
        <div>tracks:</div>
        <div>{JSON.stringify(tracks)}</div>
        <div>event types:</div>
        <div>{JSON.stringify(eventTypes)}</div>
        <div>halls:</div>
        <div>{JSON.stringify(halls)}</div>
        <div>slots:</div>
        <div>{JSON.stringify(slots)}</div>
    </>);
}

Schedule.propTypes = {
    conferenceId: PropTypes.string.isRequired,
};
