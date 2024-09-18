import useConferences from './hooks/useConferences.js';
import { useMemo, useState } from 'react';
import Schedule from './Schedule.jsx';
import { dateSorter } from './utils.js';
import { langs } from './constants.js';

export default function ScheduleLoader() {
    const {
        data,
        error,
        isLoading,
    } = useConferences();

    const conferences = useMemo(() => Array.isArray(data) ? data.sort(dateSorter('start_date')) : data, [data]);

    const [ conferenceId, setConferenceId ] = useState();
    const [ lang, setLang ] = useState();

    return (<>
        <div>
            <select onChange={e => setLang(e.target.value)}>
                {Object.entries(langs).map(([langId, langName]) => <option key={langId} value={langId}>{langName}</option>)}
            </select>
        </div>
        {isLoading && <p>Please wait...</p>}
        {error && <p>Error: {error}</p>}
        {conferences && <>
            <label>Select a conference</label>
            <select onChange={e => setConferenceId(e.target.value)}>
                {conferences.map(conference => <option key={conference.id}
                                                       value={conference.id}>{conference.title}</option>)}
            </select>
        </>}
        {conferenceId && <Schedule conferenceId={conferenceId} lang={lang} />}
    </>);
}
