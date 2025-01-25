import express from "express";
import googleRouter from "../modules/googleApi.js";
const router = express.Router();
router.use("/googleApi", googleRouter);

export default router;
