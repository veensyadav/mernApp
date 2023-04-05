const AppError = require("../../utill/appError");
const catchAsync = require("../../utill/catchAsync");
const db = require("../../db-setup");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create main model
const User = db.userAuth;

/* API for sign Up and alert mail send*/

exports.userSignup = catchAsync(async (req, res, next) => {
  const emailExists = await User.findOne({
    where: { email: req.body.email },
  });
  const password = await bcrypt.hash(req.body.password, 8);
  if (emailExists) {
    return next(new AppError("Email already registered", 404));
  } else {
    const newUserDetails = await User.create({
        userName: req.body.userName,
        name: req.body.name,
        email: req.body.email,
        password: password,
        phoneNumber: req.body.phoneNumber,
        userType: "user"
    });

    res.status(200).json({
      status: "success",
      data: {
        user: newUserDetails,
      },
    });
  }
});

/* API for login */

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
        console.log(isMatch,"isMatch");
      if (isMatch) {
        const token = jwt.sign({ id: user.id }, "secret", {
          expiresIn: "24hr",
        });

        return res.send({
          object: "user",
          data: { user, token },
          message: "signin success",
        });
      } else {
        return next(new AppError("Please enter a valid password", 404));
      }
  } else {
    return next(new AppError("user not found", 404));
  }
});

