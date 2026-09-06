import { SigninForm } from "../signin/-components/signin-form";
import { SignupForm } from "./-components/signup-form";
import Link from "next/link";

export default async function Signup() {
  return (
    <div className="container lg:flex justify-between mx-auto">
      <SigninForm className="hidden lg:block"/>
      <SignupForm />
      <div className="flex items-center justify-center mt-4 gap-x-2 lg:hidden">
        <p className="text-sm">Do you have an account?</p>
        <Link href="/signin" className="text-selected-text font-semibold">
          Sign in
        </Link>
      </div>
    </div>
  );
}
