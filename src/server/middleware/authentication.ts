import { NextFunction, Request, Response } from "express";
const authenticationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.session.user) {
    response.redirect("/auth/login");
  } else {
    // request.session.user = request.body.user;
    response.locals.user = request.session.user;
    next();
  }
};
export default authenticationMiddleware;
/*
 const user = await Users.signup(username, email, password);

        // Store user in session, ignoring TypeScript error for undefined session type
        req.session.user = user;
*/