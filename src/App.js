import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import TeacherList from "./components/TeacherList";
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
