import PropTypes from 'prop-types';
import { bg, enGB } from 'date-fns/locale';
import { format } from 'date-fns';

export default function DateHeader({
    date,
    lang,
}) {
    const locale = lang === 'bg' ? bg : enGB;

    return format(date, 'dd MMMM - EEEE', {
        locale,
    });
}

DateHeader.propTypes = {
    date: PropTypes.object.isRequired,
    lang: PropTypes.string,
};
