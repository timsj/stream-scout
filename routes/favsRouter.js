import express from "express";

import {
  addFav,
  deleteFav,
  getAllFavs,
  getOneFav,
} from "../controllers/favsController.js";

const router = express.Router();

//setup router for favorite sites routes
router.route("/").post(addFav).get(getAllFavs);
router.route("/:id").delete(deleteFav).get(getOneFav);

export default router;
