import PropTypes from 'prop-types';
import useSchedule from './hooks/useSchedule.js';
import { getSpeakerName, isTrackHidden } from './utils.js';
import { Fragment } from 'react';

export default function Schedule({
    conferenceId,
    lang,
}) {
    const {
        events,
        speakers,
        tracks,
        isLoading,
    } = useSchedule(conferenceId);

    return (<>
        {isLoading && <p>Loading...</p>}
        <div>schedule goes here</div>
        {tracks && Object.entries(tracks).map(([trackId, track]) => <div key={trackId} style={{
                width: '100%',
                border: '1px solid black',
                textAlign: 'center',
                margin: '4px 0',
                padding: '4px 0',
            }}>{track.name[lang]}
        </div>)}
        {events && Object.entries(events).map(([eventId, event]) => <section key={eventId} id={'lecture-'.concat(eventId)}>
            <p>
                <strong>{event.title}</strong>
                {event.participant_user_ids && !isTrackHidden(tracks[event.track_id]) && speakers && <>
                    ({event.participant_user_ids.map(speakerId => speakers[speakerId] && <Fragment key={speakerId}>
                        <a key={speakerId} href={'#'.concat(getSpeakerName(speakers[speakerId]))}>
                            {getSpeakerName(speakers[speakerId])}
                        </a>
                        {speakers[speakerId].organisation && <>
                            /{speakers[speakerId].organisation}/
                        </>}
                    </Fragment>).filter(item => !!item)})
                </>}
            </p>
            {event.abstract && <p>
                {event.abstract}
            </p>}
            <p style={{
                textAlign: 'right',
            }}>
                <strong>
                    <a href={event.feedback_url}>Submit feedback</a>
                </strong>
            </p>
            <hr />
        </section>)}
        {speakers && <>
            <div>speakers:</div>
            <div>{JSON.stringify(speakers)}</div>
        </>}
    </>);
}

Schedule.propTypes = {
    conferenceId: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
};
