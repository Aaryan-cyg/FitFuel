import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import InputField from '../components/InputField';

export default function HomeScreen() {
  const router = useRouter();

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [FitnessGoal, setFitnessGoal] = useState('Weight-Loss');
  const [Activity, setActivity] = useState('Sedentary');

  const handleSubmit = () => {
    if (!age || !weight || !height || !gender) {
      alert("Please fill all fields");
      return;
    }

    router.push({
      pathname: '/result',
      params: { age, weight, height, gender, FitnessGoal, Activity }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>FitFuel</Text>
      <Text style={styles.subtitle}>Smart AI Diet Planner</Text>

      <View style={styles.card}>
        <InputField label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
        <InputField label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
        <InputField label="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.picker}>
          <Picker selectedValue={gender} onValueChange={setGender}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <Text style={styles.label}>Goal</Text>
        <View style={styles.picker}>
          <Picker selectedValue={FitnessGoal} onValueChange={setFitnessGoal}>
            <Picker.Item label="Weight Loss" value="Weight-Loss" />
            <Picker.Item label="Muscle Gain" value="Muscle Gain" />
            <Picker.Item label="Maintenance" value="Maintainance" />
          </Picker>
        </View>

        <Text style={styles.label}>Activity</Text>
        <View style={styles.picker}>
          <Picker selectedValue={Activity} onValueChange={setActivity}>
            <Picker.Item label="Sedentary" value="Sedentary" />
            <Picker.Item label="Moderate" value="Moderate" />
            <Picker.Item label="Active" value="Active" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Generate Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f8f9fb', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#777', marginBottom: 20 },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },

  label: { marginTop: 10, marginBottom: 5, color: '#555' },

  picker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
  },

  buttonText: { color: '#fff', fontWeight: 'bold' },
});