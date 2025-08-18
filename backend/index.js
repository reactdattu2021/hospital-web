const upload = require("./middleware/upload");
const { v4: uuidv4 } = require('uuid'); // ✅ Add this at the top
const cloudinary = require("./utils/cloudinary");
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

// POST: Add a new doctor with image upload
// POST /doctors route
app.post("/doctors", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, specialization, bio } = req.body;

    let availability = [];
    if (req.body.availability) {
      availability = JSON.parse(req.body.availability);
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Convert buffer to base64 & upload
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;
    const uploadResult = await cloudinary.uploader.upload(dataURI);

    // Generate UUID for doctor id
    const uuidId = uuidv4();

    const newDoctor = new Doctor({
      id: uuidId,
      name,
      specialization,
      bio,
      profileImage: uploadResult.secure_url,
      availability,
    });

    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({ error: "Failed to create doctor" });
  }
});


// Update doctor text info (no image)
app.put("/doctors/:id", async (req, res) => {
  try {
    console.log("Updating doctor id:", req.params.id);
    console.log("Payload:", req.body);

    const updatedDoctor = await Doctor.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Error updating doctor", error });
  }
});

// Update doctor profile image only
app.put("/doctors/:id/image", upload.single("profileImage"), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ id: req.params.id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "doctors",
    });

    doctor.profileImage = result.secure_url;
    await doctor.save();

    res.status(200).json({
      message: "Doctor image updated successfully",
      profileImage: doctor.profileImage,
    });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Error updating image", error });
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

