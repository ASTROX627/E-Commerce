export interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponseBody {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  id: string;
  email: string;
  accessToken: string
}
