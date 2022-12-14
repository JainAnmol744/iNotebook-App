import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"", email:"", password:"", cpassword:""})
  let navigate = useNavigate();
  const handlesubmit = async (e)=>{
      e.preventDefault();
      const  {name , email,password,}= credentials;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password}) 
        });
        const json = await response.json()
        console.log(json)
          // Save and redirect the authtoken
          if(json.success){
          localStorage.setItem('token', json.authtoken);
          navigate('/');
          props.showAlert("Account Created Successfully", "Success")
          }
          else
           props.showAlert("Invalid Details", "Error")
  }
  const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div>
       <form onSubmit={handlesubmit}>
       <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
  </div>

  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChange} name="cpassword"/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
  </form>
    </div>

  )
}

export default Signup