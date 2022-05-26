import React, { useState, useCallback } from 'react';
import {
  Autocomplete,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { location, facilities, prices, ratings } from '../../data/const/constant';
import { getSafe } from '../../data/utils/utils';
import Cards from '../Cards'
import NoFound from '../NoFound'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import './SearchPage.scss';

/**
 * Component Search Page
 * @constant
 * @type {function}
 * @returns {JSX}
 */
const SearchPage = () => {
  const [startDate, setStartDate] = useState('');
  const [selectedCity, setCity] = useState('');
  const [selectedPricePP, setPricePP] = useState('');
  const [selectedFacilities, setFacilities] = useState('');
  const [selectedRating, setRating] = useState('');
  const [filterHolidays, setFilterHolidays] = useState('');
  const [isFiltered, setFiltered] = useState(false);
  const [resHolidays, setResHolidays] = useState('');
  const [loading, setloading] = useState(false);

  let holidays = isFiltered ? filterHolidays : resHolidays;

  const handleSelectCity = (_, value) => {
    setCity(value);
  };

  const handlePricePP = (event) => {
    setPricePP(event.target.value);
  };

  const handleFacilities = useCallback((event) => {
    setFacilities(event.target.value);
  });

  const handleRating = (event) => {
    setRating(event.target.value);
  }

  const handleFilter = () => {
    const filteredHolidays = holidays.filter((holiday) => {
      if (
        getSafe(()=> holiday.pricePerPerson) <= selectedPricePP ||
        getSafe(()=> holiday.rating) === selectedRating ||
        getSafe(()=>holiday.hotel.content.hotelFacilities.includes(selectedFacilities))
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilterHolidays(filteredHolidays);
    setFiltered(true);
  }

  const handleSearch = () => {
    setloading(true);
    const data = {
      bookingType: "hotel",
      location: selectedCity.city.toLowerCase(),
      departureDate: moment(startDate).format("DD-MM-YYYY"),
      duration: "7",
      partyCompositions: [
        {
          adults: 2,
          childAges: [],
          infants: 0,
        },
      ],
    }
    axios
      .post(
        `${process.env.REACT_APP_VIEW_HOLIDAYS}`, data)
      .then((res) => {
        setResHolidays(res.data.holidays);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log("ERR", err);
      });

  }

  const handleClearFilter = () => {
    setFacilities('');
    setPricePP('');
    setRating('');
    setFilterHolidays('');
    setFiltered(false);
  }

  return (
    <>
      <div data-testid="search-page" className="SearchPage">
        <div data-testid="search-page-heading" className="heading">Search Holiday</div>
        <div className="wrapper">
          <Autocomplete
            style={{ width: 200 }}
            disabled={loading}
            id="tags-outlined"
            options={location}
            getOptionLabel={(option) => option.city}
            onChange={handleSelectCity}
            renderInput={(params) => (
              <TextField {...params} margin="normal" fontFamily="lato" variant="outlined" label="Select Location" />
            )}
          />
          <div className="dates_heading">Departure Date</div>
          <DatePicker
            minDate={new Date()}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            placeholderText="Departure Date"
            dateFormat="dd/MM/yyyy"
            disabled={loading}
          />

          <div className="submit">
            <Button data-testid="search-ref-button" disabled={!startDate || !selectedCity || loading} variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        <Divider sx={{ margin: "20px" }} />
        {loading  && <div className="loadPaginate"><i className="fas fa-spinner fa-pulse"></i></div>}
        {resHolidays.length > 0 && (<div>
          <div style={{ color: 'black', fontFamily: 'lato', fontSize: '16px' }} component="legend">
            Filter by...
          </div>
          <Container maxWidth='xl' sx={{ marginTop: "20px" }}>
            <Grid container item xs={12} sm={6} md={8} spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='location'>Price per Person</InputLabel>{" "}
                  <Select
                    labelId='location'
                    id='hotel-location'
                    value={selectedPricePP}
                    label='Price per Person'
                    onChange={handlePricePP}
                  >
                    {prices.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value.value}>
                          {value.displayValue}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='location'>Hotel Facilities</InputLabel>{" "}
                  <Select
                    labelId='location'
                    id='hotel-location'
                    value={selectedFacilities}
                    label='Hotel Facilities'
                    onChange={handleFacilities}
                  >
                    {facilities.map((facility, i) => {
                      return (
                        <MenuItem key={i} value={facility.value}>
                          {facility.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='location'>Hotel rating</InputLabel>{" "}
                  <Select
                    labelId='location'
                    id='hotel-location'
                    value={selectedRating}
                    label='Hotel Rating'
                    onChange={handleRating}
                  >
                    {ratings.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value.displayValue}>
                          <Rating readOnly value={value.displayValue} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <Button
                onClick={handleFilter}
                variant='contained'
                color='primary'
              >
                Filter
              </Button>
              <Button
                disabled={!isFiltered}
                onClick={handleClearFilter}
                variant='contained'
                color='primary'
                style={{ marginLeft: "10px" }}
              >
                Clear Filters
              </Button>
            </div>
          </Container>
          {holidays.length > 0 && <div className='totalCount' component="legend">
            Total Holidays Found {getSafe(()=> holidays.length)}
          </div>}
          {holidays.length > 0 ? <div className='cards'>
            {
              holidays.map((holiday, index) => {
                return (
                  <Cards key={index} holiday={holiday} />
                );
              })
            }
          </div> : <NoFound />}
        </div>)}
      </div>
    </>
  )
};

export default SearchPage;
