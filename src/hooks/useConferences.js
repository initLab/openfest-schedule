import useCfpRequest from './useCfpRequest.js';
import { useMemo } from 'react';
import { parseDateFields } from '../utils.js';

export default function useConferences() {
    const {
        data: conferences,
        ...restOfRequest
    } = useCfpRequest('.json');

    const parsedConferences = useMemo(() => (conferences ?? []).map(conference =>
        parseDateFields(conference, [
            'start_date',
            'end_date',
            'created_at',
            'updated_at',
        ])
    ), [conferences]);

    return {
        data: parsedConferences,
        ...restOfRequest,
    };
}
