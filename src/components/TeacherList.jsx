import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>error</p>;
  }

  return (
    <div>
      <h1>Teachers</h1>
      {data.getTeachers.map((teacher) => (
        <p>{teacher._id}</p>
      ))}
    </div>
  );
};

export default TeacherList;
