import useCfpRequest from './useCfpRequest.js';

export default function useEvents(conferenceId) {
    return useCfpRequest(`${conferenceId}/events.json`);
}
