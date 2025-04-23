import jwt from "jsonwebtoken";
import { User } from "../Models/User.Model.js";
import { findByID } from "../Repository/User.Repo.js";

const isLoggedin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      req.user = await findByID(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, token not provided" });
  }
};

export { isLoggedin };
