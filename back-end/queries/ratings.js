const db = require("../db/dbConfig.js");

//Index -- all ratings
const getRatings = async () => {
  try {
    console.log("Listing all ratings for dev purposes");
    const ratings = await db.any("SELECT * FROM ratings ORDER BY id ASC");
    return ratings;
  } catch (error) {
    return error;
  }
};

// --Routes--

// Create rating
const leaveRating = async (rating) => {
  try {
    console.log("Adding rating to request");
    rating = await db.one(
      "INSERT INTO ratings (rating, request_id, rating_user, rated_user) VALUES ($1, $2, $3, $4) RETURNING *",
      [rating.rating, rating.request_id, rating.rating_user, rating.rated_user]
    );
  } catch (error) {
    return error;
  }
};

// Single Rating
const viewRating = async (id) => {
  try {
    console.log("Viewing single rating");
    rating = await db.one("SELECT * FROM ratings WHERE id=$1", id);
    return rating;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getRatings,
  leaveRating,
  viewRating
};
