import { useState } from "react";
import Course from "../_Model/Course";
import { child, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";

export default function AddCourse() {
  const [addCourse, SetAddCourse] = useState<Course>({
    Key: "",
    CourseName: "",
    CourseDetails: "",
    Duration: "",
    Stream: "",
  });

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(targetName);
    console.log(targetValue);

    SetAddCourse((values) => ({ ...values, [targetName]: targetValue }));
  };

  const SaveCourseRecord = () => {
    if (addCourse.CourseName.length == 0) {
      alert("Please Enter Student Name");
    } else if (addCourse.CourseDetails.length == 0) {
      alert("Please Enter Course Details");
    } else if (addCourse.Duration.length == 0) {
      alert("Please Enter Duration");
    } else if (addCourse.Stream.length == 0) {
      alert("Please Enter Stream");
    } else {
      let UniqueIDkey = "";
      if (addCourse.Key) {
        UniqueIDkey = addCourse.Key;
      } else {
        UniqueIDkey = "course-" + new Date().getTime().toString();
      }
      const db_ref = child(ref(database), "course/" + UniqueIDkey);

      set(db_ref, {
        Key: UniqueIDkey,
        CourseName: addCourse.CourseName,
        CourseDetails: addCourse.CourseDetails,
        Duration: addCourse.Duration,
        Stream: addCourse.Stream,
      });

      SetAddCourse({
        Key: "",
        CourseName: "",
        CourseDetails: "",
        Duration: "",
        Stream: "",
      });

      alert("Course Data added successfully");
    }
  };

  return (
    <div className="col-md-8">
      <h1>Add course details</h1>
      <br />
      <div className="row">
        <div className="txt-label-block">
          <label>Course Name</label>
          <input
            type="text"
            className="form-control"
            id="input_CourseName"
            name="CourseName"
            placeholder="Enter Course Name"
            value={addCourse?.CourseName}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Course Details</label>
          <input
            type="text"
            className="form-control"
            id="input_CourseDetails"
            name="CourseDetails"
            placeholder="Enter Course Details"
            value={addCourse?.CourseDetails}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Stream</label>
          <input
            type="text"
            className="form-control"
            id="input_Stream"
            name="Stream"
            placeholder="Enter Stream"
            value={addCourse?.Stream}
            onChange={handleChange}
          />
        </div>
        <div className="txt-label-block">
          <label>Duration</label>
          <input
            type="text"
            className="form-control"
            id="input_Duration"
            name="Duration"
            placeholder="Enter Duration"
            value={addCourse?.Duration}
            onChange={handleChange}
          />
        </div>

        <div className="txt-label-block">
          <br />
          <button
            className="btn btn-primary"
            style={{ marginLeft: "40%" }}
            onClick={SaveCourseRecord}
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
    </div>
  );
}
