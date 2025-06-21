import React from "react";
import "./App.css"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
// import EntryLog from "./components/EntryLogs/EntryLog"
// import RecycleBin from './components/RecycleBin/RecycleBin';
import Entries from './components/Entries/Entries';

// estas dos lineas se van cuando existan los componentes author y entries
const Author = () => <h2>Pagina de autores</h2>;
//const Entries = () => <h2>Pagina de entradas</h2>;

const App = () => {
  return (
    <>
      <Router>
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <Routes>
                  {/* <Route path="/author" element={<Author />} /> */}
                  <Route path="/entries" element={<Entries />} />
                  {/* <Route path="/entryLogs" element={<EntryLog />} />
                  <Route path="/recycleBin" element={<RecycleBin />} /> */}
              </Routes>
            </div>
        </div>
      </Router>
    </>
  );
};

export default App;