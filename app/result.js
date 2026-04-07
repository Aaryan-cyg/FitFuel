import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { calculateDiet } from '../utils/calculations';
import { useEffect, useState } from 'react';
import { generateMealPlan } from '../services/aiservices';

export default function ResultScreen() {
  const params = useLocalSearchParams();

  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const result = calculateDiet({
    age: params.age,
    weight: params.weight,
    height: params.height,
    gender: params.gender,
    goal: params.FitnessGoal,
    activity: params.Activity,
  });

  useEffect(() => {
    async function fetchPlan() {
      const plan = await generateMealPlan({
        ...result,
        goal: params.FitnessGoal,
        activity: params.Activity,
        gender: params.gender,
      });

      setMealPlan(plan);
      setLoading(false);
    }

    fetchPlan();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.title}>Your Daily Plan</Text>

      {/* Calories */}
      <View style={styles.card}>
        <Text style={styles.caloriesValue}>{result.calories}</Text>
        <Text style={styles.label}>Calories</Text>
      </View>

      {/* Macros */}
      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.value}>{result.protein}g</Text>
          <Text style={styles.label}>Protein</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.value}>{result.carbs}g</Text>
          <Text style={styles.label}>Carbs</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.value}>{result.fats}g</Text>
          <Text style={styles.label}>Fats</Text>
        </View>
      </View>

      {/* Meal Plan */}
      {loading ? (
        <Text style={{ marginTop: 20 }}>Generating your meal plan...</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Weekly Meal Plan</Text>

          {mealPlan &&
            Object.keys(mealPlan).map((day, index) => (
              <View key={index} style={styles.dayCard}>
                <Text style={styles.dayTitle}>📅 {day.toUpperCase()}</Text>

                <Text style={styles.mealTitle}>🍳 Breakfast</Text>
                <Text style={styles.mealText}>{mealPlan[day].breakfast}</Text>

                <Text style={styles.mealTitle}>🍗 Lunch</Text>
                <Text style={styles.mealText}>{mealPlan[day].lunch}</Text>

                <Text style={styles.mealTitle}>🍛 Dinner</Text>
                <Text style={styles.mealText}>{mealPlan[day].dinner}</Text>

                <Text style={styles.mealTitle}>🥜 Snacks</Text>
                <Text style={styles.mealText}>{mealPlan[day].snacks}</Text>
              </View>
            ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fb', flex: 1 },

  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },

  card: {
    backgroundColor: '#4CAF50',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  caloriesValue: { fontSize: 28, fontWeight: 'bold', color: '#fff' },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  smallCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    width: '30%',
    alignItems: 'center',
    elevation: 2,
  },

  value: { fontSize: 18, fontWeight: 'bold' },
  label: { color: '#777' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  dayCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginTop: 15,
    elevation: 3,
  },

  dayTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  mealTitle: {
    fontWeight: '600',
    color: '#4CAF50',
    marginTop: 8,
  },

  mealText: {
    color: '#555',
    lineHeight: 20,
  },
});