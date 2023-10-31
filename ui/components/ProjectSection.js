import { useState, useEffect } from "react"
import Link from 'next/link';


export const ProjectSection = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://flockby.j8t.io/api/projects/')
      .then(response => response.json())
      .then(data => setData(data.data));
  }, []);


  return (
    <div>
      <section>
        <h1 className="text-3xl font-bold underline">Projects</h1>
      </section>
      <section>
      <ul>
      {data.map((project) => (
        <li className="text-xl" key={project.projectId}>
            
            <Link href={{ pathname: `/project/${project.projectId}`, query: { projectData: JSON.stringify(project) } }} as={`/project/${project.projectId}`}>
            {project.projectId}
            </Link>
        </li>
        ))
      }
    </ul>
      </section>
      
    </div>
  )
}

