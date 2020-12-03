import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

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

const AddTeacher = () => {
  const [tags, setTags] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "M",
    aptitudes: [],
  });
  const history = useHistory();
  const [createTeacher] = useMutation(CREATE_TEACHER);

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      await createTeacher({ variables: { ...form } });
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddition = (e) => {
    e.preventDefault();
    if (tags !== "") {
      const { aptitudes } = form;
      aptitudes.push(tags);
      setForm({ ...form, aptitudes });
      setTags("");
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const { aptitudes } = form;
    aptitudes.splice(id, 1);
    setForm({ ...form, aptitudes });
  };

  return (
    <div>
      <form onSubmit={handleCreateTeacher}>
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            className="form-control form-control-sm"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Aptitudes</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddition}>
              add aptitudes
            </button>
          </div>
          <div className="mt-3">
            {form?.aptitudes.length !== 0 &&
              form.aptitudes.map((skill, id) => (
                <span key={id} className="badge badge-primary mr-2 mb-2 rounded-pill ">
                  {skill}
                  <button
                    className="btn text-danger p-0 pl-3 pr-2 rounded-pill"
                    onClick={(e) => handleDelete(e, id)}
                  >
                    X
                  </button>
                </span>
              ))}
          </div>
        </div>
        <button type="submit" className="btn btn-block btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
