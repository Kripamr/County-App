import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from '../Auth/AuthForm.module.css';

const Profile = () => {
    const userCredentials = JSON.parse(localStorage.getItem('loggedInUser'));
    const [newName, setNewName] = useState(userCredentials.name);
    const [newPassword, setNewPassword] = useState(userCredentials.password);
    const [apiData, setApiData] = useState('');
    const [error, setError] = useState('');
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [country, setCountry] = useState(userCredentials.country)
    const [countryDetails, setCountryDetails] = useState('');
    let history = useHistory();

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setApiData(response.data || []))
            .catch(error => {
                setError({ errorMessage: error.message });
                console.error('There was an error!', error);
            })
    }, []);

    useEffect(() => {
        if (typeof (apiData) == "object") {
            let details = apiData.filter(data => data.name === country);
            setCountryDetails(details);
        }
    }, [apiData, country]);

    const saveUserCredentials = (event) => {
        event.preventDefault();
        if (isValidName && isValidPassword) {
            localStorage.removeItem('loggedInUser');
            const editedUserCredentials = {
                email: userCredentials.email,
                password: newPassword,
                name: newName,
                country: country
            }
            localStorage.setItem('loggedInUser', JSON.stringify(editedUserCredentials));
            var existingUsers = JSON.parse(localStorage.getItem('usersList'));
            var filteredUsers = existingUsers.filter(user => user.email !== userCredentials.email);
            filteredUsers.push(editedUserCredentials);
            localStorage.removeItem('usersList');
            localStorage.setItem('usersList', JSON.stringify(filteredUsers));
            alert('User credentials updated!');
        } else {
            alert('There is an error in one of the fields');
        }
    }

    const deleteUserAccount = (event) => {
        event.preventDefault();
        var existingUsers = JSON.parse(localStorage.getItem('usersList'));
        var filteredUsers = existingUsers.filter(user => user.email !== userCredentials.email);
        localStorage.removeItem('usersList');
        localStorage.setItem('usersList', JSON.stringify(filteredUsers));
        localStorage.removeItem('favouriteCountries');
        localStorage.removeItem('loggedInUser');
        alert('User deleted Successfully!');
        history.push('/');
    }

    const nameChangeHandler = (event) => {
        let letterNumber = /^[0-9a-zA-Z]+$/;
        let name = event.target.value;
        name = name.replace(/^\s+/, '');
        setNewName(name);
        if (!name.match(letterNumber)) {
            setIsValidName(false);
        } else {
            setIsValidName(true);
            setNewName(event.target.value);
        }
    }

    const passwordChangeHandler = (event) => {
        let letterNumber = /^[0-9a-zA-Z]+$/;
        let password = event.target.value;
        password = password.replace(/^\s+/, '');
        setNewPassword(password);
        if (password.length > 15 || !password.match(letterNumber)) {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(true);
            setNewPassword(event.target.value);
        }
    }
    return (
        (error) ? <div>There was an error! {error}</div> :
        <section className={classes.auth}>
            <form>
                <div className={`${classes.control}`}>
                    <label>Your Email</label>
                    <input type='email' id='email' value={userCredentials.email} readOnly></input>
                </div>
                <div className={`${classes.control} ${isValidName === false ? classes.invalid : ''
                    }`}>
                    <label>Your Name</label>
                    <input type='text' id='name' defaultValue={userCredentials.name} onChange={nameChangeHandler}></input>
                    <label>Display name should not contain special characters(including space)</label>
                </div><br></br>
                <div className={`${classes.control} ${isValidPassword === false ? classes.invalid : ''
                    }`}>
                    <label>Your Password</label>
                    <input type='password' id='password' defaultValue={userCredentials.password} onChange={passwordChangeHandler}></input>
                    <label>Password should be max 15 characters, no Special characters</label>
                </div><br></br>
                <div className={classes.actions}>
                    <button onClick={saveUserCredentials}>Save</button><br></br>
                    <button onClick={deleteUserAccount}>Delete Account</button>
                </div>
                <br></br>
                <br></br>
                <div className={`${classes.control}`}>
                    <label><b><u>Details of {country}</u></b></label>
                    {
                        (apiData && countryDetails) ? <label>
                            capital : {countryDetails[0].capital}<br></br>
                            cioc : {countryDetails[0].cioc}<br></br>
                            region : {countryDetails[0].region}<br></br>
                            subregion : {countryDetails[0].subregion}<br></br>
                            population : {countryDetails[0].population}<br></br>
                            nativeName : {countryDetails[0].nativeName}<br></br>
                        </label>
                            : ""
                    }
                </div>
            </form>
        </section>
    )
}

export default Profile;