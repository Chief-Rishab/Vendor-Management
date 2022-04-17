import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../services/customerAuthservice';
import Message from './Message';
import {useNavigate} from 'react-router-dom';
// import {AuthContext} from '../Context/AuthContext_consumer';

const Register = props=>{
    const navigate=useNavigate();
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    // const authContext = useContext(AuthContext);
    let timerID=useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", password : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){ // if any error show the message to the user for 2seconds and then redirect to login page
                timerID = setTimeout(()=>{
                    navigate('/login');
                },2000)
            }
        });
    }

    return(
             <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                {/* <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter role (admin/user)"/> */}
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Register</button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Register;