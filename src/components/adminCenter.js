import React, { useState,Fragment } from "react";
import { useNavigate } from "react-router";
import { currentUser } from "../App";
import Records from "./school.json";

 
export default function AdminCenter() {
 const [form, setForm] = useState({
   institutions: [],
   staffNames: []
 });

 const [inputFields, setInputFields] = useState([
    { startDate: '', endDate: '' }
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
 
   await fetch("https://worldstrides.herokuapp.com/user/add", {
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
 
   setForm({ institutions: [], staffNames: []});
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
  if (event.target.name === "startDate") {
    values[index].startDate = event.target.value;
  } else {
    values[index].startDate = event.target.value;
  }

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
   </div>
 );
}