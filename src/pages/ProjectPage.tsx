import { useParams } from "react-router-dom";

function ProjectPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Project Details</h1>
      <p>Project ID: {id}</p>
      {/* Add your project details here */}
    </div>
  );
}

export default ProjectPage;
