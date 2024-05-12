import express from "express";
import {
  addCandidate,
  allCandidate,
  deleteCandidate,
  editCandidate,
} from "../controller/candidate.js";
import { login, signup } from "../controller/auth.js";

const router = express.Router();

// GET route
router.get("/candidate/all", allCandidate);

// POST route
router.post("/candidate/add", addCandidate);
router.post("/signup", signup);
router.post("/login", login);

// DELETE route
router.delete("/candidate/delete/:id", deleteCandidate);

//PUT route
router.put("/candidate/edit/:id", editCandidate);

export default router;
