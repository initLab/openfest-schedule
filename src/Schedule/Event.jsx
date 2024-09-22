import { isTrackHidden } from './utils.js';
import Speaker from './Speaker.jsx';
import FeedbackLink from './FeedbackLink.jsx';

export default function Event(event) {
    return (<>
        <a href={'#event-'.concat(event.id)}>{event.title}</a>
        <br />
        {event.participant_users && !isTrackHidden(event.track) && <>
            {event.participant_users.map(speaker => speaker && <Speaker key={speaker.id} {...speaker} />)}
        </>}
        <p>
            <i>
                <FeedbackLink {...event} />
            </i>
        </p>
    </>);
}
