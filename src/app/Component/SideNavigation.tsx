import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import ChildProps from "../_Model/ChildProps";

export default function SideNavigation({ page, SetPage }: ChildProps) {
  const router = useRouter();
  const pathName = usePathname();
  console.log("pathName = " + pathName);
  return (
    <div className="col-md-2">
      {/* Side Navigation */}
      <h3>Updates</h3>
      <hr />
      <a
        onClick={
          () => SetPage(page == 2 ? 3 : 2)
          // router.push("/Course")
        }
      >
        <Image src="/images/course.png" alt="course" width={30} height={30} />
        {page == 2 ? "Add Courses" : "College Courses"}
      </a>
      <br />
      <hr />
      <a>
        <Image
          src="/images/outside_course.png"
          alt="course"
          width={30}
          height={30}
        />
        OutSide Courses
      </a>
      <br />
      <hr />
      <a
        onClick={
          () => SetPage(page == 0 ? 1 : 0)
          // router.push(
          //   pathName == "/AddStudent" ? "/StudentList" : "/AddStudent"
          // )
        }
      >
        {/* <Image
          src="/images/outside_course.png"
          alt="course"
          width={30}
          height={30}
        /> */}
        {page == 1 ? "Student List" : "Add Student"}
      </a>
      <br />
      {/* <hr />
      <a>
        <Image
          src="/images/outside_course.png"
          alt="course"
          width={30}
          height={30}
        />
        Add Faulty
      </a> */}
    </div>
  );
}
