import { UserDocument } from "../../src/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
      validatedData?: unknown;
    }
  }
}