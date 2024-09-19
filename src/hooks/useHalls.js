import useCfpRequest from './useCfpRequest.js';

export default function useHalls(conferenceId) {
    return useCfpRequest(`/${conferenceId}/halls.json`);
}
