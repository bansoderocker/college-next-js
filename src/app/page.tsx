"use client";
import { useState } from "react";
import styles from "./page.module.css";
// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const [page, SetPage] = useState<number>(0);

  const [user] = useAuthState(auth);
  console.log({ user });
  const router = useRouter();
  if (!user) {
    router.push("./Login");
  } else {
    {
      router.push("./Student");
    }
  }
  return (
    <main className={styles.main}>
      {/* <button onClick={() => signOut(auth)}> Log Out</button> */}
      <div className={styles.description}></div>
    </main>
  );
}
// npm install bootstrap popper jquery
