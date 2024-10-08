import ScheduleLoader from './ScheduleLoader.jsx';
import { langs } from './constants.js';
import { useMemo, useState } from 'react';
import { sorter } from '../utils.js';
import useConferences from '../hooks/useConferences.js';

export default function ScheduleChooser() {
    const {
        data,
        error,
        isLoading,
    } = useConferences();

    const conferences = useMemo(() => Array.isArray(data) ? data.sort(sorter('start_date')) : data, [data]);

    const [ year, setYear ] = useState(2024);
    const [ lang, setLang ] = useState('bg');

    return (<>
        {Object.entries(langs).map(([langId, langName]) =>
            <label key={langId}>
                <input type="radio" checked={langId === lang} onChange={e =>
                    setLang(e.target.value)} name="lang" value={langId} />
                {langName}
            </label>)}
        {isLoading && <p>Please wait...</p>}
        {error && <p>Error: {error}</p>}
        {conferences && <>
            <select value={year} onChange={e => setYear(parseInt(e.target.value, 10))}>
                {conferences.map(conference =>
                    <option key={conference.id} value={conference.start_date.getFullYear()}>{conference.title}</option>)}
            </select>
        </>}
        <ScheduleLoader year={year} lang={lang} />
    </>);
}
