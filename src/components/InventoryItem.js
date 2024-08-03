import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const InventoryItem = ({ name, quantity, onRemove }) => (
  <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography variant="h6">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
          <Typography variant="body2">Quantity: {quantity}</Typography>
        </Stack>
        <Button variant="contained" color="secondary" onClick={onRemove}>
          Remove
        </Button>
      </Stack>
    </CardContent>
  </Card>
);

export default InventoryItem;
