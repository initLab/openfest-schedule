import useCfpRequest from './useCfpRequest.js';

export default function useEventTypes(conferenceId) {
    return useCfpRequest(`${conferenceId}/event_types.json`);
}
