import { StatusCodes } from "http-status-codes";

import Site from "../database/Site.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";

//controller for handling adding, removing, and checking for favorite sites

const addFav = async (req, res) => {
  const { siteId } = req.body;
  if (!siteId) {
    throw new BadRequestError("Please provide site id");
  }

  const siteAlreadyExists = await Site.findOne({
    createdBy: req.user.userId,
    siteId,
  });
  if (siteAlreadyExists) {
    throw new BadRequestError("Site already in favorites");
  }

  //from authentication middleware
  req.body.createdBy = req.user.userId;

  const favSite = await Site.create(req.body);
  res.status(StatusCodes.CREATED).json({ favSite });
};

const deleteFav = async (req, res) => {
  const { id } = req.params;
  const site = await Site.findOne({
    createdBy: req.user.userId,
    siteId: id,
  });

  if (!site) {
    throw new NotFoundError(`No site with id: ${id}`);
  }

  //prevent other users from deleting fav site
  if (req.user.userId !== site.createdBy.toString()) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }

  await site.remove();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Site successfully removed from favorites" });
};

const getAllFavs = async (req, res) => {
  const { sort } = req.query;

  let result = Site.find({ createdBy: req.user.userId });

  //chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("siteName");
  }
  if (sort === "z-a") {
    result = result.sort("-siteName");
  }

  //pagination logic
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const favs = await result;
  const totalFavs = await Site.countDocuments({ createdBy: req.user.userId });
  const numOfPages = Math.ceil(totalFavs / limit);

  res.status(StatusCodes.OK).json({ favs, totalFavs, numOfPages });
};

const getOneFav = async (req, res) => {
  const { id } = req.params;
  const site = await Site.findOne({
    createdBy: req.user.userId,
    siteId: id,
  });
  if (!site) {
    res.status(StatusCodes.OK).json({ msg: "No site found with that id" });
  } else {
    res.status(StatusCodes.OK).json({ site });
  }
};

export { addFav, deleteFav, getAllFavs, getOneFav };
