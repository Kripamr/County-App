import Country from '../Countries/Country';
import { useEffect, useState } from 'react';
import axios from "axios";

const Favourites = () => {
    const [countryData, setCountryData] = useState([]);
    const [error, setError] = useState('');
    const [favouriteCountries, setFavouriteCountries] = useState([]);

    useEffect(() => {
        setFavouriteCountries(JSON.parse(localStorage.getItem('favouriteCountries')) || []);
    }, []);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountryData(response.data || []))
            .catch(error => {
                setError({ errorMessage: error.message });
                console.error('There was an error!', error);
            })
    }, []);

    const removeFromFavourites = (name) => {
        var favouriteCountries = JSON.parse(localStorage.getItem('favouriteCountries'));
        var newFavouriteList = favouriteCountries.filter(country => country !== name);
        localStorage.setItem('favouriteCountries', JSON.stringify(newFavouriteList));
        setFavouriteCountries(JSON.parse(localStorage.getItem('favouriteCountries')));
    }

    return (
        (error) ? <div>There was an error! {error}</div> :
        <ul className="countries-list">
            {countryData.map(country => {
                return favouriteCountries.includes(country.name) ?
                    <Country
                        key={country.name}
                        name={country.name}
                        capital={country.capital}
                        home={false}
                        population={country.population}
                        removeFavourites={removeFromFavourites} />
                    : ''
            })}
        </ul>

    )
}
export default Favourites;