"use client";

import { FormEvent } from "@/components/FormEvent";
import { useParams } from "next/navigation";

export default function EventUpdate() {
  const params = useParams();
  console.log(params?.id);
  return (
    <main className="mt-[50px] container">
      This is update page
      <FormEvent type="update" id={params?.id} />
    </main>
  );
}
