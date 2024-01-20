export const dynamic = "force-dynamic";

import { ButtonAdd } from "@/components/ButtonAdd";
import { ButtonDelete } from "@/components/ButtonDelete";
import { ButtonUpdate } from "@/components/ButtonUpdate";
import { getAllEvents } from "@/services/apiGetAllEvents";
import { IEvents } from "@/types/eventForm";

export default async function Events() {
  const oldData = JSON.stringify(await getAllEvents());
  const data = JSON.parse(oldData) as IEvents;

  return (
    <main className="mt-[50px] container">
      This is Event page
      {data?.data &&
        data?.data.length > 0 &&
        data?.data.map((el) => (
          <li key={el._id}>
            <p>start {el.start}</p>
            <p>duration {el.duration}</p>
            <p>title {el.title}</p>
            <ButtonUpdate path={el._id} />
            <ButtonDelete idEvent={el._id} />
          </li>
        ))}
      <ButtonAdd />
    </main>
  );
}
