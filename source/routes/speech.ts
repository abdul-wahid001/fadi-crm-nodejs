/** source/routes/speech.ts */
import express from "express";
import controller from "../controllers/speech";
const router = express.Router();

router.get("/evaluation", controller.evaluate);

export = router;
