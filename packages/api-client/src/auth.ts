import type { AxiosInstance } from "axios";
import {
  loginRequestSchema,
  loginResponseSchema,
  type LoginRequest,
  type LoginResponse,
} from "@event-platform/validators";

export function authApi(client: AxiosInstance) {
  return {
    async login(payload: LoginRequest): Promise<LoginResponse> {
      // validate request shape before sending
      const body = loginRequestSchema.parse(payload);

      const res = await client.post("/api/auth/login", body);

      // validate response shape from server
      return loginResponseSchema.parse(res.data);
    },
  };
}
