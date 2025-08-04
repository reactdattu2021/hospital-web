require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");
const initialDoctors = require("./data");

const app = express();
const port = 3000;
// Connect to MongoDB
connectDB();
app.use(cors());
app.use(express.json());
const seedDatabase = async () => {
  try {
    const doctorsCount = await Doctor.countDocuments();
    if (doctorsCount === 0) {
      await Doctor.insertMany(initialDoctors);
      console.log("Database seeded with initial doctor data.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();

// --- API Endpoints ---

// CRUD operations for Doctors (Admin functionality)

// POST: Add a new doctor
app.post("/doctors", async (req, res) => {
  // In a real-world app, you would add authentication here
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error });
  }
});

// PUT: Update an existing doctor
app.put("/doctors/:id", async (req, res) => {
  // In a real-world app, you would add authentication here
  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error });
  }
});

// DELETE: Remove a doctor
app.delete("/doctors/:id", async (req, res) => {
  // In a real-world app, you would add authentication here
  try {
    const result = await Doctor.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing doctor", error });
  }
});

// Existing read routes for all doctors and a single doctor
app.get("/doctors", async (req, res) => {
  const { query } = req.query;
  try {
    let doctors;
    if (query) {
      const regex = new RegExp(query, "i");
      doctors = await Doctor.find({
        $or: [
          { name: { $regex: regex } },
          { specialization: { $regex: regex } },
          { id: query }, // exact match on your custom doctor id
        ],
      });
    } else {
      doctors = await Doctor.find({});
    }
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

app.get("/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ id: req.params.id });
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
});

// Existing booking route
app.post("/appointments", async (req, res) => {
  const { patientName, email, doctor, date, time } = req.body;

  if (!patientName || !email || !doctor || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let doctorData = null;

    // Try by custom id or name first
    doctorData = await Doctor.findOne({
      $or: [{ id: doctor }, { name: doctor }],
    });

    // If still not found and it's a valid ObjectId, try _id
    if (!doctorData && mongoose.Types.ObjectId.isValid(doctor)) {
      doctorData = await Doctor.findById(doctor);
    }

    if (!doctorData) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const newAppointment = new Appointment({
      patientName,
      email,
      doctor: doctorData._id,
      date,
      time,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
});
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
