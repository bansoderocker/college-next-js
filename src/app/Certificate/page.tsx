"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../Component/Header";
import SideNavigation from "../Component/SideNavigation";
import RightSideNavigation from "../Component/RightSideNavigation";
import { useState } from "react";
import About from "../About/page";
import AddCertificate from "./AddCertificate";
import CertificateList from "./CertificateList";

export default function Certificate() {
  const [page, SetPage] = useState(7);
  const router = useRouter();
  if (page == 2 || page == 3) {
    router.push("/Course");
  }
  if (page == 0 || page == 1) {
    router.push("/Student");
  }
  console.log(`Page - ${page}`);

  return (
    <div className="container">
      <Header />
      <div className="row">
        <RightSideNavigation page={page} SetPage={SetPage} />
        {page == 7 && <AddCertificate />}
        {page == 6 && <CertificateList />}
        {page == 5 && <About />}
        <SideNavigation page={page} SetPage={SetPage} />
      </div>
    </div>
  );
}
