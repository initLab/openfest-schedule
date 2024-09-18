import useCfpRequest from './useCfpRequest.js';

export default function useSlots(conferenceId) {
    return useCfpRequest(`${conferenceId}/slots.json`);
}
