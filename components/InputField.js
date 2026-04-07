import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function InputField({ label, value, onChangeText, keyboardType = "default" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={`Enter ${label}`}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 18 },

  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});