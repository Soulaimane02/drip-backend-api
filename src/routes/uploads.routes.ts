import express from "express";
import path from "path";

const router = express.Router();

router.use("/profile-pictures", express.static(path.join(__dirname, "../../uploads/profile-pictures")));
router.use("/article-pictures", express.static(path.join(__dirname, "../../uploads/article-pictures")));

export default router;
