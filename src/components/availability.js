import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router";
import Records from "./school.json";
 
export default function ViewAvailability() {

 const [form, setForm] = useState({
  name: "",
  password: "",
  almaMater: "",
  date: [],
  type: "",
  gender: "",
 });

 const [inputFields, setInputFields] = useState(
  [
  { startDate: '', endDate: '' }
 ]
 );

 const [viewDates, setViewDates] = useState(false);

 function viewDatesClicked()
 {
  setViewDates(true);
 }

 const params = useParams();
 const navigate = useNavigate();
 
 const [entered, setEntered] = useState(false);

 useEffect(() => {

   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://worldstrides.herokuapp.com/user/${params.id.toString()}`);

     if (!response.ok) {
       const message = `Hello An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const profile = await response.json();
     if (!profile) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }

     console.log("PROFILE");
     console.log(profile);

     for(let i = 0; i < inputFields.length; i++)
     {
      inputFields.pop();
     }

     for(let i = 0; i < profile.date.length; i++)
     {
      console.log(profile.date[i]);
      inputFields.push(profile.date[i]);
     }

     setForm(profile);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
  
  for(let i = 0; i < form.date.length; i++)
  {
    form.date = [];
  }

  console.log("SUBMITTED INPUT FIELDS")
  console.log(inputFields);

  for(let i = 0; i < inputFields.length; i++)
  {
    form.date.push(inputFields[i]);
  }

  console.log("SUBMITTED FORM");
  console.log(form);

   e.preventDefault();
   const editedPerson = {
     name: form.name,
     password: form.password,
     almaMater: form.almaMater,
     date: form.date,
     type: form.type,
     gender: form.gender,
   };

   console.log(editedPerson);
 
   // This will send a post request to update the data in the database.
   await fetch(`https://worldstrides.herokuapp.com/updateUser/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }

 const handleAddFields = () => {
  const values = [...inputFields];
  values.push({startDate: '', endDate: ''});
  inputFields(values);
};

const handleRemoveFields = index => {
  const values = [...inputFields];
  values.splice(index, 1);
  inputFields(values);
};

const handleStartChange = (index, event) => {
  const values = [...inputFields];
  if (event.target.name === "startDate") {
    values[index].startDate = event.target.value;
  } else {
    values[index].startDate = event.target.value;
  }

  inputFields(values);
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

const formStyle = 
{    
  marginLeft: "50px",
  marginRight: "50px"
}

const titleStyle = 
{
 marginLeft: "50px"
}

const buttonStyle = 
{
 marginLeft: "10px"
}

const tableStyle =
{
 marginLeft: "10px",
 marginTop: "10px",
 marginRight: "10px"
}

const userListStyle = 
{
  marginLeft: "10px"
}

 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
    <br></br>
    <h3 style={userListStyle}>Dates Unavailable</h3>
     <table style={tableStyle} className="table table-striped">
      <tbody>
         { inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <tr>
                <td>{inputField.startDate}</td>
              </tr>
            </Fragment>
         ))}
         </tbody>
      </table>
      </div> 
 );
}