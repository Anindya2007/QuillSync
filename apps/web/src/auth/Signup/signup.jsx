import {useState} from 'react';
import '../../styles/Signup.css';
import { UserPlus ,CircleCheckBig } from "lucide-react"; 
import { FcGoogle } from "react-icons/fc";
import {Link} from 'react-router-dom';
import AuthLayout from '../layout';

 function SignupForm(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // This function will be used for showing loading page and other error on authentication after backend is ready
    // function handleSubmit(e){
    //     e.preventDefault();
    // }

    // This useEffect is here to check the password strength

    const passLen = password.length >= 8;
    const digit = /\d/.test(password);


    return (
    <div className="w-full max-w-2xl rounded-2xl bg-white/80  shadow-2xl border border-gray-400 px-10 py-6 mx-auto mt-7">
        
        <div>
            <UserPlus className='mx-auto text-indigo-600 bg-indigo-300 p-4 rounded-full' size={70}/>
            <h1 className='text-center text-4xl mt-3 font-bold text-gray-800'><span className='text-indigo-700'>Create</span> Account</h1>
            <h4 className='text-gray-500 mt-2 text-center'>Join  
                <span className='font-bold text-black'> QuillSync </span> 
                today and start your journey today</h4>
        </div>

        <form action='/api/auth/register' className='flex flex-col gap-4' method='POST'>

        <label htmlFor='name' className='label-class'>Name:</label>
        <input type='text' id='name' name='name' className='input-class' placeholder='Ankur' required />

        <label htmlFor='email' className='label-class'>Email:</label>
        <input type='email' id='email' name='email' className='input-class' placeholder='ankur@example.com' required />

        <label htmlFor='password' className='label-class'>Password:</label>
        <input type='password' id='password' name='password' className='input-class' placeholder='Password' required onChange={e=>setPassword(e.target.value)}/>

        {/* This div is here to show the current strength of password */}

        <div className='flex justify-between'>
            <p className={`${passLen ? 'text-green-500' : 'text-gray-500' } flex gap-0.5 justify-center align-bottom`}> <CircleCheckBig size={18}/> Atleast 8 character long</p>
            <p className={`${digit ? 'text-green-600' : 'text-gray-500' } flex gap-0.5`}> <CircleCheckBig size={18} /> Atleast 1 digit</p>
        </div>


        <label htmlFor='confirm-password' className='label-class'>Confirm Password:</label>
        <input type='password' id='confirm-password' className='input-class' placeholder='Confirm Password' required onChange={e=>setConfirmPassword(e.target.value)}/>

        {/*This is here to tell wether the password in both field is same or not?*/}

        {password!==confirmPassword? <p className='text-red-500 mb-0 mt-1'>Passwords do not match</p>:''}

        {/*The user will only able to click the submit button when he/she fills all fields properly */}
        
        <button type='submit' disabled={password!==confirmPassword || password.length===0} className={`${password===confirmPassword && password!==''? 'bg-indigo-600 opacity-100' : 'bg-gray-400 opacity-60'} text-white rounded-4xl text-2xl px-6 py-2 cursor-pointer mt-3 mb-0 ${password===confirmPassword && password!=''? 'hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-95':''}`}>
            Create Account</button>

        <hr></hr>

        </form>
    
        <button className='bg-blue-500 rounded-4xl w-full mt-4 py-2 text-white text-2xl text-center cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-95'>
            <FcGoogle className='inline-block mr-2 bg-white rounded-4xl p-1' size={30}/> Sign up with
            Google</button>

        <p className='text-center mt-2'>Already have an account ? <Link to={'/signin'} className='text-indigo-700 '>Sign in</Link></p>

    </div>
    );
};


export default function SignUp(){
    return(
        <AuthLayout>
            <SignupForm/>
        </AuthLayout>
    )
}