import { ButtonAdd } from "@/components/ButtonAdd";
import { ButtonDelete } from "@/components/ButtonDelete";
import { ButtonUpdate } from "@/components/ButtonUpdate";
import { TitleEvents } from "@/components/TitleEvents";

import { arrayTime1, arrayTime2, seventeen } from "@/data/timeData";

import { getAllEvents } from "@/services/apiGetAllEvents";
import { findIntersectingEvents } from "@/services/findEventsItersecting";

import { IEventForm, IEvents } from "@/types/eventForm";

export default async function Events() {
  const oldData = JSON.stringify(await getAllEvents());
  const data = JSON.parse(oldData) as IEvents;

  const events = data.data;

  const eventsWithIntersect = findIntersectingEvents(events);

  const dataFirstColumn = eventsWithIntersect.filter((el) => el.start < 300);
  const dataSecondColumn = eventsWithIntersect.filter((el) => el.start >= 300);

  // logic for events with start + dauration >300 (13-00)
  let newArray: IEventForm[] = [];
  const newArrayFirst = dataFirstColumn.map((el) => {
    if (el.start + el.duration > 300) {
      const newDuration = 300 - el.start;
      newArray.push({
        title: "",
        start: 300,
        duration: el.duration - newDuration,
        intersect: el?.intersect,
      });
      el.duration = newDuration;
      return el;
    }
    return el;
  });
  const newArraySecond = [...dataSecondColumn, ...newArray];
  // logic for events with start + duration >300 (13-00)

  return (
    <main className="pt-[80px] pb-[40px]  container">
      <TitleEvents />
      <div className="md:flex gap-10 justify-center mb-5 xl:gap-20">
        <div className="w-[300px] relative mx-auto md:mx-0 z-[0]">
          <div>
            {arrayTime1.map((el, ind) => (
              <div className="border-t border-solid border-gray-400 " key={ind}>
                <p className="h-[59.6px] text-base">{el[0]}</p>
                <p className="h-[59.6px] text-xs">{el[1]}</p>
              </div>
            ))}
          </div>
          {newArrayFirst &&
            newArrayFirst.length > 0 &&
            newArrayFirst.map((el, ind) => (
              <div
                key={ind}
                style={{
                  top: `${el.start * 2 + 1}px`,
                  left: `${el?.intersect === 1 ? "175px" : "50px"}`,
                  width: `${el?.intersect ? "125px" : "250px"}`,
                  height: `${el.duration * 2}px`,
                }}
                className="absolute  bg-event  border-l-2 border-solid border-border px-2 py-[2px]"
              >
                <p
                  style={{
                    width: `${el?.intersect ? "80px" : "200px"}`,
                  }}
                  className="font-inter  text-ellipsis  whitespace-nowrap overflow-hidden w-[100px] "
                >
                  {el.title}
                </p>
                <div className="absolute right-[18px] top-[8px]">
                  <ButtonUpdate path={el._id} />
                </div>
                <div className="absolute right-[2px] top-[6px]">
                  <ButtonDelete idEvent={el._id} />
                </div>
              </div>
            ))}
        </div>
        <div className="w-[300px] relative md:mt-[10px] mx-auto md:mx-0 z-[0]">
          <div>
            {arrayTime2.map((el, ind) => (
              <div className="border-t border-solid border-gray-400" key={ind}>
                <p className="h-[59.6px] text-base">{el[0]}</p>
                <p className="h-[59.6px] text-xs">{el[1]}</p>
              </div>
            ))}
            <p className="border-t border-solid border-gray-400  text-base">
              {seventeen}
            </p>
          </div>
          {newArraySecond &&
            newArraySecond.length > 0 &&
            newArraySecond.map((el, ind) => (
              <div
                key={ind}
                style={{
                  top: `${(el.start - 300) * 2}px`,
                  left: `${el?.intersect === 1 ? "175px" : "50px"}`,
                  width: `${el?.intersect ? "125px" : "250px"}`,
                  height: `${el.duration * 2}px`,
                }}
                className="absolute bg-event  border-l-2 border-solid border-border px-2 py-1"
              >
                {el.title && (
                  <>
                    <p
                      style={{
                        width: `${el?.intersect ? "80px" : "200px"}`,
                      }}
                      className="text-ellipsis  whitespace-nowrap overflow-hidden w-[100px] "
                    >
                      {el.title}
                    </p>

                    <div className="absolute right-[18px] top-[8px]">
                      <ButtonUpdate path={el._id} />
                    </div>
                    <div className="absolute right-[2px] top-[6px]">
                      <ButtonDelete idEvent={el._id} />
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      <ButtonAdd />
    </main>
  );
}
