export const emailVerify = async (req, res, next) => {
  try {
    // console.log(req.user);
    const admin = req.user.isAdmin;
    if (!admin) {
      res.status(200).send({ message: "hithere churee krnay ay ho" });
      next(error);
    }
    next();
  } catch (error) {
    // console.log(error);
  }
};
