"use client";
import React, { useEffect, useState } from "react";
import "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      if (userType.length == 0) {
        alert("Please select user type");
      } else if (email.length == 0) {
        alert("Please enter email address");
      } else if (password.length == 0) {
        alert("Please enter password");
      } else if (password.length < 6) {
        alert("Password should be greater than 6 alpha numeric characters");
      } else {
        var res = await signInWithEmailAndPassword(email, password);
        console.log({ res });
        if (res) {
          console.log("User logged in successfully");
          setEmail("");
          setPassword("");
          sessionStorage.Email = email;
          sessionStorage.UserType = userType;
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="row">
      <br />
      <br />
      <form>
        <div className="login-form">
          <div className="row">
            <div className="col-md-4">
              <div className="checkbox-design">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Admin"
                  id="Admin"
                  value="Admin"
                  onClick={() => setUserType("Admin")}
                />
                <label className="form-check-label">Admin</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkbox-design">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Faculty"
                  id="Faculty"
                  value="Faculty"
                  onClick={() => setUserType("Faculty")}
                />
                <label className="form-check-label">Faculty</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkbox-design">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Student"
                  id="Student"
                  value="Student"
                  onClick={() => setUserType("Student")}
                />
                <label className="form-check-label">Student</label>
              </div>
            </div>
          </div>
          <div className="txt-label-block">
            <label>Username</label>
            <input
              type="email"
              className="form-control"
              id="input_Username"
              aria-describedby="emailHelp"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="txt-label-block">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="input_Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label">Remember me</label>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
          <div className="form-group">
            <label className="form-group-label">Forget Password</label>
          </div>
          <div className="form-group">
            <label className="form-group-label">
              Don't have an account?
              <label
                className="btn-warning"
                onClick={() => router.push("./Register")}
              >
                Register here
              </label>
            </label>
          </div>
        </div>
        <div className="col-md">
          <img
            alt=""
            src=""
            width="50%"
            style={{ marginTop: "100px", marginLeft: "60px" }}
          />
        </div>
      </form>
    </div>
  );
}
