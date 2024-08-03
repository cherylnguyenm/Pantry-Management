'use client';

import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '@/firebase';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import AddItemModal from '../components/AddItemModal';
import InventoryItem from '../components/InventoryItem';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'inventory'), (snapshot) => {
      const inventoryList = snapshot.docs.map(doc => ({ name: doc.id, ...doc.data() }));
      console.log('Real-time inventory:', inventoryList); // Debug log
      setInventory(inventoryList);
    });

    return () => unsubscribe();
  }, []);

  const addItem = async (item, quantity) => {
    const docRef = doc(firestore, 'inventory', item.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: existingQuantity + quantity });
    } else {
      await setDoc(docRef, { quantity });
    }
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemQuantity(1);
  };

  const handleAdd = () => {
    addItem(itemName, itemQuantity);
    setItemName('');
    setItemQuantity(1);
    handleClose();
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <AddItemModal
        open={open}
        onClose={handleClose}
        onAdd={handleAdd}
        itemName={itemName}
        setItemName={setItemName}
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
      />
      <Button variant="contained"
        onClick={handleOpen}
        sx={{
          background: 'linear-gradient(90deg, rgba(0,79,193,1) 0%, rgba(0,173,155,1) 66%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, rgba(0,79,193,0.8) 0%, rgba(0,173,155,0.8) 66%)',
          },
          borderRadius: 'var(--border-radius)',
        }}
      >
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'rgb(34, 101, 195)'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#ffffff'} textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>
        <SearchBar query={query} setQuery={setQuery} />
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {filteredInventory.map(({ name, quantity }) => (
            <InventoryItem
              key={name}
              name={name}
              quantity={quantity}
              onRemove={() => removeItem(name)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
