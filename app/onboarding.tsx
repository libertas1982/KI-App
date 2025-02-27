import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Check } from 'lucide-react-native';
import { categories } from '../data/mockData';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      if (selectedCategories.length < 5) {
        setSelectedCategories([...selectedCategories, categoryId]);
      }
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences and redirect to home
      router.replace('/');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?q=80&w=800&auto=format&fit=crop' }}
        style={styles.stepImage}
      />
      <Text style={styles.stepTitle}>Discover AI Tools</Text>
      <Text style={styles.stepDescription}>
        Find and compare the best AI tools for your needs. Our platform helps you discover the latest and most powerful AI tools available.
      </Text>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1686193142599-2b0b77ac624d?q=80&w=800&auto=format&fit=crop' }}
        style={styles.stepImage}
      />
      <Text style={styles.stepTitle}>Compare Features</Text>
      <Text style={styles.stepDescription}>
        Compare AI tools side by side to find the perfect match for your requirements. Analyze features, pricing, and user reviews.
      </Text>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Your Interests</Text>
      <Text style={styles.stepDescription}>
        Choose up to 5 categories that interest you the most. We'll personalize your experience based on your preferences.
      </Text>
      
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategories.includes(item.id) && styles.selectedCategoryItem
            ]}
            onPress={() => handleCategoryToggle(item.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(item.id) && styles.selectedCategoryText
              ]}
            >
              {item.name}
            </Text>
            {selectedCategories.includes(item.id) && (
              <Check size={16} color="#fff" />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.categoryRow}
      />
      
      <Text style={styles.selectionHint}>
        {selectedCategories.length}/5 categories selected
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.progressDot,
              i === step && styles.activeProgressDot,
              i < step && styles.completedProgressDot,
            ]}
          />
        ))}
      </View>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            step === 3 && selectedCategories.length === 0 && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={step === 3 && selectedCategories.length === 0}
        >
          <Text style={styles.nextButtonText}>
            {step < 3 ? 'Next' : 'Get Started'}
          </Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>

        {step < 3 && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 5,
  },
  activeProgressDot: {
    backgroundColor: '#4a6cf7',
    width: 20,
  },
  completedProgressDot: {
    backgroundColor: '#4a6cf7',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  stepImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '48%',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  selectedCategoryItem: {
    backgroundColor: '#4a6cf7',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  selectionHint: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a6cf7',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#4a6cf7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
    shadowColor: '#94a3b8',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
});