import Head from "next/head"

import styles from "../ui/styles/Home.module.css"

function UserPage() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Project description page</title>
        </Head>
        <main className={styles.main}>
          <h3 className={styles.title}>
            Project name
          </h3>
  
          <TransactionSection />
        </main>
      </div>
    )
  }
  
  export default UserPage