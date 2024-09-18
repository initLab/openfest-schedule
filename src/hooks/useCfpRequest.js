import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useCfpRequest(path = '') {
    return useSWR(import.meta.env.VITE_CFP_BASE_URL.concat(path), fetcher);
}
