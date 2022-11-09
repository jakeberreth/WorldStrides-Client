import React, { useState,Fragment } from "react";
import { useNavigate } from "react-router";
import { currentUser } from "../App";
import Records from "./school.json";

 
export default function CreateUser() {
 const [form, setForm] = useState({
   name: "",
   password: "",
   almaMater: "",
   date: [],
   type: ""
 });

 const [inputFields, setInputFields] = useState([
  { startDate: ''}
 ]);
 //const [addDateClicked, setAddDateClicked] = useState('');
 //const [counter, setCounter] = useState(0);

 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 };

 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   form.date.push(...inputFields);

   console.log("FORM: ");
   console.log(form);
   console.log(inputFields);
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:2500/user/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", password: "", almaMater: "", date: [], type: "",});
   navigate("/");
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

 const buttonStyle = 
 {
  marginLeft: "10px"
 }

const submitStyle = 
{
  marginBottom: "30px"
}

const pageStyle = 
{
  backgroundColor: "OldLace"
}

//  function handleClick() 
//  {
//   setAddDateClicked(true);
//  }

 const handleAddFields = () => {
  const values = [...inputFields];
  values.push({startDate: '', endDate: ''});
  setInputFields(values);
};


const changeGender = (newGender) =>
{
  setForm(newGender);
}


const handleRemoveFields = index => {
  const values = [...inputFields];
  values.splice(index, 1);
  setInputFields(values);
};

const handleStartChange = (index, event) => {
  const values = [...inputFields];
  values[index].startDate = event.target.value;

  setInputFields(values);
};

const handleEndChange = (index, event) => {
  const values = [...inputFields];
  if (event.target.name === "endDate") {
    values[index].endDate = event.target.value;
  } else {
    values[index].endDate = event.target.value;
  }

  setInputFields(values);
};

const handleSubmit = e => {
  e.preventDefault();
  // handle form submission here
  alert(JSON.stringify(inputFields, null, 2))
};



const errors = {
  name : "invalid state"
};

 // This following section will display the form that takes the input from the user.
 return (
   <div>
    <br></br>
     <h3 style={titleStyle}>Create New Account</h3>
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
          <label htmlFor ="almaMater">Alma Mater</label>
          <div></div>
          <input list = "form-control" placeholder="Search" className="form-control" onChange={(e) => updateForm({almaMater:e.target.value})}/>
          <div></div>
          <datalist id = "form-control" value = {form.almaMater}>
          <option></option>
          {
          Records.map((op) => <option>{op.institution}</option>)
          }
        </datalist>
       </div>
       <br></br>
       <label htmlFor="date">Enter Dates and Times that you are NOT Available</label>
      <br></br>
       <div className="form-group">
         { inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group">
                <br></br>
                <input 
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  //value={inputField.datetime}
                  onChange={event => handleStartChange(index, event)}
                  />
              </div>
              <hr></hr>
              <br></br>
              <div className="form-group">
                <button 
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleAddFields(index)}
                  >Add</button>

                <button 
                  style={buttonStyle}
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                  >Remove</button>
                  <br></br>
              </div>
              <br></br>
            </Fragment>
         ))}
      </div>
       <label>Account Type</label>
       <br></br>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             required
             className="form-check-input"
             type="radio"
             name="accountOptions"
             id="accountRegular"
             value="Regular"
             checked={form.type === "Regular"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="accountRegular" className="form-check-label">Regular</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="accountOptions"
             id="accountLead"
             value="Lead"
             checked={form.type === "Lead"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="accountLead" className="form-check-label">Lead</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="accountOptions"
             id="accountAdmin"
             value="Admin"
             checked={form.type === "Admin"}
             onChange={(e) => updateForm({ type: e.target.value })}
           />
           <label htmlFor="accountAdmin" className="form-check-label">Admin</label>
         </div>
       </div>
       <br></br>
       <div className="form-group">
         <input style={submitStyle}
           type="submit"
           value="Create Account"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}