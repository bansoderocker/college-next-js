import { useEffect, useState } from "react";
import Student from "../_Model/Student";
import { child, push, ref, set, get, remove } from "firebase/database";
import { database } from "../firebaseConfig";
export default function AddStudent() {
  const [addStudent, SetAddStudent] = useState<Student>({
    Key: "",
    StudentName: "",
    ContactNumber: "",
    Email: "",
    Password: "",
    Address: "",
  });

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(targetName);
    console.log(targetValue);
    if (targetName == "ContactNumber" && targetValue.length > 10) {
      return;
    }
    SetAddStudent((values) => ({ ...values, [targetName]: targetValue }));
  };

  const SaveStudentRecord = () => {
    console.log(addStudent);

    if (addStudent.StudentName.length == 0) {
      alert("Please Enter Student Name");
    } else if (addStudent.ContactNumber.length != 10) {
      alert("Please Enter Contact Number");
    } else if (addStudent.Email.length == 0) {
      alert("Please Enter Email");
    } else if (addStudent.Password.length < 6) {
      alert("Password length should be greater than 6 characters or numbers. ");
    } else if (addStudent.Address.length == 10) {
      alert("Please Enter Address");
    } else {
      let UniqueIDkey = "";
      if (addStudent.Key) {
        UniqueIDkey = addStudent.Key;
      } else {
        UniqueIDkey = "student-" + new Date().getTime().toString();
      }
      const db_ref = child(ref(database), "student/" + UniqueIDkey);

      set(db_ref, {
        Key: UniqueIDkey,
        StudentName: addStudent.StudentName,
        ContactNumber: addStudent.ContactNumber,
        Email: addStudent.Email,
        Password: addStudent.Password,
        Address: addStudent.Address,
      });

      SetAddStudent({
        Key: "",
        StudentName: "",
        ContactNumber: "",
        Email: "",
        Password: "",
        Address: "",
      });

      alert("Student Data added successfully");
    }
  };
  return (
    <div className="col-md-8">
      <h3>Add Student</h3>
      <br />
      <div className="row">
        <div className="txt-label-block">
          <label>Student Name</label>
          <input
            type="text"
            className="form-control"
            id="input_StudentName"
            aria-describedby="emailHelp"
            name="StudentName"
            placeholder="Enter Student Name"
            value={addStudent?.StudentName}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Contact Number</label>
          <input
            type="number"
            className="form-control"
            id="input_ContactNumber"
            name="ContactNumber"
            placeholder="Enter Contact Number"
            value={addStudent?.ContactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            id="input_Email"
            name="Email"
            placeholder="Enter Email"
            value={addStudent?.Email}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Password</label>
          <input
            type="text"
            className="form-control"
            id="input_Password"
            name="Password"
            placeholder="Enter Password"
            value={addStudent?.Password}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            id="input_Address"
            aria-describedby="emailHelp"
            placeholder="Enter Address"
            name="Address"
            value={addStudent?.Address}
            onChange={handleChange}
          />
        </div>

        <div className="txt-label-block">
          <br />
          <button
            className="btn btn-primary"
            style={{ marginLeft: "40%" }}
            onClick={SaveStudentRecord}
          >
            Save Record
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      <div className="txt-label-block"></div>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
