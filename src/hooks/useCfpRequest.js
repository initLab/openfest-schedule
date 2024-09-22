import useSWR from 'swr';

const fetcher = (input, init) => fetch(input, init).then(res => res.json());

export default function useCfpRequest(path) {
    return useSWR(import.meta.env.VITE_CFP_BASE_URL.concat(path), fetcher);
}
