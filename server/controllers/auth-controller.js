const User = require("../Models/user-model");
const bcrypt = require("bcrypt");
const home = async (req, res) => {
  try {
    res.send("Home Page is working");
  } catch (error) {
    console.error("Error in home controller:", error);
    res.status(500).send("Server error");
  }
};

const signup = async (req, res) => {
  try {
    const {username , phonenumber ,password} = req.body;
    const userExist = await User.findOne({phonenumber:phonenumber});
    if(userExist){
      return res.status(400).json({message:"User already exists"});
    }
    const salt = 10;
    const hashedPassword =  await bcrypt.hash(password,salt);
    

    const Newuser = await User.create({username,phonenumber,password:hashedPassword});
    res.status(201).json({ message:"User created successfully", user:Newuser});
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  try {
    const {username , password} = req.body;
    const user = await User.findOne({username:username});
    if(!user){
      return res.status(400).json({message:"Invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"});
    }
    // return JSON instead of plain text so client can call response.json()
    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).send("Server error");
  }
};

const logout = async (req, res) => {
  try {
    res.send("Logout Page is working");
  } catch (error) {
    console.error("Error in logout controller:", error);
    res.status(500).send("Server error");
  }
};

module.exports = { home, signup, login, logout };