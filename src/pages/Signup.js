import React, { useState } from "react";
import { initiateSignup, verifyOtp } from "../services/api";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await initiateSignup(user);
      setShowOtpField(true);
      setMessage("OTP sent to your email. Please enter it to complete registration.");
    } catch (err) {
      console.error(err);
      setMessage("Signup failed. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      email: user.email,
      otp: parseInt(otp),
      user: user,
    };

    const res = await verifyOtp(payload);
    setMessage("Registration successful! Redirecting to login...");
    setShowOtpField(false);

    // Clear form
    setUser({ firstName: "", lastName: "", email: "", password: "", role: "USER" });
    setOtp("");

    // Redirect after short delay
    setTimeout(() => navigate("/login"), 1000);
  } catch (err) {
    console.error(err);
    setMessage("OTP verification failed. Please try again.");
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Sign Up</h2>

      {!showOtpField ? (
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>First Name</label>
            <input type="text" name="firstName" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input type="text" name="lastName" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select name="role" className="form-select" onChange={handleChange}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-3">
            <label>Enter OTP</label>
            <input type="number" className="form-control" required value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success">Verify OTP</button>
        </form>
      )}

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Signup;
