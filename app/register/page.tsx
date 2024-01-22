import { FormAuth } from "@/components/FormAuth";

export default function Register() {
  return (
    <main className="container  pt-[72px] bg-blue-200 h-[100vh]">
      <h1 className="font-inter text-center font-medium mt-10 text-xl">
        If you are already registered, please go to the login page.
      </h1>
      <FormAuth type="register" />
    </main>
  );
}
