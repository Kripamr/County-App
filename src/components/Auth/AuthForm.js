import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import classes from './AuthForm.module.css';
import axios from "axios";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [countryData, setCountryData] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState('');
    const [isValidPassword, setIsValidPassword] = useState('');
    const [isValidName, setIsValidName] = useState('');
    const [enteredCountry, setEnteredCountry] = useState('Afghanistan');
    const [enteredName, setEnteredNAme] = useState('');
    let history = useHistory();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountryData(response.data));
    }, [])

    const emailChangeHandler = (event) => {
        var users = JSON.parse(localStorage.getItem('usersList')) || [];
        var userExist = users.find(user => user.email === event.target.value);
        if (!isLogin && userExist) {
            setIsValidEmail(false);
            alert('User already exist!');
        } else {
            setIsValidEmail(true);
            setEnteredEmail(event.target.value);
        }
    }

    const passwordChangeHandler = (event) => {
        let letterNumber = /^[0-9a-zA-Z]+$/;
        let password = event.target.value;
        password = password.replace(/^\s+/, '');
        setEnteredPassword(password);
        if (password.length > 15 || !password.match(letterNumber)) {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(true);
            setEnteredPassword(event.target.value);
        }
    }

    const countryChangeHandler = (event) => {
        setEnteredCountry(event.target.value);
    }

    const nameChangeHandler = (event) => {
        let letterNumber = /^[0-9a-zA-Z]+$/;
        let name = event.target.value;
        name = name.replace(/^\s+/, '');
        setEnteredNAme(name);
        if (!name.match(letterNumber)) {
            setIsValidName(false);
        } else {
            setIsValidName(true);
            setEnteredNAme(event.target.value);
        }
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const userData = {
            email: enteredEmail,
            password: enteredPassword,
            country: enteredCountry,
            name: enteredName
        }

        if (!isLogin) {
            if (isValidPassword && isValidEmail && isValidName) {
                var usersList = JSON.parse(localStorage.getItem('usersList')) || [];
                usersList.push(userData);
                localStorage.setItem('usersList', JSON.stringify(usersList));
                setEnteredEmail('');
                setEnteredPassword('');
                setEnteredCountry('Afghanistan');
                setEnteredNAme('');
            } else {
                alert('There is an error in one of the fields');
            }
        } else {
            var existingUsers = JSON.parse(localStorage.getItem('usersList')) || [];
            var loginUser = existingUsers.find(({ email, password }) => email === enteredEmail && password === enteredPassword)
            if (loginUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(loginUser));
                history.push('/app/home');
            } else {
                alert('Username and password doesn\'t match');
                setEnteredEmail('');
                setEnteredPassword('');
            }
        }

    }
    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={formSubmitHandler}>
                <div className={`${classes.control} ${isValidEmail === false ? classes.invalid : ''
                    }`}>
                    <label>Your Email</label>
                    <input
                        type='email'
                        id='email'
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        required />
                </div>
                <div className={`${classes.control} ${isValidPassword === false ? classes.invalid : ''
                    }`}>
                    <label>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        required />
                    <label>Password should be max 15 characters, no Special characters</label>
                </div>
                <br></br>
                {!(isLogin) &&
                    <div>
                        <div className={classes.control}>
                            <label>Choose Country</label>
                            <select onChange={countryChangeHandler} defaultValue="Afghanistan">
                                {countryData.map(country => {
                                    return (<option key={country.name} value={country.name}>{country.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className={`${classes.control} ${isValidName === false ? classes.invalid : ''
                            }`}>
                            <label>Display Name</label>
                            <input type='text' id='name' value={enteredName} onChange={nameChangeHandler}></input>
                            <label>Display name should not contain special characters(including space)</label>
                        </div>
                        <br></br>
                    </div>
                }
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <br></br>
                    <button
                        type='button'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create New Account' : 'Login with Existing Account'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;