import { Box, Modal, TextField, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const AddItemModal = ({ open, onClose, onAdd, itemName, setItemName, itemQuantity, setItemQuantity }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ ...style, maxWidth: 400, width: '100%' }}>
      <Typography variant="h6" component="h2">
        Add Item
      </Typography>
      <TextField
        label="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <TextField
        label="Quantity"
        type="number"
        value={itemQuantity}
        onChange={(e) => setItemQuantity(parseInt(e.target.value, 10))}
      />
      <Button onClick={() => onAdd(itemName, itemQuantity)}>Add</Button>
    </Box>
  </Modal>
);

export default AddItemModal;
