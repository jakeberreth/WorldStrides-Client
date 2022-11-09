import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import MicrosoftLogin from "react-microsoft-login";

import { UserContext } from "../App";

export default function CreateLogin() {
  var { currentUser, setCurrentUser } = useContext(UserContext);

 const [form, setForm] = useState({
   name: "",
   password: ""
 });

 const authHandler = (err, data) =>
 {
  console.log(err,data);
 };
 const navigate = useNavigate();
 
 const [users, setUsers] = useState([]);

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

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

  getUsers();

  return;
}, [users.length]);
 
 // This function will handle the submission.
 async function onSubmit(e) {
   var myUser;
   e.preventDefault();

   console.log(users);

   //users.getUsers();

   var found = false;

   for(let i = 0; i < users.length; i++)
   {
    if(users[i].name == form.name && users[i].password == form.password) 
    {
      found = true;
      myUser = users[i];
      setCurrentUser(myUser.type + '-' + myUser.name + '-' + myUser.password);
      break;
   }
  }


    if(found == true) 
    {
      if(myUser.type == "Admin")
      {
        navigate("/staffList");
      } else 
      {
        navigate("/eventList")
      }

    } 
    else 
    {
      alert("Incorrect Username or Password. ");
    }
 }
 
 const formStyle = 
 {    
   marginLeft: "5%",
   width: "500px"
 }

 const titleStyle = 
 {
  marginLeft: "5%"
 }


 // This following section will display the form that takes the input from the user.
 return (
   <div>
    <br></br>
     <h3 style={titleStyle}>Sign In</h3>
     <form style={formStyle} onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Full Name</label>
         <input
           required
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <br></br>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           required
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Sign In"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
 }