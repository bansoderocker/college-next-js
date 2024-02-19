"use client";
import { useEffect, useState, useRef } from "react";
import { child, push, ref, set, get, remove } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { database, storage } from "../firebaseConfig";
import Certificate from "../_Model/Certificate";
import Course from "../_Model/Course";
import Student from "../_Model/Student";

export default function () {
  const [addCertificate, SetAddCertificate] = useState<Certificate>({
    Key: "",
    StudentName: "",
    CourseName: "",
    Year: "",
  });
  const [courseList, SetCourseList] = useState<Course[]>([]);
  const [studentList, SetStudentList] = useState<Student[]>([]);
  const [imageUpload, SetImageUpload] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const CourseRef = ref(database, "course");
    get(CourseRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var CourseGridList: Course[] = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            CourseGridList.push(childData);
          });
          SetCourseList(CourseGridList);
          console.log(CourseGridList);
        } else {
          console.log("no data found");
        }
      })
      .catch((err) => console.log(err));

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

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(targetName);
    console.log(targetValue);

    if (targetName == "certificate_file") {
      SetImageUpload(event.target.files[0]);
    } else {
      SetAddCertificate((values) => ({ ...values, [targetName]: targetValue }));
    }
  };

  const SaveCertificateRecord = () => {
    console.log(addCertificate);
    if (imageUpload == null) {
      return;
    }

    if (addCertificate.StudentName.length == 0) {
      alert("Please Select Student Name");
    } else if (addCertificate.CourseName.length == 0) {
      alert("Please Select Course Name");
    } else if (addCertificate.Year.length == 0) {
      alert("Please Enter Academic Year");
    } else {
      let UniqueIDkey = "";
      if (addCertificate.Key) {
        UniqueIDkey = addCertificate.Key;
      } else {
        UniqueIDkey = "certificates-" + new Date().getTime().toString();
      }

      const imageRef = storageRef(storage, `certificates/${UniqueIDkey}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        console.log("File uploaded");
        const db_ref = child(ref(database), "certificate/" + UniqueIDkey);

        set(db_ref, {
          Key: UniqueIDkey,
          StudentName: addCertificate.StudentName,
          CourseName: addCertificate.CourseName,
          Year: addCertificate.Year,
        });

        SetAddCertificate({
          Key: "",
          StudentName: "",
          CourseName: "",
          Year: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the value of the file input element
        }
        alert("Certificate Data added successfully");
      });
    }
  };
  return (
    <div className="col-md-8">
      <h3>Add Certificate </h3>
      <br />
      <div className="row">
        <div className="txt-label-block">
          <label>Student Name</label>
          <input
            type="select"
            className="form-control"
            id="input_StudentKey"
            list="studentList"
            name="StudentName"
            placeholder="Enter Student Name"
            value={addCertificate?.StudentName}
            onChange={handleChange}
            onKeyDown={(event) => event.preventDefault()}
          />
          <datalist id="studentList">
            {studentList.length > 0 &&
              studentList.map((e, index) => (
                <option key={index} id={index + e.StudentName}>
                  {e.StudentName}
                </option>
              ))}
          </datalist>
          {/* <select
            name="StudentKey"
            value={addCertificate?.StudentName}
            onChange={handleChange}
          >
            <option value="">Select Student</option>
            {studentList.length > 0 &&
              studentList.map((x, index) => (
                <option tabIndex={index} key={x.Key} value={x.StudentName}>
                  {x.StudentName{" "}
                </option>
              ))}
          </select> */}
        </div>
        <div className="txt-label-block">
          <label>Course</label>
          <input
            type="text"
            className="form-control"
            id="input_CourseKey"
            name="CourseName"
            list="courseList"
            placeholder="Enter Course"
            value={addCertificate?.CourseName}
            onChange={handleChange}
            onKeyDown={(event) => event.preventDefault()}
          />
          <datalist id="courseList">
            {courseList.length > 0 &&
              courseList.map((e, index) => (
                <option key={index} id={index + e.CourseName}>
                  {e.CourseName}
                </option>
              ))}
          </datalist>
        </div>
        <div className="txt-label-block">
          <label>Duration Year</label>
          <input
            type="text"
            className="form-control"
            id="input_Email"
            name="Year"
            placeholder="Enter Academic Year"
            value={addCertificate?.Year}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Upload Certificate</label>
          <br />
          <input
            type="file"
            name="certificate_file"
            ref={fileInputRef}
            onChange={handleChange}
          />
        </div>

        <div className="txt-label-block">
          <br />
          <button
            className="btn btn-primary"
            style={{ marginLeft: "40%" }}
            onClick={SaveCertificateRecord}
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
