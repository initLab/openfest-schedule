import PropTypes from 'prop-types';
import useSchedule from './hooks/useSchedule.js';

export default function Schedule({
    conferenceId,
}) {
    const {
        events,
        speakers,
        tracks,
        eventTypes,
        halls,
        slots,
        isLoading,
    } = useSchedule(conferenceId);

    return (<>
        <div>conference id: {conferenceId}</div>
        {isLoading && <p>Loading...</p>}
        {events && <>
            <div>events:</div>
            <div>{JSON.stringify(events)}</div>
        </>}
        {speakers && <>
            <div>speakers:</div>
            <div>{JSON.stringify(speakers)}</div>
        </>}
        {tracks && <>
            <div>tracks:</div>
            <div>{JSON.stringify(tracks)}</div>
        </>}
        {eventTypes && <>
            <div>event types:</div>
            <div>{JSON.stringify(eventTypes)}</div>
        </>}
        {halls && <>
            <div>halls:</div>
            <div>{JSON.stringify(halls)}</div>
        </>}
        {slots && <>
            <div>slots:</div>
            <div>{JSON.stringify(slots)}</div>
        </>}
    </>);
}

Schedule.propTypes = {
    conferenceId: PropTypes.string.isRequired,
};
