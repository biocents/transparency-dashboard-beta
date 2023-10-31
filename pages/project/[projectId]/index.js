import Head from "next/head"
//import router from 'next/router';
import styles from "../../../ui/styles/Home.module.css"
import {useRouter } from 'next/router'
import { useState, useEffect } from "react"

import {TransactionSection} from "../../../ui/components/TransactionSection"

/**
 * 
 * Show details of the project and the associated transactions
 * 
 */

function ProjectPage() {

  const router = useRouter();
  const { projectData, projectId } = router.query;

  //const parsedProjectData = projectData ? JSON.parse(projectData) : null;

  const [parsedProjectData, setParsedProjectData] = useState(null);

  useEffect(() => {
    if (projectData) {
      // If projectData is defined, parse it and set it to state
      setParsedProjectData(JSON.parse(projectData));
    } else if (projectId) {
      // If projectData is not defined, but projectId is, fetch the data
      fetch(`https://flockby.j8t.io/api/projects/${projectId}`)
        .then(response => response.json())
        .then(data => setParsedProjectData(data.data));
    }
  }, [projectData, projectId]);  // Dependency array to re-run effect when projectData or projectId changes

  if (!parsedProjectData) {
    return <div>Loading...</div>;
  }

    return (

        <div className={styles.container}>
          <Head>
            <title>Project description page</title>
          </Head>
          <main className={styles.main}>
            <h3 className={styles.title}>
            Details about project 
            </h3>
          <h3 className={styles.title}>
            {parsedProjectData.tagline}

            </h3>
            <TransactionSection />
          </main>
        </div>

      )
  }

  export default ProjectPage;