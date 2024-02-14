const tripModel = require("../models/trip.model");

//Async Function to send all the detals to the database
async function tripAdditionController(req, res) {
  console.log(req.body);
  try {
    let tripDetail = tripModel.Trip({
      tripName: req.body.tripName,
      startDateofJourney: req.body.startDateofJourney,
      endDateofJourney: req.body.endDateofJourney,
      nameOfHotels: req.body.nameOfHotels,
      placesVisited: req.body.placesVisited,
      totalCost: req.body.totalCost,
      tripType: req.body.tripType,
      experience: req.body.experience,
      image: req.body.image,
      shortDescription: req.body.shortDescription,
      featured: req.body.featured,
    });
    await tripDetail.save();
    res.send("Trip added Successfully");
  } catch (error) {
    console.log("ERROR");
    res.send("SOMETHING WENT WRONG");
  }
}

//Asynch funtion to fetch all trip details from the backend using object id because it unique in the database
async function getTripDetailsController(req, res) {
  try {
    tripModel.Trip.find({})
      .then((doc) => res.send(doc))
      .catch((err) => res.send("SOMETHING WENT WRONG WHILE FETCHING"));
  } catch (error) {
    console.log("ERROR");
    res.send("SOMETHING WENT WRONG WHILE FETCHING");
  }
}

//Asynch function to get/fetch a specific trip details from the database using id
async function getTripDetailsByIdController(req,res){
  try {
    tripModel.Trip.findById(req.params.id)
    .then(doc => res.send(doc))
    .catch(err => res.send("NOTHING IN DATABASE"))
    
  } catch (error) {
    console.log("ERROR");
    res.send("SOMETHING WENT WRONG WHILE FETCHING");
}
}


module.exports = { tripAdditionController,getTripDetailsController,getTripDetailsByIdController}
