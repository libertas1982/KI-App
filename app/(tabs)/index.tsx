import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, TrendingUp, Clock, Star, Filter } from 'lucide-react-native';
import { 
  fetchCategories, 
  fetchFeaturedTools, 
  fetchTrendingTools, 
  fetchNewTools, 
  fetchTopRatedTools 
} from '../../lib/api';
import { useAuth } from '../../context/auth';

export default function DiscoverScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([{ id: 'all', name: 'All' }]);
  const [featuredTools, setFeaturedTools] = useState([]);
  const [trendingTools, setTrendingTools] = useState([]);
  const [newTools, setNewTools] = useState([]);
  const [topRatedTools, setTopRatedTools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      setError(null);
      if (!refreshing) setLoading(true);
      
      // Fetch categories if not already loaded
      if (categories.length <= 1) {
        const fetchedCategories = await fetchCategories();
        setCategories([{ id: 'all', name: 'All' }, ...fetchedCategories]);
      }
      
      // Fetch tools based on selected category
      const options = selectedCategory !== 'All' ? { category: selectedCategory } : {};
      
      const [featured, trending, newTools, topRated] = await Promise.all([
        fetchFeaturedTools(),
        fetchTrendingTools(10),
        fetchNewTools(10),
        fetchTopRatedTools(10)
      ]);
      
      setFeaturedTools(featured);
      setTrendingTools(trending);
      setNewTools(newTools);
      setTopRatedTools(topRated);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const navigateToTool = (id) => {
    router.push(`/tool/${id}`);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategoryItem
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.selectedCategoryText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderToolItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.toolCard}
      onPress={() => navigateToTool(item.id)}
    >
      <Image source={{ uri: item.logo }} style={styles.toolLogo} />
      <View style={styles.toolInfo}>
        <Text style={styles.toolName}>{item.name}</Text>
        <Text style={styles.toolCategory}>{item.category}</Text>
        <View style={styles.toolRating}>
          <Star size={14} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{item.pricing_model}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.featuredCard}
      onPress={() => navigateToTool(item.id)}
    >
      <Image source={{ uri: item.banner }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredContent}>
          <Text style={styles.featuredName}>{item.name}</Text>
          <Text style={styles.featuredDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.featuredMeta}>
            <View style={styles.toolRating}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.featuredRatingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.featuredCategory}>{item.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]} edges={['top']}>
        <ActivityIndicator size="large" color="#4a6cf7" />
        <Text style={styles.loadingText}>Loading AI tools...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]} edges={['top']}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello {user?.user_metadata?.full_name ? user.user_metadata.full_name.split(' ')[0] : 'there'} 👋</Text>
            <Text style={styles.title}>Discover AI Tools</Text>
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => router.push('/search')}>
            <Filter size={20} color="#4a6cf7" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {featuredTools.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Sparkles size={20} color="#4a6cf7" />
              <Text style={styles.sectionTitle}>Featured Tools</Text>
            </View>
            <FlatList
              data={featuredTools}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        {trendingTools.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <TrendingUp size={20} color="#4a6cf7" />
              <Text style={styles.sectionTitle}>Trending Now</Text>
            </View>
            <FlatList
              data={trendingTools}
              renderItem={renderToolItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.toolsList}
            />
          </View>
        )}

        {newTools.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Clock size={20} color="#4a6cf7" />
              <Text style={styles.sectionTitle}>New Arrivals</Text>
            </View>
            <FlatList
              data={newTools}
              renderItem={renderToolItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.toolsList}
            />
          </View>
        )}

        {topRatedTools.length > 0 && (
          <View style={[styles.section, styles.lastSection]}>
            <View style={styles.sectionHeader}>
              <Star size={20} color="#4a6cf7" />
              <Text style={styles.sectionTitle}>Top Rated</Text>
            </View>
            <FlatList
              data={topRatedTools}
              renderItem={renderToolItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.toolsList}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4a6cf7',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    marginRight: 10,
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
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 100, // Extra space at the bottom for the tab bar
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  featuredList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  featuredCard: {
    width: 280,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 15,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredRatingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  featuredCategory: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  toolsList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  toolCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  toolLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  toolInfo: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  toolCategory: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  toolRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 4,
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#4a6cf7',
  },
});