import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="Cricket_logo.jpg" alt="Logo" className="logo-image" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <div className="user-logo">
        <img src="user_logo.jpg" alt="User Logo" className="user-image" />
      </div>
    </header>
  );
};
export default Header;

















// import React from "react";
// import "../styles/Header.css";
// import "./Sidebar.js";
// const Header = ({ toggleSidebar }) => {
//   return (
//     <header className="header">
//       {/* Logo Section */}
//       <div className="logo">
//         <img src="Cricket_logo.jpg" alt="Logo" className="logo-image" />
//       </div>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input type="text" placeholder="Search..." className="search-input" />
//       </div>

//       {/* User Logo */}
//       <div className="user-logo">
//         <img src="user_logo.jpg" alt="User Logo" className="user-image" />
//       </div>

//       {/* Hamburger Button (for small screens) */}
//       <button className="hamburger-menu" onClick={toggleSidebar}>
//         <div className="hamburger-line"></div>
//         <div className="hamburger-line"></div>
//         <div className="hamburger-line"></div>
//       </button>
//     </header>
//   );
// };

// export default Header;

