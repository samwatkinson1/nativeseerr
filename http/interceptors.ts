import { z } from "zod";

import { InternalServerError, UnauthorizedError } from "@/http/errors";

const httpErrorSchema = z.object({
  errors: z.array(z.object({ message: z.string(), path: z.string() })),
  message: z.string(),
});

export function mapHttpErrors(error: unknown, response: Response) {
  const httpError = httpErrorSchema.safeParse(error);
  if (!httpError.success) {
    return Promise.reject(new InternalServerError());
  }

  // todo
  switch (response.status) {
    case 401:
      return Promise.reject(new UnauthorizedError(httpError.data.message));
    default:
      return Promise.reject(new InternalServerError());
  }
}
