import bcrupt from "bcrypt";
export const hashPassword = async (password) => {
  try {
    const saltRounds = 5;
    const hashedPassword = await bcrupt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// compare password
export const comparePassword = async (password, hashedPassword) => {
  return bcrupt.compare(password, hashedPassword);
};
