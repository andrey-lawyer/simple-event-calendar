"use client";

import { useParams } from "next/navigation";

import { FormEvent } from "@/components/FormEvent";

export default function EventUpdate() {
  const params = useParams();
  console.log(params?.id);
  return (
    <main className="pt-[80px] container">
      <FormEvent type="update" id={params?.id} />
    </main>
  );
}
