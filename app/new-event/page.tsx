import { FormEvent } from "@/components/FormEvent";

export default function NewEvent() {
  return (
    <main className="mt-[50px] container">
      <FormEvent type="add" />
    </main>
  );
}
