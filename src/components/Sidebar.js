import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
































// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Sidebar.css';

// const Sidebar = ({ isOpen }) => {
//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
