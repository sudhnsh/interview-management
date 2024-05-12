import Candidate from "../models/Candidate.js";

export const addCandidate = async (req, res) => {
  try {
    const { name, status, feedback, stars } = req.body;
    console.log(name, status, feedback, stars);

    const candidate = new Candidate({
      name,
      status,
      feedback,
      stars,
    });

    await candidate.save();
    console.log(`candidate added`);
    res
      .status(201)
      .json({ message: "Candidate added successfully", candidate });
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allCandidate = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    await Candidate.findByIdAndDelete(id);
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editCandidate = async (req, res) => {
  const candidateId = req.params.id;
  const { name, status, feedback, stars } = req.body;

  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { name, status, feedback, stars },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate updated successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
