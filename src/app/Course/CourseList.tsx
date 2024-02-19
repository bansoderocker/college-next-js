"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Course from "../_Model/Course";
import { child, push, ref, set, get, remove } from "firebase/database";
import { database } from "../firebaseConfig";
import { exportToExcel } from "../Component/Excelexport";

export default function CourseList() {
  const router = useRouter();

  const [List, SetList] = useState<Course[]>([]);

  const handleChange = (event: any) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(targetName);
    console.log(targetValue);
    if (targetName == "ContactNumber" && targetValue.length > 10) {
      return;
    }
    //  SetAddCourse((values) => ({ ...values, [targetName]: targetValue }));
  };
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
          SetList(CourseGridList);
          console.log(CourseGridList);
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
          <h1>table of courses/content</h1>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-secondary"
            onClick={() => exportToExcel(List, "Course Data")}
          >
            Export To Excel
          </button>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-1">Sr.</div>
        <div className="col-md-4">Course Name</div>
        <div className="col-md-3">Stream</div>
        <div className="col-md-4">Duration</div>
        {/* <div className="col-md-2" style={{ display: "none" }}>
              Action
            </div> */}
        {List.length > 0 &&
          List.map((x, index) => (
            <div className="row">
              <div className="col-md-1">{index + 1}</div>
              <div className="col-md-4">{x.CourseName}</div>
              <div className="col-md-3"> {x.Stream}</div>
              <div className="col-md-4">{x.Duration}</div>
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
        {List.length == 0 && (
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">No Records Found</div>
            <div className="col-md-4"></div>
          </div>
        )}
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
