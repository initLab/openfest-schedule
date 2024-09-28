import { format } from 'date-fns';

export default function SlotTime({
    start,
    end,
}) {
    return format(start, 'HH:mm').concat(' - ').concat(format(end, 'HH:mm'));
}
