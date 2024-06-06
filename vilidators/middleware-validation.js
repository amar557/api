export const validate = (schema) => async (req, res, next) => {
  try {
    const validation = await schema.parseAsync(req.body);
    req.body = validation;
    // res.send({ bo: req.body });
    next();
  } catch (error) {
    let statu = 400;
    let extradetails = error.issues[0].message;
    const errors = { statu, extradetails };
    next(errors);
  }
};
