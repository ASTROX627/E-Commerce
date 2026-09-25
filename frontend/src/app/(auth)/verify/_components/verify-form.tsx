"use client";

import { OtpInput } from "@/app/_components/otp-input";
import { useOtpInput } from "@/hooks/otp/use-otp-input";

export const VerifyForm: React.FC = () => {
  const{values, inputsRef, handleChange, handleBackSpace, handlePaste, getOtpCode, isComplete} = useOtpInput();
  return (
    <form className="flex flex-col mt-6">
      <div className="mx-auto mt-8">
        {
          values.map((val, index) => (
            <OtpInput
              key={index}
              inputRef={(el) => {
                inputsRef.current[index] = el;
              }}
              value={val}
              onChange={(value) => handleChange(index, value)}
              onBackSpace={() => handleBackSpace(index)}
              onPaste={handlePaste}
            />
          ))
        }
      </div>
      <div className="mx-auto mt-8">
        <button className="bg-base-300 text-white h-14 rounded-md cursor-pointer lg:w-94">
          Verify Email
        </button>
      </div>
    </form>
  );
};
