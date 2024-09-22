import PropTypes from 'prop-types';
import useSchedule from '../hooks/useSchedule.js';
import { getSpeakerName, isTrackHidden } from './utils.js';
import { Fragment } from 'react';
import useScheduleTable from '../hooks/useScheduleTable.js';
import Event from './Event.jsx';
import defaultSpeaker from '../assets/default-speaker.png';
import './Schedule.scss';
import { langs } from './constants.js';
import Speaker from './Speaker.jsx';
import FeedbackLink from './FeedbackLink.jsx';

export default function Schedule({
    conferenceId,
    lang,
}) {
    const {
        events,
        speakers,
        tracks,
        halls,
        slots,
        isLoading,
        loadingProgress,
        isComplete,
    } = useSchedule(conferenceId);

    const {
        header,
        rows,
    } = useScheduleTable({
        events,
        tracks,
        halls,
        slots,
        lang,
    });

    return (<>
        {isLoading && <progress value={loadingProgress}/>}
        {isComplete && <div className="schedule">
            <hr />
            <table>
                <thead>
                    <tr>
                        {header.map(hall => <th key={hall.id}>{hall.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => <tr key={row.id}>
                        {row.cells.map(cell => <td key={cell.id} {...cell.attributes}>
                            <Event {...cell.event} />
                        </td>)}
                    </tr>)}
                </tbody>
                <tfoot>
                    <tr>
                        {header.map(hall => <th key={hall.id}>{hall.name}</th>)}
                    </tr>
                </tfoot>
            </table>
            <div className="separator"/>
            <table>
                <tbody>
                    {Object.entries(tracks).filter(([, track]) =>
                        !isTrackHidden(track)
                    ).map(([trackId, track]) => <tr key={trackId}>
                        <td className={track.css_class}>{track.name[lang]}</td>
                    </tr>)}
                    {Object.entries(langs).map(([code, name]) => <tr key={code}>
                        <td className={'schedule-'.concat(code)}>{name}</td>
                    </tr>)}
                </tbody>
            </table>
            <div className="separator" />
            {Object.entries(events).map(([eventId, event]) => <section key={eventId} id={'lecture-'.concat(eventId)}>
                <p>
                    <strong>{event.title}</strong>
                    {event.participant_users && !isTrackHidden(event.track) && <>
                        ({event.participant_users.map(speaker => speaker && <Speaker key={speaker.id} {...speaker} />)})
                    </>}
                </p>
                {event.abstract && <p>
                    {event.abstract}
                </p>}
                <p className="feedback">
                    <strong>
                        <FeedbackLink {...event} />
                    </strong>
                </p>
                <div className="separator" />
            </section>)}
            {<>
                <div className="grid members">
                    {Object.entries(speakers).map(([speakerId, speaker]) => <div key={speakerId} className="col4 wmember">
                        <a href={'#'.concat(getSpeakerName(speaker))}>
                            <img width="100" height="100" src={defaultSpeaker} alt={getSpeakerName(speaker)} />
                        </a>
                    </div>)}
                </div>
                {Object.entries(speakers).map(([speakerId, speaker]) => <Fragment key={speakerId}>
                    <div className="speaker" id={getSpeakerName(speaker)}>
                        <img width="100" height="100" src={defaultSpeaker} alt={getSpeakerName(speaker)}/>
                        <h3>{getSpeakerName(speaker)}</h3>
                        <div className="icons">
                            {speaker.twitter && <a href={'https://twitter.com/'.concat(speaker.twitter)}>
                                <i className="fa-brands fa-twitter" />
                            </a>}
                            {speaker.github && <a href={'https://github.com/'.concat(speaker.github)}>
                                <i className="fa-brands fa-github"/>
                            </a>}
                        </div>
                        <p>{speaker.biography}</p>
                    </div>
                    <div className="separator" />
                </Fragment>)}
            </>}
        </div>}
    </>);
}

Schedule.propTypes = {
    conferenceId: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
};
