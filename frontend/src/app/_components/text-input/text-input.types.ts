export type TextInputType = {
  label: string;
  placeholder: string;
  htmlFor: "email" | "password" | "confirm-password";
  inputId: "email" | "password" | "confirm-password";
  icon: React.ReactNode;
  type: "text" | "password"
}
