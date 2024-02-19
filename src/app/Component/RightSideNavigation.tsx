import { ChildProcess } from "child_process";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChildProps from "../_Model/ChildProps";

export default function RightSideNavigation({ page, SetPage }: ChildProps) {
  const router = useRouter();

  return (
    <div className="col-md-2">
      {/* Side Navigation */}
      <hr />
      <a onClick={() => router.push("/")}>
        <Image src="/images/home.png" alt="home" width={30} height={30} />
        Home
      </a>

      <br />
      <hr />
      <a onClick={() => SetPage(page == 6 ? 7 : 6)}>
        <Image
          src="/images/certificate.png"
          alt="certificate"
          width={30}
          height={30}
        />
        {page == 7 ? "Certificates" : "Add Certificates"}
      </a>
      <br />
      <hr />
      <a onClick={() => SetPage(5)}>
        {/* <Image
          src="/images/outside_course.png"
          alt="course"
          width={30}
          height={30}
          onClick={() => router.push("/About")}
        /> */}
        About Us
      </a>
    </div>
  );
}
