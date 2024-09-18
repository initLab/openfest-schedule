function sorter(a, b, fieldFn) {
    const fieldA = fieldFn(a);
    const fieldB = fieldFn(b);

    return fieldA === fieldB ? 0 : (
        fieldA < fieldB ? -1 : 1
    );
}

export const dateSorter = key => (a, b) => sorter(a, b, item => Date.parse(item[key]));

export const getSpeakerName = speaker => speaker.first_name.concat(' ').concat(speaker.last_name);

export const isTrackHidden = track => track.name.en === 'Other' || track.name.bg === 'Други';
