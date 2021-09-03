import { useEffect, useState } from 'react';
import axios from "axios";
import CountryList from '../Countries/CountryList';
import './Home.css';

const RegionFilter = () => {
    const [countryData, setCountryData] = useState([]);
    const [error, setError] = useState('');
    const [checkedRegions, setCheckedRegions] = useState([]);
    const regionArray = [];


    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountryData(response.data || []))
            .catch(error => {
                setError({ errorMessage: error.message });
                console.error('There was an error!', error);
            })
    }, []);

    const handleCheckbox = (event, region) => {
        var checkedListRegions = [...checkedRegions];
        if (event.target.checked) {
            checkedListRegions.push(region);
        } else {
            checkedListRegions = checkedListRegions.filter(item => item !== region);
        }
        setCheckedRegions(checkedListRegions);
    }
    return (
        (error) ? <div>There was an error! {error}</div> :
        <div className="home-split_screen">
            <div className="home-topPane">
                <h1>Choose Regions</h1>
                {countryData.map((anObjectMapped, index) => {
                    if (!regionArray.includes(anObjectMapped.region)) {
                        regionArray.push(anObjectMapped.region);
                        return (
                            <h3 key={`${anObjectMapped.name}`}>
                                <input type="checkbox" id={`${anObjectMapped.name}`} name="countryId" value={`${anObjectMapped.region}`}
                                    onChange={(e) => handleCheckbox(e, anObjectMapped.region)} />
                                {anObjectMapped.region}
                                <span className="checkbox" />
                            </h3>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="home-bottomPane">
                <CountryList regions={checkedRegions} />
            </div>
        </div>
    )
}

export default RegionFilter;