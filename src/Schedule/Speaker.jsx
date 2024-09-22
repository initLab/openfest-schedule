import { getSpeakerName } from './utils.js';
import PropTypes from 'prop-types';

export default function Speaker(speaker) {
    return (<>
        <a href={'#speaker-'.concat(speaker.id.toString())}>{getSpeakerName(speaker)}</a>
        {speaker.organisation && <>/&#8288;{speaker.organisation}&#8288;/</>}
    </>);
}

Speaker.propTypes = {
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    organisation: PropTypes.string,
};
