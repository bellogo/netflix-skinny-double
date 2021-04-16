import bcrypt from "bcrypt";

export default password => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};
