const loginin = require("../models/loginInformation.model");
const loginValidation = require("../validation/loginValidation");

//let hashedPassword;

exports.authenticate = async (req, res) => {
  // const { errors, isValid } = loginValidation(req.body);

  let { userName, password } = req.body;
  console.log(req.body.userName);
  console.log(req.body.password);
  //const dataForLogin = { userName, password };
  //const getLogin = new loginInformation(dataForLogin);

  const user = loginin
    .find({ userName, password })
    .then(res => console.log(JSON.stringify(res)))
    .catch(err => console.log(err));

  /*if (!user) {
    // errors.userName = "User not found!";
    //return res.status(404).json(errors);
  }

  //const validUser = await bcrypt.compare("dghdhsdhdh", user.password);
  const validUser = user.password;
  console.log("password --> " + user.password);
  if (!validUser) {
    //errors.password = "Password incorrect";
    // return res.status(400).json(errors);
  }*/
};

/*exports.save = async (req, res) => {
  try {
    hashedPassword = await brcypt.hash(req.body.password, 10);
  } catch {
    res.status(500).send();
  }

  const userId = req.body.userId;
  const userName = req.body.userName;
  const password = hashedPassword;
  const activeInd = req.body.activeInd;
  const securityQuesDesc = req.body.securityQuesDesc;
  const securityAnswer = req.body.securityAnswer;

  const result = new loginInformation({
    userId,
    userName,
    password,
    activeInd,
    securityQuesDesc,
    securityAnswer
  });

  result
    .save()
    .then((req, res) => {
      res.status(200).json({ Login: "Login information added successfully !" });
    })
    .catch(err => {
      console.log(err);
      res.status(404).send("Adding login information failed");
    });
};

exports.getUserByName = async (req, res) => {
  const userId = req.body.userId;

  const result = new loginInformation({
    userId
  });

  result
    .findById(userId)
    .then(userid => res.json(userid))
    .catch(err => res.status(400).json("Error: " + err));
};*/
