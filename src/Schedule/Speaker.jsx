import PropTypes from 'prop-types';

export default function Speaker(speaker) {
    return (<>
        <a href={'#speaker-'.concat(speaker.id.toString())}>{speaker.name}</a>
        {speaker.organisation && <>/&#8288;{speaker.organisation}&#8288;/</>}
    </>);
}

Speaker.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    organisation: PropTypes.string,
};
