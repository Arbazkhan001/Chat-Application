import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updatePreferences = async (req, res) => {
	try {
	  const { userId, bgImage } = req.body;
  
	  // Validate input
	  if (!userId || !bgImage) {
		return res.status(400).send('Bad Request: Missing required fields');
	  }
  
	  // Check if the user exists
	  const existingUser = await User.findById(userId);
	  if (!existingUser) {
		return res.status(404).send('User not found');
	  }
  
	  // Update or create user preferences
	  let user = await User.findOneAndUpdate({ _id: userId }, { bgImage }, { upsert: true, new: true });
  
	  console.log("Preferences updated successfully for user:", userId);
	  res.status(200).send('Preferences updated successfully');
	} catch (error) {
	  console.error("Error updating preferences:", error);
	  res.status(500).send('Error updating preferences');
	}
  };
  
  // Controller function to retrieve user preferences
  export const getUserPreferences = async (req, res) => {
	try {
	  const { userId } = req.params;
  
	  // Validate input
	  if (!userId) {
		return res.status(400).send('Bad Request: Missing user ID');
	  }
  
	  // Check if the user exists
	  const existingUser = await User.findById(userId);
	  if (!existingUser) {
		return res.status(404).send('User not found');
	  }
  
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).send('User not found');
	  }
  
	  res.status(200).json({ bgImage: user.bgImage });
	} catch (error) {
	  console.error("Error retrieving preferences:", error);
	  res.status(500).send('Error retrieving preferences');
	}
  };
