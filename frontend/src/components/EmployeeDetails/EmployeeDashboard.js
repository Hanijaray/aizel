import Employee from "./Employee";
import Header from "../Header";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="sticky top-0 z-50 bg-white shadow-md" />
      <div className="flex-grow">
        <Employee />
      </div>
    </div>
  );
}

export default Dashboard;

