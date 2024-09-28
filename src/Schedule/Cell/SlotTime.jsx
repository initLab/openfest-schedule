export default function SlotTime({
    start,
    end,
}) {
    // TODO: format with date-fns
    return start.getHours().toString().concat(':').concat(start.getMinutes()).concat(' - ').concat(end.getHours())
        .concat(':').concat(end.getMinutes());
}
