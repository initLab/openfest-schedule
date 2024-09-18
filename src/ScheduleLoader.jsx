import useConferences from './hooks/useConferences.js';

export default function ScheduleLoader() {
    const {
        conferences,
        error,
        isLoading,
    } = useConferences();

    return (<>
        {isLoading && <p>Please wait...</p>}
        {error && <p>Error: {error}</p>}
        {conferences && <>
            <label>Select a conference</label>
            <select>
                {conferences.map(conference => <option key={conference.id}
                                                       value={conference.id}>{conference.title}</option>)}
            </select>
        </>}
    </>);
}
