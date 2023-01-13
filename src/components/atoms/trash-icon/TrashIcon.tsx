import React from 'react';
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface TrashIconProps {
  handleDelete: () => void;
}

const TrashIcon = ({ handleDelete }: TrashIconProps) => {
  return (
    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={handleDelete}>
      <Octicons name='trash' size={18} color='#000' />
    </TouchableOpacity>
  );
};

export default TrashIcon;
