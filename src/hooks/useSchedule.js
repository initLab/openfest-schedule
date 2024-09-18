import useEvents from './useEvents.js';
import useSpeakers from './useSpeakers.js';
import useTracks from './useTracks.js';
import useEventTypes from './useEventTypes.js';
import useHalls from './useHalls.js';
import useSlots from './useSlots.js';
import { calculateProgress } from '../utils.js';

export default function useSchedule(conferenceId) {
    const {
        data: events,
        isLoading: eventsLoading,
        isValidating: eventsValidating,
    } = useEvents(conferenceId);

    const {
        data: speakers,
        isLoading: speakersLoading,
        isValidating: speakersValidating,
    } = useSpeakers(conferenceId);

    const {
        data: tracks,
        isLoading: tracksLoading,
        isValidating: tracksValidating,
    } = useTracks(conferenceId);

    const {
        data: eventTypes,
        isLoading: eventTypesLoading,
        isValidating: eventTypesValidating,
    } = useEventTypes(conferenceId);

    const {
        data: halls,
        isLoading: hallsLoading,
        isValidating: hallsValidating,
    } = useHalls(conferenceId);

    const {
        data: slots,
        isLoading: slotsLoading,
        isValidating: slotsValidating,
    } = useSlots(conferenceId);

    const {
        isStarted: isLoading,
        remainingProgress: loadingProgress,
    } = calculateProgress(eventsLoading, speakersLoading, tracksLoading, eventTypesLoading, hallsLoading, slotsLoading);
    
    const {
        isStarted: isValidating,
        remainingProgress: validatingProgress,
    } = calculateProgress(eventsValidating, speakersValidating, tracksValidating, eventTypesValidating, hallsValidating, slotsValidating);

    return {
        events,
        speakers,
        tracks,
        eventTypes,
        halls,
        slots,
        isLoading,
        loadingProgress,
        isValidating,
        validatingProgress,
    };
}
