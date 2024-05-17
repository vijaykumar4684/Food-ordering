import User from "../models/user.js"

const getCurrentUser = async (req,res) =>{
    try {
        const currentUser = await User.findOne({_id:req.userid});
        if (!currentUser) {
            return res.status(404).json({message:"User not Found"});
        }
         res.json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Somthing went wrong"});
    }
};

const createCurrentUser = async (req,res) => {
    try {
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id});
        if (existingUser) {
            return res.status(200).send();
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error creating User"});
    }
};

const updateCurrentUser = async ( req, res) => {
    try {
        const {name, addressLine1, country, city} = req.body;
        const user = await User.findById(req.userid);

        if (!user) {
            return res.status(404).json({message:"User not found"});
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating user"});
    }
};

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
};