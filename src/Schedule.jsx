import PropTypes from 'prop-types';

export default function Schedule({
    conferenceId,
}) {
    return (<>
        conference id: {conferenceId}
    </>);
}

Schedule.propTypes = {
    conferenceId: PropTypes.string.isRequired,
};
