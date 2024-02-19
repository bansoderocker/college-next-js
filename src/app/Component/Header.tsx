import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebaseConfig";

export default function Header() {
  const router = useRouter();

  return (
    <div className="row">
      <div className="col-md register-header-form">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={150}
          height={100}
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <div className="col-md" style={{ marginTop: "5%", height: "150px" }}>
        <input
          type="text"
          className="form-control"
          id="input_searchText"
          placeholder="Search"
          defaultValue=""
          style={{ marginTop: "50px", borderRadius: "25px" }}
        />
      </div>
      <div className="col-md register-header-form">
        <Image
          src="/images/logoff.png"
          alt="logo"
          width={30}
          height={30}
          onClick={() => signOut(auth)}
        />
      </div>
    </div>
  );
}
