"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Student from "../_Model/Student";
import { child, push, ref, set, get, remove } from "firebase/database";
import { database, storage } from "../firebaseConfig";
import { exportToExcel } from "../Component/Excelexport";
import Certificate from "../_Model/Certificate";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function CertificateList() {
  const router = useRouter();

  const [CertificateList, SetCertificateList] = useState<Certificate[]>([]);

  // const handleChange = (event: any) => {
  //   const targetName = event.target.name;
  //   const targetValue = event.target.value;
  //   console.log(targetName);
  //   console.log(targetValue);
  //   if (targetName == "ContactNumber" && targetValue.length > 10) {
  //     return;
  //   }
  //   //  SetAddStudent((values) => ({ ...values, [targetName]: targetValue }));
  // };
  useEffect(() => {
    const studentRef = ref(database, "certificate");
    get(studentRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          var studentGridList: Certificate[] = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            studentGridList.push(childData);
          });
          SetCertificateList(studentGridList);
          console.log(studentGridList);
        } else {
          console.log("no data found");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchImageUrl = (path: string) => {
    try {
      // const imageRef = storageRef(storage, path);
      console.log(`certificates/${path}`);
      const imageRef = storageRef(storage, `certificates/${path}`);
      const url = getDownloadURL(imageRef);
      console.log(`url = >${url}`);
      return url.then((x) => x);
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return "";
    }
    return "";
  };

  return (
    <div className="col-md-8">
      <div className="row">
        <div className="col-md-8">
          <h1>Certificate List</h1>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-secondary"
            onClick={() => exportToExcel(CertificateList, "Student Data")}
          >
            Export To Excel
          </button>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-1">Sr.</div>
        <div className="col-md-3">Student Name</div>
        <div className="col-md-3">Course Name</div>
        <div className="col-md-3">Year</div>
        <div className="col-md-2"></div>

        {CertificateList.length > 0 &&
          CertificateList.map((x, index) => (
            <div className="row" aria-rowindex={index}>
              <div className="col-md-1">{index + 1}</div>
              <div className="col-md-3">{x.StudentName}</div>
              <div className="col-md-3">{x.CourseName}</div>
              <div className="col-md-3">{x.Year}</div>
              <div className="col-md-2"></div>
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
