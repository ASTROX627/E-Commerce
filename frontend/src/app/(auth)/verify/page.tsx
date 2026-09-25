import { ChangeEmail, ResendCode } from "@/app/_components/email";
import { VerifyForm } from "./_components/verify-form";


export default async function Verify() {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="font-semibold text-xl lg:text-2xl">Sign up</h2>
      <h1 className="text-center mt-8 font-medium text-2xl text-base-800 lg:text-3xl">
        Verify your email
      </h1>
      <p className="text-center font-light mt-4 text-base-600 lg:text-xl">
        Enter the verification code sent to your email
      </p>
      <ChangeEmail/>
      <VerifyForm/>
      <ResendCode/>
    </div>
  );
}
