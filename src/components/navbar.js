import React from "react";
import { useState, useEffect, useContext } from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import { UserContext } from "../App";
 
// Here, we display our Navbar
function Navbar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  var userList = currentUser.split("-");
  
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`https://worldstrides.herokuapp.com/user/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const users = await response.json();
      setUsers(users);
    }

    console.log("Current");
    console.log(currentUser);

  
    getUsers();
  
    return;
  }, [users.length]);

  const titleStyle = 
  {
    marginLeft: "5%",
    fontSize: "30px",
  }

  const styles = {
  buttonStyle :
  {    
    right: "10px",
    color: "black",
    '&:hover': {
      textDecoration: "underline"
    }
  }
}
  
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
     <NavLink className="navbar-brand" to="/">
      <h1 class="navbar-brand" href="#" style={titleStyle}>
       WorldStrides
      </h1>
    </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
      
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
          {userList[0] == "Admin" &&
          <li className="nav-item active">
             <NavLink className="nav-link" to="/staffList" style={styles.buttonStyle}>
               Staff List
             </NavLink>
           </li>
          }
          {userList[0] != "default" &&
           <li className="nav-item active">
             <NavLink className="nav-link" to="/eventList" style={styles.buttonStyle}>
               Event List
             </NavLink>
           </li>
          }
           <li className="nav-item active">
             <NavLink className="nav-link" to="/createUser" style={styles.buttonStyle}>
               Create Account
             </NavLink>
           </li>
           {(userList[0] == "Admin" || userList[0] == "Lead") &&
           <li className="nav-item active">
             <NavLink className="nav-link" to="/createEvent" style={styles.buttonStyle}>
               Create Event
             </NavLink>
           </li>
          } 
           <li className = "nav-item active">
            <NavLink className= "nav-link" to = "/createLogin" style = {styles.buttonStyle}>
              Sign In
            </NavLink>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 )
}

export default Navbar