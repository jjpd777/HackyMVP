import React, {useState} from "react";
import { Link } from "@reach/router";
import FetchData from '../../services/DBfetch'

function SignIn (props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = 
            (event,email, password) => {
                event.preventDefault();
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };



  return (
    <button onClick={()=>
        console.log(props)}>
        ACÁ
        </button>
  );
};
export default SignIn;