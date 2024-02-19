"use client";
import React, { useEffect, useState } from "react";
import "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";
import { child, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async () => {
    try {
      // await auth.signInWithEmailAndPassword(email, password);
      if (userType.length == 0) {
        alert("Please select user type");
      } else if (email.length == 0) {
        alert("Please enter email address");
      } else if (password.length == 0) {
        alert("Please enter password");
      } else if (password.length < 6) {
        alert("Password should be greater than 6 alpha numeric characters");
      } else {
        const res = await createUserWithEmailAndPassword(email, password);
        let userKey = "";
        if (res) {
          userKey = res?.user.uid;
        } else {
          userKey = "user-" + new Date().getTime().toString();
        }
        const db_ref = child(ref(database), "user/" + userKey);

        set(db_ref, {
          Key: userKey,
          Email: email,
          UserType: userType,
        });
        console.log({ res });
        if (res) {
          //  setUser(res);
          setEmail("");
          setPassword("");
          setUserType("");
          router.push("/");
          console.log("User logged in successfully");
        }
      }
    } catch (error) {
      console.error("Error signing up:" + error);
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
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
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
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
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
                  value="option2"
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
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>
          {/* <div className="form-group">
            <label className="form-group-label">Forget Password</label>
  </div>*/}
          <div className="form-group">
            <label className="form-group-label">
              Already have an account?
              <label
                className="btn-warning"
                onClick={() => router.push("./Login")}
              >
                Login here
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
