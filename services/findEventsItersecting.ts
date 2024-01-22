import { IEventForm } from "@/types/eventForm";

const doEventsIntersect = (event1: IEventForm, event2: IEventForm) => {
  const start1 = event1.start;
  const end1 = start1 + event1.duration;

  const start2 = event2.start;
  const end2 = start2 + event2.duration;

  return (start1 < end2 && end1 > start2) || (start2 < end1 && end2 > start1);
};

export const findIntersectingEvents = (events: IEventForm[]) => {
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const event1 = events[i];
      const event2 = events[j];

      if (doEventsIntersect(event1, event2)) {
        if (!event1.intersect) {
          event1.intersect = 1;
        }
        if (!event2.intersect) {
          event2.intersect = event1.intersect === 1 ? 2 : 1;
        }
      }
    }
  }

  return events;
};
