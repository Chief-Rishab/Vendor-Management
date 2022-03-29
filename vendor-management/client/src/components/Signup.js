import React,{ useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {

	//useHistory replaced now with useNavigate instead
	const history = useNavigate();
	const [user, setUser] = useState({
        outletName:"",
        ownerName: "",
        phoneNo:"",
        email: "",
		password: "",
        gstNo:"",
        address:""
	});

	let name,value;
	const handleInputs = (e) => {
		
		console.log(e);
		name=e.target.name; //event.target.name
		//name will be = email for example
		value = e.target.value; //value the user is writing in web page
		//setUser(prev => ({...prev, [name]: value}));
		//setUser({user});
		setUser({...user,[name]:value});
	};

	const PostData = async(e) =>{

		e.preventDefault();
		const {outletName,ownerName,phoneNo,email,password,gstNo,address} = user;
		const res =await fetch("/register", {
			method:"POST",
			headers: {"Content-Type" : "application/json"},
			//while sending data to a web server, it can't recognize
			//JSON format, thats why u must convert it into a string first and then send
			body:JSON.stringify({
				outletName:outletName,
				ownerName:ownerName,
				phoneNo:phoneNo,
				email:email,
				password:password,
				gstNo:gstNo,
				address:address,
			})
		});

		const data =await res.json();

		if(res.status === 422 || !data)
		{
			window.alert("Invalid registration");
			console.log("Invalid registration");
		}
		else
		{
			window.alert("Registration successful");
			console.log("Registration successful");

			//once registration is done, directly go to login page
			history("/login");
		}
	}

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form method="POST" className={styles.form_container}>
						<h1>Create Account</h1>
                        <input
							type="text"
							placeholder="Outlet Name"
							name="outletName"
							
							value={user.outletName}
							onChange={handleInputs}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Owner Name"
							name="ownerName"
							value={user.ownerName}
							onChange={handleInputs}
							required
							className={styles.input}
						/>
                        <input
							type="number"
							placeholder="Phone No."
							name="phoneNo"
							
							value={user.phoneNo}
							onChange={handleInputs}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							
							value={user.email}
							onChange={handleInputs}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							
							value={user.password}
							onChange={handleInputs}
							required
							className={styles.input}
						/>
                        <input
							type="text"
							placeholder="GST Invoice No"
							name="gstNo"
							
							value={user.gstNo}
							onChange={handleInputs}
							required
							className={styles.input}
						/>
                        <input
							type="text"
							placeholder="Address"
							name="address"
							
							value={user.address}
							onChange={handleInputs}
							required
							className={styles.input}
						/>
						{/* attaching postdata function to register button, 
						called soon as u click it */}
						<button type="submit" className={styles.green_btn} value="register" onClick={PostData}> 
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;