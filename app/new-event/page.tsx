import { FormEvent } from "@/components/FormEvent";

export default function NewEvent() {
  return (
    <main className="pt-[80px] container">
      <FormEvent type="add" />
    </main>
  );
}
