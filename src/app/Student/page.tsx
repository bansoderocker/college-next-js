"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../Component/Header";
import SideNavigation from "../Component/SideNavigation";
import RightSideNavigation from "../Component/RightSideNavigation";
import { useState } from "react";
import AddStudent from "./AddStudent";
import StudentList from "./StudentList";
import About from "../About/page";

export default function Student() {
  const [page, SetPage] = useState(0);
  const router = useRouter();
  if (page == 2 || page == 3) {
    router.push("/Course");
  }
  if (page == 6 || page == 7) {
    console.log(`Page + > ${page}`);
    router.push("/Certificate");
  }
  return (
    <div className="container">
      <Header />
      <div className="row">
        <RightSideNavigation page={page} SetPage={SetPage} />
        {page == 1 && <AddStudent />}
        {page == 0 && <StudentList />}
        {page == 5 && <About />}
        <SideNavigation page={page} SetPage={SetPage} />
      </div>
    </div>
  );
}
