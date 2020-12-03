import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const GET_TEACHERS = gql`
  {
    getTeachers {
      _id
      firstName
      lastName
      gender
      aptitudes
    }
  }
`;

const TeacherList = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS);

  if (loading) return <h1 className="text-primary">Loading...</h1>;
  if (error) {
    console.log(error);
    return <p className="text-danger">error</p>;
  }

  return (
    <>
      <h1>Teachers</h1>
      <Link className="btn btn-primary" to="/addTeacher">
        Add
      </Link>
      <div className="d-flex flex-wrap justify-content-center">
        {data.getTeachers.map((teacher) => (
          <div key={teacher._id} className="card m-1" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{teacher.firstName + " " + teacher.lastName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Gender: {teacher.gender}</h6>
              {teacher?.aptitudes.map((skills, id) => (
                <span key={id} className="badge badge-primary mr-2 mb-2 rounded-pill ">
                  {skills}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeacherList;
