"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../Component/Header";
import SideNavigation from "../Component/SideNavigation";
import RightSideNavigation from "../Component/RightSideNavigation";
import { useEffect, useState } from "react";
import AddCourse from "./AddCourse";
import CourseList from "./CourseList";
import About from "../About/page";

export default function Course() {
  const router = useRouter();
  const [page, SetPage] = useState<number>(2);

  if (page == 0 || page == 1) {
    router.push("/Student");
  }
  if (page == 6 || page == 7) {
    router.push("/Certificate");
  }

  return (
    <div className="container">
      <Header />
      <div className="row">
        <RightSideNavigation page={page} SetPage={SetPage} />
        {page == 3 && <AddCourse />}
        {page == 2 && <CourseList />}
        {page == 5 && <About />}
        <SideNavigation page={page} SetPage={SetPage} />
      </div>
    </div>
  );
}
