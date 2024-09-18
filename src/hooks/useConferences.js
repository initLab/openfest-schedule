import useCfpRequest from './useCfpRequest.js';
import { useMemo } from 'react';
import { dateSorter } from '../utils.js';

export default function useConferences() {
    const {
        data,
        ...rest
    } = useCfpRequest();

    const conferences = useMemo(() => Array.isArray(data) ? data.sort(dateSorter('start_date')) : data, [data]);

    return {
        conferences,
        ...rest,
    };
}
