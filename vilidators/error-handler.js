export default function handleErrors(err, req, res, next) {
  // console.log(err);
  let statu = err.statu || 500;
  let message = err.message || "backend error";
  let extradetails = err.extradetails || "da sarre zaman na dee";
  return res.status(statu).json({ message, extradetails });
}
