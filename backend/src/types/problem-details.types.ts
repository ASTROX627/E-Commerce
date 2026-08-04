export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string | undefined;
  instance?: string | undefined;
  [key: string]: unknown;
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors: Record<string, string[]>;
}
