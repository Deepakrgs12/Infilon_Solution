import React,{useEffect, useState} from 'react';
import  axios from "axios";

/////For Local Storage for Details
const getLocalRecords= ()=>{

    let records= localStorage.getItem('Records');
    console.log("INside Getocal");
    console.log(records);
    if(records)
    {   console.log(JSON.parse(localStorage.getItem('Records')));
        return JSON.parse(localStorage.getItem('Records'));
    }
    else{
        return []
    }
}

////Local Storage to stop rendering 
const checkApi= ()=>{

    let api= localStorage.getItem('axioscheck');
    
    console.log(api);
    if(api)
    {   console.log(JSON.parse(localStorage.getItem('axioscheck')));
        return JSON.parse(localStorage.getItem('axioscheck'));
    }
    else{
        return 0;
    }
}

const Getdetails = () => {
    const[details, Setdetails]= useState(getLocalRecords());
    const[onetime,Setonetime]=useState(checkApi());
    const[ids,Setids]=useState("");
    



////Fetching Data From API
    const retrivedetails=()=>{
        axios
        .get("https://reqres.in/api/users?page=1")
        .then(response => {
          let res=[];
          res=response.data.data;
          console.log("hi");
          console.log(res);
          console.log("hhghghg")
          Setdetails(res);
           
          console.log(response.data.data);
          console.log(details);
        })
        .catch(error => {
          if (error.response) {
            Setdetails("");
             
      
          } else {
            Setdetails("");
              
          }
        });
      }

    /// To Change the content to input field
      const editfield=(e)=>{
        e.preventDefault();
          var name=e.target.name;
          var value=e.target.value;
         
       
        Setdetails(details.map((ele)=>{
            if(ids===ele.id)
            {
                 if(name==="first")
                 {
                     return {...ele,first_name:value}
                 }
                 else if(name==="last")
                 {
                    return {...ele,last_name:value}
                 }
               
       

            }
            return ele;
        }));
       
    }
/// To Change the content to input field of email
    const editfieldemail=(e)=>{
        
        var value=e.target.value;
       
      
      Setdetails(details.map((ele)=>{
        if(ids===ele.id){
    return {...ele,email:value}}
    return ele;
      }));
     
  }

  ////Method invoke after edit button is pressed
    const editrecord=(id)=>{
          Setids(id);
        
    }

////Method invoke after update button is pressed
    const updaterecord=()=>{
        Setids("");
    }

//// Method heps in delete the records
    const deleterecord=(id)=>{
          console.log(id);
          let updaterecords= [];
          updaterecords= details.filter((record)=>(record.id !== id));
        
          
          Setdetails(updaterecords);
         
      }
///Invoke every on every changes
        useEffect(() => {

            if(onetime===0)
         {
            retrivedetails();
        
            Setonetime(onetime+1);
        }
           
            
            localStorage.setItem('Records', JSON.stringify(details));
            localStorage.setItem('axioscheck', JSON.stringify(onetime));
        }, [details])
      
    return (
        <div>
            <div className="container"  style={{margin:'20px'}}>
            <h2 style={{textShadow: '2px 2px'}}> <marquee style={{width:"70%", direction:"right", height:"100px"}}>Welcome to Infilon Employee Details Page</marquee></h2></div>
          
                <div className="container">
                <div className="row">
                  <div className="col-12">
                      <table className="table table-image" border="1px">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Image</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Edit </th>
                            <th scope="col">Delete </th>
                          </tr>
                        </thead>
                       
                      {details.length!==0 ?  <tbody> {details.map((e)=>(
                         
                          <tr key={e.id}>
                            <th scope="row">{e.id}</th>
                            <td className="w-25">
                                <img src={e.avatar} className="img-fluid img-thumbnail" alt="Profie.pic"/>
                            </td>

                            {e.id ===ids?<td><input type="text" name="first" value={e.first_name} onChange={editfield}/></td>:<td>{e.first_name}</td>}
                            {e.id ===ids?<td><input type="text" name="last" value={e.last_name} onChange={editfield}/></td>:<td>{e.last_name}</td>}
                           {e.id ===ids?<td><input type="text" name="email" value={e.email} onChange={editfieldemail}/></td>: <td>{e.email}</td>}
                            {ids ===e.id?<td><button type="button" className="btn btn-primary" onClick={()=>updaterecord()}>Update</button></td>:<td><button type="button" className="btn btn-primary" onClick={()=>editrecord(e.id)}>Edit</button></td>}
                            <td><button type="button" className="btn btn-danger" onClick={()=>deleterecord(e.id)}>Delete</button></td>
                          </tr>
                          ))}
                        </tbody> :<tr >No Records Found</tr>}
                      </table>  
                  </div>
                </div>
              </div>
            
        </div>
    )
}

export default Getdetails

