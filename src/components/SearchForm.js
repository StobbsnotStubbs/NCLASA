import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const apiKey = "Awdq2kBM342hIuWCXVKuRIYi9UhpTAYgmZYa5bZi";

const SearchForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${formattedDate}?api_key=${apiKey}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const getImageUrl = (image) => {
    const parts = image.split('epic_1b_');
    const year = parts[1].substring(0, 4);
    const month = parts[1].substring(4, 6);
    const day = parts[1].substring(6, 8);
    const url = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${image}.jpg`;
    return url;
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={selectedDate} onChange={setSelectedDate} 
          required
          label="Date (YYYY-MM-DD)"
        />
      </MuiPickersUtilsProvider>
      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
        Search
      </Button>
      {data && data.length === 0 && (
        <p>No data was found for the selected date.</p>
      )}
      {data && data.length > 0 && (
        <div>
          <h2>Times:</h2>
          {data.map((item) => {
            return (
              <div key={item.identifier}>
                <p>Date: {item.date}</p>
                <img src={getImageUrl(item.image)} alt="Earth" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
