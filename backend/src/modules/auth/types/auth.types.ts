export interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponseBody {
  id: string;
  name: string;
  email: string;
}
