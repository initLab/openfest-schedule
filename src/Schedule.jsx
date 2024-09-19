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
        halls,
        isLoading,
        loadingProgress,
    } = useSchedule(conferenceId);

    return (<>
        {isLoading && <>Loading... <progress value={loadingProgress} /></>}
        {halls && <table border="1">
            <thead>
                <tr>
                    {Object.entries(halls).map(([hallId, hall]) => <th key={hallId}>{hall.name[lang]}</th>)}
                </tr>
            </thead>
        </table>}
        {tracks && Object.entries(tracks).map(([trackId, track]) => <div key={trackId} style={{
                width: '100%',
                border: '1px solid black',
                textAlign: 'center',
                margin: '4px 0',
                padding: '4px 0',
            }}>{track.name[lang]}
        </div>)}
        {events && tracks && Object.entries(events).map(([eventId, event]) => <section key={eventId} id={'lecture-'.concat(eventId)}>
            <p>
                <strong>{event.title}</strong>
                {event.participant_user_ids && !isTrackHidden(tracks[event.track_id]) && speakers && <>
                    ({event.participant_user_ids.map(speakerId => speakers[speakerId] && <Fragment key={speakerId}>
                        <a key={speakerId} href={'#'.concat(getSpeakerName(speakers[speakerId]))}>
                            {getSpeakerName(speakers[speakerId])}
                        </a>
                        {speakers[speakerId].organisation && <>
                            /&#8288;{speakers[speakerId].organisation}&#8288;/
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
            <div>
                {Object.entries(speakers).map(([speakerId, speaker]) => <div key={speakerId}>
                    <a href={'#'.concat(getSpeakerName(speaker))}>
                        <img width="100" height="100" src="" alt={getSpeakerName(speaker)} />
                    </a>
                </div>)}
            </div>
            {Object.entries(speakers).map(([speakerId, speaker]) => <div key={speakerId} id={getSpeakerName(speaker)}>
                <img width="100" height="100" src="" alt={getSpeakerName(speaker)}/>
                <h3>{getSpeakerName(speaker)}</h3>
                <div>
                    {speaker.twitter && <a href={'https://twitter.com/'.concat(speaker.twitter)}>
                        twitter
                    </a>}
                    {speaker.github && <a href={'https://github.com/'.concat(speaker.github)}>
                        github
                    </a>}
                </div>
                <p>{speaker.biography}</p>
            </div>)}
        </>}
    </>);
}

Schedule.propTypes = {
    conferenceId: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
};
