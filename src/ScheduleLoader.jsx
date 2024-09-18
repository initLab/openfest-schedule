import useConferences from './hooks/useConferences.js';
import { useState } from 'react';
import Schedule from './Schedule.jsx';

export default function ScheduleLoader() {
    const {
        conferences,
        error,
        isLoading,
    } = useConferences();

    const [ conferenceId, setConferenceId ] = useState();

    return (<>
        {isLoading && <p>Please wait...</p>}
        {error && <p>Error: {error}</p>}
        {conferences && <>
            <label>Select a conference</label>
            <select onChange={e => setConferenceId(e.target.value)}>
                {conferences.map(conference => <option key={conference.id}
                                                       value={conference.id}>{conference.title}</option>)}
            </select>
        </>}
        {conferenceId && <div>
            <Schedule conferenceId={conferenceId} />
        </div>}
    </>);
}
