import useCfpRequest from './useCfpRequest.js';

export default function useSpeakers(conferenceId) {
    return useCfpRequest(`${conferenceId}/speakers.json`);
}
