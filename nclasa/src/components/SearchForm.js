import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const apiKey = "Awdq2kBM342hIuWCXVKuRIYi9UhpTAYgmZYa5bZi";

const SearchForm = () => {
  const [date, setDate] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const getImageUrl = (image) => {
    const parts = image.split('epic_1b_');
    console.log(image)
    const year = parts[1].substring(0, 4);
    console.log(year)
    const month = parts[1].substring(4, 6);
    console.log(month)
    const day = parts[1].substring(6, 8);
    const url = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${image}.jpg`;
    return url;
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Date (YYYY-MM-DD)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
  
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      {data && (
        <div>
          <h2>Times:</h2>
          {data.map((item) => {
            return (
              <div key={item.identifier}>
                <p>Date: {item.date}</p>
                <img src={getImageUrl(item.image)} alt="Epic" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
