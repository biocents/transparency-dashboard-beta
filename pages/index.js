import { ProjectSection } from "../ui/components/ProjectSection"

function HomePage() {
  return (
    <div className="text-3xl">
        <h2>Transparency dashboard for Biocents</h2>
      <main >
        <h3 className="text-xl">
          Welcome! To see transactions, please select a project.
          Alternatively if you are a donor, you may view your transactions directly from the Flockby app
        </h3>

        <ProjectSection />
      </main>
    </div>
  )
}

export default HomePage
