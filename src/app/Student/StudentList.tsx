"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Student from "../_Model/Student";
import { child, push, ref, set, get, remove } from "firebase/database";
import { database } from "../firebaseConfig";
import { exportToExcel } from "../Component/Excelexport";

export default function StudentList() {
  const router = useRouter();

  const [StudentList, SetStudentList] = useState<Student[]>([]);

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(targetName);
    console.log(targetValue);
    if (targetName == "ContactNumber" && targetValue.length > 10) {
      return;
    }
    //  SetAddStudent((values) => ({ ...values, [targetName]: targetValue }));
  };
  useEffect(() => {
    const studentRef = ref(database, "student");
    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var studentGridList: Student[] = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            studentGridList.push(childData);
          });
          SetStudentList(studentGridList);
          console.log(studentGridList);
        } else {
          console.log("no data found");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="col-md-8">
      <div className="row">
        <div className="col-md-8">
          <h1>Student List</h1>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-secondary"
            onClick={() => exportToExcel(StudentList, "Student Data")}
          >
            Export To Excel
          </button>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-1">Sr.</div>
        <div className="col-md-4">Student Name</div>
        <div className="col-md-3">Contact Number</div>
        <div className="col-md-4">Email</div>
        {/* <div className="col-md-2" style={{ display: "none" }}>
              Action
            </div> */}
        {StudentList.length > 0 &&
          StudentList.map((x, index) => (
            <div className="row" aria-rowindex={index}>
              <div className="col-md-1">{index + 1}</div>
              <div className="col-md-4">{x.StudentName}</div>
              <div className="col-md-3">
                {"   "}
                {x.ContactNumber}
              </div>
              <div className="col-md-4">{x.Email}</div>
              {/* <div className="col-md-2" style={{ display: "none" }}>
                    <button
                      className="from-control btn btn-warning"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>
                    <button className="from-control btn btn-danger">
                      Delete
                    </button>
                  </div> */}
            </div>
          ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
