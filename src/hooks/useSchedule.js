import useEvents from './useEvents.js';
import useSpeakers from './useSpeakers.js';
import useTracks from './useTracks.js';
import useEventTypes from './useEventTypes.js';
import useHalls from './useHalls.js';
import useSlots from './useSlots.js';
import { addIdAndRelations, calculateProgress } from '../utils.js';
import { useMemo } from 'react';

export default function useSchedule(conferenceId) {
    const {
        data: speakersResponse,
        isLoading: speakersLoading,
        isValidating: speakersValidating,
    } = useSpeakers(conferenceId);

    const speakers = useMemo(() => addIdAndRelations(speakersResponse || []), [speakersResponse]);

    const {
        data: tracksResponse,
        isLoading: tracksLoading,
        isValidating: tracksValidating,
    } = useTracks(conferenceId);

    const tracks = useMemo(() => addIdAndRelations(tracksResponse || []), [tracksResponse]);

    const {
        data: eventTypesResponse,
        isLoading: eventTypesLoading,
        isValidating: eventTypesValidating,
    } = useEventTypes(conferenceId);

    const eventTypes = useMemo(() => addIdAndRelations(eventTypesResponse || []), [eventTypesResponse]);

    const {
        data: hallsResponse,
        isLoading: hallsLoading,
        isValidating: hallsValidating,
    } = useHalls(conferenceId);

    const halls = useMemo(() => addIdAndRelations(hallsResponse || []), [hallsResponse]);

    const {
        data: eventsResponse,
        isLoading: eventsLoading,
        isValidating: eventsValidating,
    } = useEvents(conferenceId);

    const events = useMemo(() => addIdAndRelations(eventsResponse || [], [
        ['event_type', eventTypes, 'event_type_id'],
        ['track', tracks, 'track_id'],
        ['participant_users', speakers, 'participant_user_ids'],
    ]), [eventsResponse, eventTypes, tracks, speakers]);

    const {
        data: slotsResponse,
        isLoading: slotsLoading,
        isValidating: slotsValidating,
    } = useSlots(conferenceId);

    const slots = useMemo(() => addIdAndRelations(slotsResponse || [], [
        ['hall', halls, 'hall_id'],
        ['event', events, 'event_id'],
    ]), [slotsResponse, halls, events]);

    const {
        isStarted: isLoading,
        remainingProgress: loadingProgress,
    } = calculateProgress(eventsLoading, speakersLoading, tracksLoading, eventTypesLoading, hallsLoading, slotsLoading);
    
    const {
        isStarted: isValidating,
        remainingProgress: validatingProgress,
    } = calculateProgress(eventsValidating, speakersValidating, tracksValidating, eventTypesValidating, hallsValidating, slotsValidating);

    const {
        isComplete,
    } = calculateProgress(events, speakers, tracks, eventTypes, halls, slots);

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
        isComplete,
    };
}
