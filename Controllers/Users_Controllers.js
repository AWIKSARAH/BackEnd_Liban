import Users from "../Models/Users.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(500)
      .json({ success: false, error: "Enter A Correct Information" });

  const user = await Users.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(500)
      .json({ success: false, error: "Inavalid Credentials: Email" });
  }
  const isCorrect = await user.comparePassword(password);
  if(!isCorrect){ return res.status(500).json({ success: false, error: "Inavalid Credentials: Password"}); }

  const token = user.createJWT();
  user.password= undefined;
  // res.status(200).json({ success: true, user: user });
res.status(200).header("Authorization", "Bearer " + token).json({success: true, user: user, token: token});

};
export const createUser = async (req, res) => {
  const { name, email, password, IsAdmin } = req.body;

  try {
    const user = await Users.create({ name, email, password, IsAdmin });

    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
/**
 * Function to read all users from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    if (!users) {
      return res.status(404).json({
        success: false,
        error: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
/**
 * Function to Delete a user from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      error: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

/**
 * function to Update user profile
 */
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
