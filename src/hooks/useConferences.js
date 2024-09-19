import useCfpRequest from './useCfpRequest.js';

export default function useConferences() {
    return useCfpRequest('.json');
}
