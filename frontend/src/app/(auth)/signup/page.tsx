import { Header } from "@/app/_components/header/header";
import { IconAlt, IconShowPass } from "@/app/_components/icons";
import { SignupForm } from "./-components/signup-form";

export default async function Signup() {
  return (
    <>
      <Header />
      <SignupForm/>
    </>
  );
}
