import { TextField, Box } from '@mui/material';

const SearchBar = ({ query, setQuery }) => (
  <Box width="100%" mb={2}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search items..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </Box>
);

export default SearchBar;
