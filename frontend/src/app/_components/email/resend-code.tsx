"use client";

export const ResendCode: React.FC = () => {
  return (
    <div className="text-center flex items-center justify-center gap-x-2 mt-5">
      <p className="font-medium">You haven't received a code?</p>
      <span className="font-light text-selected-text cursor-pointer">
        Resend
      </span>
    </div>
  );
};
