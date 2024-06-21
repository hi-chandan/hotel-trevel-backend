import jwt from "jsonwebtoken";

export const tokenservice = (user: any, res: any) => {
  const accessToken = jwt.sign(user.id, "Thisistoken");
  const refreshToken = jwt.sign(user.email, "Thisistoken");

  res.cookie("accessToken", accessToken, {
    maxAge: 3000000,
    httpOnly: true,
    secure: true, // This should be true for cross-site cookies over HTTPS
    sameSite: "None",
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 6000000,
    httpOnly: true,
    secure: true, // This should be true for cross-site cookies over HTTPS
    sameSite: "None",
  });
};
