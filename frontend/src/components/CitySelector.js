import SearchIcon from '@mui/icons-material/Search';
import { Select, InputBase, IconButton, MenuItem } from '@mui/material';
import { useState } from 'react';
import { searchCities } from '../api/city';

const CitySelector = ({ onSelect }) => {
  const [city, setCity] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    setOptions((await searchCities(search)).cities);
  };
  const handleSelect = (e) => {
    setCity(e.target.value);
    onSelect(e.target.value);
  };
  return (
    <div className="city-selector">
      <div className="city-search">
        <InputBase
          placeholder="Search for a city"
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon onClick={handleSearch} />
        </IconButton>
      </div>
      <br />
      {options.length > 0 && (
        <div className="city-list">
          <Select
            sx={{ minWidth: '200px' }}
            value={city}
            defaultValue={{ label: 'Select a city', value: '' }}
            displayEmpty
            placeholder="Select a city"
            onChange={handleSelect}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name + ', ' + option.country}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
