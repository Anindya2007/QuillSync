// import {signIn} from 'next-auth/react';
import { useState } from 'react';
import '../../../styles/Signup.css';
import { UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link ,useNavigate} from 'react-router-dom';
import AuthLayout from '../layout.jsx';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading]=useState(false);

    // ==================== Below is the authentication part , comment out them when backend is ready ======================

    // const [error, setError]=useState('');
    // const Navigate=useNavigate();

    // async function Authenticate(e){
    //     e.preventDefault();

    //     setLoading(true);

    //     let response=await signIn("credentials", { email, password, redirect: false });

    //     setLoading(false);

    //     if (response?.error){
    //         setError('Email or Password is wrong!!');
    //         return;
    //     }
    //     else{
    //         Navigate('/dashboard')
    //     }
    // }

    //====================== Here the code for authenticaation ends ======================

    return (
        <div className="w-full max-w-2xl rounded-2xl bg-white/80 h-fit shadow-2xl border border-gray-400 px-10 py-10">

            <div>
                <UserPlus className='mx-auto text-indigo-600 bg-indigo-300 p-4 rounded-full' size={70} />
                <h1 className='text-center text-4xl mt-3 font-bold text-gray-800'><span className='text-indigo-700'>Welcome</span> Back</h1>
                <h4 className='text-gray-500 mt-2 text-center'>Signin to continue with
                    <span className='font-bold text-black'> QuillSync </span></h4>
            </div>

            {/* ====================== Below is the form which take details from the user ======================*/}

            {/* <form onSubmit={Authenticate} className='flex flex-col gap-4'> */}
            
            <form className='flex flex-col gap-4'>
            {/* Remove the above form tag and comment out the form tag in comment to enable authentication */}


                <label htmlFor='email' className='label-class'>Email:</label>
                <input type='email' id='email' name='email' className='input-class' placeholder='ankur@example.com' required onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password' className='label-class'>Password:</label>
                <input type='password' id='password' name='password' className='input-class' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />

                {/*The error will be displayed only when credentials are wrong */}
                {/* <p className='text-red-500'>{error}</p>  */}

                <button type='submit' className={`bg-indigo-600 text-white rounded-4xl text-2xl px-6 py-2 cursor-pointer mt-4 mb-1 hover:duration-300 transition ease-in-out transform hover:scale-95`}>
                    {loading? 'Sign In .....': 'Sign in'}</button>

                <hr></hr>q

            </form>

            {/**====================== This is for the scenario when user want to login via Google ======================*/}

            <button className='bg-blue-500 rounded-4xl w-full mt-4 py-2 text-white text-2xl text-center cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-95'>
                <FcGoogle className='inline-block mr-2 bg-white rounded-4xl p-1' size={30} /> Sign in with
                Google</button>

            <p className='text-center mt-4'>Don't have an account
                ?<Link to={'/signup'} className='text-indigo-600 mx-2'>Sign up</Link>
            </p>

        </div>
    );
}

export default function Signin() {
    return (
        <AuthLayout>
            <LoginForm/>
        </AuthLayout>
    );
}