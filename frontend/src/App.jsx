import { useState } from "react";
import Navbar from "./components/Navbar";
import CreateEmployee from "./components/CreateEmployee";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
// import { UserProvider } from "./context/UserContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1>Hello</h1> */}
      <Navbar />
      {/* <CreateEmployee /> */}
      {/* <Login /> */}
      <Dashboard />
      {/* <EmployeeList /> */}
    </>
  );
}

export default App;
