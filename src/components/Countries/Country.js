import './Country.css';
import Card from '../../UI/Card';
import { useState } from 'react';
import Popup from '../../UI/Popup';

const Country = (props) => {
    const [open, setOpen] = useState(false);

    const addToFavourites = (event) => {
        var favouriteCountries = JSON.parse(localStorage.getItem('favouriteCountries')) || [];

        if (!favouriteCountries.includes(event.target.value)) {
            favouriteCountries.push(event.target.value);
        };
        localStorage.removeItem('favouriteCountries');
        localStorage.setItem('favouriteCountries', JSON.stringify(favouriteCountries));
    }

    const setTriggerPopup = () => {
        setOpen(false);
    }

    return (
        <Card className="country">
            <h2>{props.name}</h2>
            <div className="country_buttons">
                <button type="button" onClick={addToFavourites} value={props.name} className={`${props.home === true ? 'button-show' : 'button-hide'} `}>Add to Favourites</button>
                <button type="button" onClick={() => {props.removeFavourites(props.name);}} value={props.name} className={`${props.home === true ? 'button-hide' : 'button-show'} `}>Remove from Favourites</button>
                <button onClick={() => { setOpen(true); }}>Show Details</button>
            </div>
            <Popup trigger={open} setTrigger={setTriggerPopup}>
                <h2>{props.name}</h2>
                <div>
                    Capital: {props.capital}<br /><br />
                    Population : {props.population}
                </div>
            </Popup>
        </Card>
    )
}
export default Country;