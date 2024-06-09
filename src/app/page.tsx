"use server";

import Error from "@/components/Error";
import { CostObj, UsagWithSort } from "@/types";
import dynamic from "next/dynamic";
import styles from "./page.module.scss";

export default async function Home() {
  try {
    const responce = await fetch(
      `http://localhost:${process.env.PORT}/api/getData`
    );
    if (responce.ok) {
      const { costs, usages } = await responce.json();
      const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

      return (
        <main className={styles.main}>
          <h1>Chart</h1>
          <Chart usages={usages as UsagWithSort[]} costs={costs as CostObj} />
        </main>
      );
    } else {
      return (
        <main className={styles.main}>
          <Error />
        </main>
      );
    }
  } catch (err) {
    console.log(err);

    return (
      <main className={styles.main}>
        <Error />
      </main>
    );
  }
}
