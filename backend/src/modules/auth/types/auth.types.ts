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

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  id: string;
  email: string;
  accessToken: string
}

export interface EmailRequestBody {
  email: string;
  otp?: string;
  newPassword?: string;
}

export interface EmailResponseBody {
  email: string;
  accessToken: string;
}
