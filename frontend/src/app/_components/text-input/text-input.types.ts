export type TextInputType = {
  label: string;
  placeholder: string;
  htmlFor: "email" | "password" | "confirm-password" | "name";
  inputId: "email" | "password" | "confirm-password" | "name";
  icon?: React.ReactNode;
  type: "text" | "password"
}
