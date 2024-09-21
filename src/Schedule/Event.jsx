import PropTypes from 'prop-types';

export default function Event({
    title,
}) {
    return (<strong>{title}</strong>);
}

Event.propTypes = {
    title: PropTypes.string.isRequired,
};
