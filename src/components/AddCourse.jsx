import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const CREATE_COURSE = gql`
  mutation CreateCourse($title: String!, $description: String!, $teacher: ID!, $topic: String!) {
    createCourse(
      input: { title: $title, description: $description, teacher: $teacher, topic: $topic }
    ) {
      _id
      title
      description
    }
  }
`;

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

const AddCourse = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS);
  const [createCourse] = useMutation(CREATE_COURSE);
  const [form, setForm] = useState({
    title: "",
    description: "",
    teacher: "",
    topic: "",
  });
  const history = useHistory();

  if (loading) return <h1 className="text-primary">Loading...</h1>;

  if (error) {
    return <p className="text-danger">error</p>;
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (form.teacher !== "") {
      try {
        await createCourse({ variables: { ...form } });
        history.push("/courses");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateCourse}>
        <div className="form-group">
          <label htmlFor="title">title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="topic">topic</label>
          <input
            type="text"
            className="form-control"
            id="topic"
            required
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="teacher">teacher</label>
          <select
            id="teacher"
            className="form-control form-control-sm"
            required
            value={form.teacher}
            onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          >
            <option> Select a teacher</option>
            {data.getTeachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName + " " + teacher.lastName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-block btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
