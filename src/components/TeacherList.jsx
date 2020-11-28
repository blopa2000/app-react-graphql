import { useQuery, useMutation } from "@apollo/react-hooks";
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

const CREATE_TEACHER = gql`
  mutation CreateTeacher(
    $firstName: String!
    $lastName: String!
    $gender: Gender
    $aptitudes: [String]
  ) {
    createTeacher(
      input: { firstName: $firstName, lastName: $lastName, gender: $gender, aptitudes: $aptitudes }
    ) {
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
  const [createTeacher] = useMutation(CREATE_TEACHER);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>error</p>;
  }

  const handleCreateTeacher = async () => {
    const firstName = "un nuevo dato de prueba numero 2";
    const lastName = "el mismo 2";
    const gender = "M";
    const aptitudes = ["uno", "dos", "tres"];
    const res = await createTeacher({ variables: { firstName, lastName, gender, aptitudes } });
    console.log(res.data.createTeacher);
  };

  return (
    <div>
      <h1>Teachers</h1>
      {data.getTeachers.map((teacher, id) => (
        <p key={id}>{teacher._id}</p>
      ))}

      <button className="btn btn-primary" onClick={handleCreateTeacher}>
        click
      </button>
    </div>
  );
};

export default TeacherList;
