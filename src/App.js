import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import TeacherList from "./components/TeacherList";
import AddTeacher from "./components/AddTeacher";
import CoursesList from "./components/CoursesList";
import AddCourse from "./components/AddCourse";
import Navbar from "./components/Navbar";

//bootswatch
import "bootswatch/dist/lux/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={TeacherList} />
          <Route exact path="/addTeacher" component={AddTeacher} />
          <Route exact path="/addCourse" component={AddCourse} />
          <Route exact path="/courses" component={CoursesList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
