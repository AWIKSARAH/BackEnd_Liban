import Users from "../Models/Users.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
try {
  
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
  console.log(user);

  const isCorrect = await user.comparePassword(password);
  if(!isCorrect){ return res.status(500).json({ success: false, error: "Inavalid Credentials: Password"}); }

  const token = user.createJWT();
  user.password= undefined;
  // res.status(200).json({ success: true, user: user });
res.status(200).header("Authorization", "Bearer " + token).json({success: true, user: user, token: token});

} catch (error) {
  res.status(500).json({success: false, error: error});
}
};

/**
 * Create a new user 
 * @param {*} req 
 * @param {*} res 
 */
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await Users.find({}).skip(startIndex).limit(limit);
    const total = await Users.countDocuments({});

    if (!users) {
      return res.status(404).json({
        success: false,
        error: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      data: users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
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


/**
 * Function to read a  user by id from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUser = async (req, res ) => {
  const id = req.params.id;
  try {
    const user = await Users.find({_id:id});
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
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
 * Function to read a  user by id from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUserbyName = async (req, res ) => {
  const name = req.query.name;
  try {
    const user = await Users.find({name: name});
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};