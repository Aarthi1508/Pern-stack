import React, { Fragment, useEffect, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  // description - This is the state
  // setDescription - This is the only way to change the state

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     // to prevent the form submission from causing a page reload or navigation
//         try{
//             const body = { description }; // reverse of this line const { description } = req.body; // description from body
//             // Output: { description: "This is a description" }
//             const response = await fetch("http://localhost:5000/todos/", {
//                 method:"POST",
//                 headers: {"Content-Type":"application/json"},
//                 body: JSON.stringify(body)
//             });
//             console.log(response);
//         }
//         catch(err){
//             console.error(err.message);
//         }
//   };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
        const body = { description};
        const response = await fetch("http://localhost:5000/todos/", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        console.log("response is here", response);
        window.location = "/";  //Once the response is sent, the page has to refresh and reflect the changes
        
        }
        catch (err){
            console.error(err.message);
        }

    }
  return (
    <Fragment>
      <h1 className="text-center mt-5">Input Todo</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        {/* To have the button and the input field together */}
        <input type="text" className="form-control" value={description} onChange={e => {setDescription(e.target.value)}}/>
        {/* Here e => {setDescription(e.target.value)} is a function */}
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
