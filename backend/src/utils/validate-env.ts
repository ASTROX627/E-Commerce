export function validateEnv(
  vars: Record<string, string | string | undefined>,
): void {
  const missing = Object.entries(vars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if(missing.length > 0){
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}`,
    );
  }
}
