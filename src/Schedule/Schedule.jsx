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
        speakers,
        tracks,
        halls,
        events,
        slots,
        isLoading,
        loadingProgress,
        isComplete,
    } = useSchedule(conferenceId);

    const {
        header,
        rows,
    } = useScheduleTable({
        tracks,
        halls,
        events,
        slots,
    });

    return (<>
        {isLoading && <progress value={loadingProgress}/>}
        {isComplete && <div className="schedule">
            <hr />
            <table>
                <thead>
                    <tr>
                        {header.map(hall => <th key={hall.id}>{hall.name[lang]}</th>)}
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
                        {header.map(hall => <th key={hall.id}>{hall.name[lang]}</th>)}
                    </tr>
                </tfoot>
            </table>
            <div className="separator"/>
            <table>
                <tbody>
                    {Object.values(tracks).filter(track =>
                        !isTrackHidden(track)
                    ).map(track => <tr key={track.id}>
                        <td className={track.css_class}>{track.name[lang]}</td>
                    </tr>)}
                    {Object.entries(langs).map(([langId, langName]) => <tr key={langId}>
                        <td className={'schedule-'.concat(langId)}>{langName}</td>
                    </tr>)}
                </tbody>
            </table>
            <div className="separator" />
            {Object.values(events).map(event => <section key={event.id} id={'event-'.concat(event.id)}>
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
                    {Object.values(speakers).map(speaker => <div key={speaker.id} className="col4 wmember">
                        <a href={'#'.concat(speaker.id)}>
                            <img width="100" height="100" src={defaultSpeaker} alt={getSpeakerName(speaker)} />
                        </a>
                    </div>)}
                </div>
                {Object.values(speakers).map(speaker => <Fragment key={speaker.id}>
                    <div className="speaker" id={'speaker-'.concat(speaker.id)}>
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
