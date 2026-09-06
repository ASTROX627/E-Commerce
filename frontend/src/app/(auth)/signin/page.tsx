import Link from "next/link";
import { SigninForm } from "./-components/signin-form";
import { SignupForm } from "../signup/-components/signup-form";

export default async function Signin() {
  return (
    <div className="container lg:flex justify-between mx-auto">
      <SigninForm/>
      <SignupForm className="hidden lg:block"/>
      <div className="flex items-center justify-center mt-4 gap-x-2 lg:hidden">
        <p className="text-sm">Don't have an account?</p>
        <Link href="/signup" className="text-selected-text font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
}
