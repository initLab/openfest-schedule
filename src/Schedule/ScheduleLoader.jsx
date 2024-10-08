import useConferences from '../hooks/useConferences.js';
import Schedule from './Schedule.jsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

export default function ScheduleLoader({
    year,
    lang,
}) {
    const {
        data,
        error,
        isLoading,
    } = useConferences();

    const conferenceId = useMemo(() => data && data.filter(conference =>
        conference.start_date.getFullYear() === year)?.[0]?.id, [data, year]);

    return (<>
        {isLoading && <p>Loading conferences...</p>}
        {error && <p>Error loading conferences: {error}</p>}
        {data && !conferenceId && <p>No conference found for year {year}</p>}
        {conferenceId && <Schedule conferenceId={conferenceId} lang={lang} />}
    </>);
}

ScheduleLoader.propTypes = {
    year: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
};
