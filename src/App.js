import React from 'react';
//import { useState } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
  );
}
export default App;





// import React, { useState } from 'react';  // <-- Import useState from React
// import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
// import './App.css';

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="app">
//       <Header toggleSidebar={toggleSidebar} /> {/* Pass function to Header */}
//       <Sidebar isOpen={isSidebarOpen} /> {/* Pass sidebar open state to Sidebar */}

//       <div className="main-content">
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
