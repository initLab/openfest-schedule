export const getSpeakerName = speaker => speaker.first_name.concat(' ').concat(speaker.last_name);

export const isTrackHidden = track => track.name.en === 'Other' || track.name.bg === 'Други';
