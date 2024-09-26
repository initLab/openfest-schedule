import PropTypes from 'prop-types';

export default function Day({
    date,
}) {
    // TODO: format with date-fns
    return date.getDate().toString().concat('.').concat((date.getMonth() + 1).toString()).concat(' - ').concat(date.getDay());
}

Day.propTypes = {
    date: PropTypes.object.isRequired,
};
