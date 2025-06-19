import jwt from "jsonwebtoken";
import { findUserById } from "../Repository/User.Repo.js";

const isLoggedin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token from frontend", typeof token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await findUserById(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, token not provided" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { isLoggedin, isAdmin };
