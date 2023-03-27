import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Language } from '../../../models';
import { languages as languageList } from '../../../data';
import styles from './styles';

interface LanguagePopupProps {
  modalVisible: boolean;
  setModalVisible(val: boolean): void;
  onSelectLanguage(language: Language): void;
}

const LanguagePopup = ({
  modalVisible,
  setModalVisible,
  onSelectLanguage,
}: LanguagePopupProps) => {
  const languages: Language[] = languageList;
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );

  const renderItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => setSelectedLanguage(item)}
    >
      {selectedLanguage?.id === item.id ? (
        <Text style={styles.radio}>◉</Text>
      ) : (
        <Text style={styles.radio}>◯</Text>
      )}
      <Text style={styles.languageText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleConfirm = () => {
    if (selectedLanguage) {
      onSelectLanguage(selectedLanguage);
    }
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <FlatList
              numColumns={2}
              data={languages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={styles.columnWrapper}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleConfirm}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LanguagePopup;
