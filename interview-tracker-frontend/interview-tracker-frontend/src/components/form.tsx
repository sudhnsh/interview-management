import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form.css";
import StarRating from "./StarRating";

interface Candidate {
  _id: string;
  name: string;
  status: string;
  feedback: string;
  stars: number;
}

const CandidateInterviewForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("Pending");
  const [feedback, setFeedback] = useState<string>("");
  const [stars, setStars] = useState<number>(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editCandidate, setEditCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get<{ candidates: Candidate[] }>(
          "http://101.0.62.118/32/candidate/all"
        );
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/candidate/add", {
        name,
        status,
        feedback,
        stars,
      });
      console.log("Form data sent successfully");

      const response = await axios.get<{ candidates: Candidate[] }>(
        "http://localhost:5000/candidate/all"
      );
      setCandidates(response.data.candidates);

      setName("");
      setStatus("Pending");
      setFeedback("");
      setStars(0);

      setShowForm(false);
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/candidate/delete/${id}`);
      console.log("Candidate deleted successfully");

      const response = await axios.get<{ candidates: Candidate[] }>(
        "http://localhost:5000/candidate/all"
      );
      setCandidates(response.data.candidates);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const handleEdit = (candidate: Candidate) => {
    setEditCandidate(candidate);
    setName(candidate.name);
    setStatus(candidate.status);
    setFeedback(candidate.feedback);
    setStars(candidate.stars);
    setShowForm(true);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/candidate/edit/${editCandidate!._id}`,
        { name, status, feedback, stars }
      );
      console.log("Form data edited successfully");

      const response = await axios.get<{ candidates: Candidate[] }>(
        "http://localhost:5000/candidate/all"
      );
      setCandidates(response.data.candidates);

      setName("");
      setStatus("Pending");
      setFeedback("");
      setStars(0);
      setEditCandidate(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error editing form data:", error);
    }
  };

  const renderStars = (stars: number) => {
    const starComponents: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        starComponents.push(
          <span key={i} style={{ color: "gold" }}>
            &#9733;
          </span>
        );
      } else {
        starComponents.push(
          <span key={i} style={{ color: "gray" }}>
            &#9733;
          </span>
        );
      }
    }
    return starComponents;
  };

  return (
    <div className="candidate-form">
      <h1>Candidate Interview Form</h1>

      <h1>Existing Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Stars</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.status}</td>
              <td>{candidate.feedback}</td>
              <td>{renderStars(candidate.stars)}</td>
              <td className="actions">
                <button
                  style={{ width: "50%" }}
                  onClick={() => handleDelete(candidate._id)}
                >
                  Delete
                </button>
                <button
                  style={{ width: "50%", marginLeft: "5px" }}
                  onClick={() => handleEdit(candidate)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ width: "100%" }} onClick={() => setShowForm(!showForm)}>
        Add Candidate
      </button>
      {showForm && (
        <div className="add-candidate-form">
          <h1>{editCandidate ? "Edit Candidate" : "Add Candidate"}</h1>
          <form onSubmit={editCandidate ? handleEditSubmit : handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Stars:</label>
              <StarRating stars={stars} onChange={(value) => setStars(value)} />
            </div>
            <button type="submit" style={{ width: "100%" }}>
              {editCandidate ? "Save Changes" : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CandidateInterviewForm;
