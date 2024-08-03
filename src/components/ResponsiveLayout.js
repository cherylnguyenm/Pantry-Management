import { Box } from '@mui/material';

const ResponsiveLayout = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: { xs: '16px', sm: '24px', md: '32px' },
      maxWidth: '1200px',
      margin: '0 auto',
    }}
  >
    {children}
  </Box>
);

export default ResponsiveLayout;
