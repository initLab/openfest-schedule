import PropTypes from 'prop-types';
import ScheduleLoader from './ScheduleLoader.jsx';

export default function ScheduleChooser({
    year = 2023,
    lang = 'bg',
}) {
    /*
    const {
        data,
        error,
        isLoading,
    } = useConferences();

    const conferences = useMemo(() => Array.isArray(data) ? data.sort(dateSorter('start_date')) : data, [data]);

    const [ selectedConferenceId, setSelectedConferenceId ] = useState();
    const [ selectedLang, setSelectedLang ] = useState(lang);

    return (<>
        <div>
            <select onChange={e => setSelectedLang(e.target.value)}>
                {Object.entries(langs).map(([langId, langName]) => <option key={langId} value={langId}>{langName}</option>)}
            </select>
        </div>
        {isLoading && <p>Please wait...</p>}
        {error && <p>Error: {error}</p>}
        {conferences && <>
            <label>Select a conference</label>
            <select onChange={e => setSelectedConferenceId(e.target.value)}>
                {conferences.map(conference => <option key={conference.id}
                                                       value={conference.id}>{conference.title}</option>)}
            </select>
        </>}
        <ScheduleLoader year={year} lang={selectedLang} />
    </>);
    */
    return (<ScheduleLoader year={year} lang={lang} />);
}

ScheduleChooser.propTypes = {
    year: PropTypes.number,
    lang: PropTypes.string,
};
