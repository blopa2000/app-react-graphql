import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const GET_COURSES = gql`
  {
    getCourses {
      _id
      title
      description
      teacher {
        firstName
        lastName
      }
      topic
    }
  }
`;

const CoursesList = () => {
  const { loading, error, data } = useQuery(GET_COURSES);
  if (loading) return <h1 className="text-primary">Loading...</h1>;
  if (error) {
    return <p className="text-danger">error</p>;
  }
  return (
    <>
      <h1>courses</h1>
      <Link className="btn btn-primary" to="/addCourse">
        Add
      </Link>

      <div className="d-flex flex-wrap justify-content-center">
        {data.getCourses.map(({ title, description, topic, teacher, _id }) => (
          <div key={_id} className="card m-1" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                <strong className="text-primary">Description:</strong> {description}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                <strong className="text-primary">Topic:</strong> {topic}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                <strong className="text-primary">teacher:</strong>{" "}
                {teacher.firstName + " " + teacher.lastName}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CoursesList;
