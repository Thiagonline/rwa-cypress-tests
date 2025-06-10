import { User } from "../../backend/types"; // ajuste o caminho se necessário
import session from "express-session";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: session.Session & {
        cookie: {
          maxAge?: number;
          expires?: Date;
        };
      };
      logout(callback: (err: any) => void): void;
      isAuthenticated(): boolean;
    }
  }
}
