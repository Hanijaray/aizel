
import Dashboard from "./Dashboard";
import Header from "../Header";


function DailyTasks() {
  return (
  <div className="min-h-screen flex flex-col">
     <Header />
      <div className="flex-grow ">
 <Dashboard />
      </div>
    </div>

  );
}

export default DailyTasks;