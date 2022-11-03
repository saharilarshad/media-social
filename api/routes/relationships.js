import express from "express"
import {getFollows,addFollow,unFollow} from "../controllers/relationship.js"

const router = express.Router();


router.get("/", getFollows)
router.post("/", addFollow)
router.delete("/", unFollow)



export default router;