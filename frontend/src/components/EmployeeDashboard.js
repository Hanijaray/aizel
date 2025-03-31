import Employee from "./Employee";
import Header from "./Header";


function Dashboard() {
  return (
  <div className="min-h-screen flex flex-col">
     <Header />
      <div className="flex-grow ">
     <Employee />
      </div>
    </div>

  );
}

export default Dashboard;