import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { sendEmailVerification } from 'firebase/auth';

function Signup({ close }) {
  const [newUser, setNewUser] = useState({
    email: '',
    password: ''
  });
  
  const [errorMessage, setErrorMessage] = useState(''); // new state variable for error messages
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const submitSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        close();
        console.log('success sign up');
      })
      .catch((error) => {
        const errorMsg = error.message;
        const cleanedErrorMsg = errorMsg.slice(errorMsg.indexOf(":") + 2, ); // slice the string to exclude unwanted parts
        setErrorMessage(cleanedErrorMsg); // update the state with the error message
      });
  };

  return (
    <div className='popup'>
      <h2>Sign Up</h2>
      {errorMessage && <p className=" text-red-300 text-center text-sl pl-20 pr-20 ">{errorMessage}</p>} {/* Display the error message when it exists */}
      <form>
        <div className="floating-label">
          <input 
            id="email"
            type="email"
            className="floating-input"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
          />
          <label 
            htmlFor="email"
            className={`placeholder ${emailFocused || newUser.email ? 'focused' : ''}`}
          >
            Email
          </label>
        </div>
        <div className="floating-label">
          <input 
            id="password"
            type="password"
            className="floating-input"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
          />
          <label 
            htmlFor="password"
            className={`placeholder ${passwordFocused || newUser.password ? 'focused' : ''}`}
          >
            Password
          </label>
        </div>
        <button className='w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600 ' onClick={(e) => submitSignUp(e)}>Sign Up</button>
      </form>
      <div className='buttons-under'>
        <button onClick={() => close('login')}>Have an account? Login</button>
        <button className='close-button' onClick={() => close()}>Close</button>
      </div>
    </div>
  );
}

export default Signup;
