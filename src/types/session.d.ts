// import { User } from "../server/db/users";
import "express-session";

type User = {
  id: number;
  username: string;
  email: string;
};

declare module "express-session" {
  interface Session {
    user?: User;
  }
}
