import { useEffect, useState } from 'react';
import axios from "axios";
import './Country.css';
import Country from './Country';

const CountryList = (props) => {
    const [countryData, setCountryData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountryData(response.data || []))
            .catch(error => {
                setError({ errorMessage: error.message });
                console.error('There was an error!', error);
            })
    }, []);

    return (
        (error) ? <div>There was an error! {error}</div> :
        <ul className="countries-list">
            {countryData.map(country => {
                return props.regions.includes(country.region) ?
                    <Country
                        key={country.name}
                        name={country.name}
                        capital={country.capital}
                        home={true}
                        population={country.population}
                    />
                    : ''
            })}
        </ul>
    )
}
export default CountryList;