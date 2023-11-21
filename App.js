import Analyst from './Analyst';
import Analyst1 from './Analyst1';
import './App.css';
import Header from './Header';


function App() {
  return (
    <div className="App">
     <Header/>
 <Analyst1/>
    </div>
  );
}

export default App;


// Inside the Analyst1 component
return (
  <MaterialReactTable
    table={table}
    className="custom-material-table"
    style={{ backgroundColor: '#151b33', color: 'white', fontSize: '16px' }}
  />
);

/* Inside Analyst1.css */

.custom-material-table {
  /* Add your custom styles here */
  border: 1px solid #ccc;
  /* Example styles, customize as needed */
}

.custom-material-table th {
  background-color: #333;
  color: white;
  /* Example styles for table headers, customize as needed */
}

.custom-material-table td {
  /* Example styles for table cells, customize as needed */
}
