export const isTrackHidden = track =>
    ['други', 'misc', 'misc.'].includes(track?.name?.bg?.toLowerCase()) ||
    ['other', 'misc', 'misc.'].includes(track?.name?.en?.toLowerCase());
