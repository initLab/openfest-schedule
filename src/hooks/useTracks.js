import useCfpRequest from './useCfpRequest.js';

export default function useTracks(conferenceId) {
    return useCfpRequest(`${conferenceId}/tracks.json`);
}
