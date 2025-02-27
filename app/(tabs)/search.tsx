import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, X, SlidersHorizontal, Star } from 'lucide-react-native';
import { mockTools, categories, pricingModels, features } from '../../data/mockData';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPricing, setSelectedPricing] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [recentSearches, setRecentSearches] = useState(['ChatGPT', 'Midjourney', 'Stable Diffusion', 'DALL-E']);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = mockTools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategories = selectedCategories.length === 0 || 
                                 selectedCategories.includes(tool.category);
        
        const matchesPricing = selectedPricing.length === 0 || 
                              selectedPricing.includes(tool.pricingModel);
        
        const matchesFeatures = selectedFeatures.length === 0 || 
                               selectedFeatures.some(feature => tool.features.includes(feature));
        
        return matchesSearch && matchesCategories && matchesPricing && matchesFeatures;
      });
      
      // Sort results
      let sortedResults = [...filteredResults];
      switch (sortBy) {
        case 'rating':
          sortedResults.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          sortedResults.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
          break;
        case 'popularity':
          sortedResults.sort((a, b) => b.popularity - a.popularity);
          break;
        // relevance is default, no sorting needed
      }
      
      setSearchResults(sortedResults);
      setIsLoading(false);
      
      // Add to recent searches if not already there
      if (searchQuery.trim() !== '' && !recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
      }
    }, 500);
  }, [searchQuery, selectedCategories, selectedPricing, selectedFeatures, sortBy]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleFilter = (filter, item) => {
    if (filter === 'categories') {
      setSelectedCategories(prev => 
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    } else if (filter === 'pricing') {
      setSelectedPricing(prev => 
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    } else if (filter === 'features') {
      setSelectedFeatures(prev => 
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSelectedFeatures([]);
    setSortBy('relevance');
  };

  const navigateToTool = (id) => {
    router.push(`/tool/${id}`);
  };

  const renderToolItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => navigateToTool(item.id)}
    >
      <View style={styles.resultContent}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.resultMeta}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.categoryBadge}>{item.category}</Text>
          <Text style={styles.priceBadge}>{item.pricingModel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChip = (type, item, isSelected) => (
    <TouchableOpacity
      style={[styles.filterChip, isSelected && styles.selectedFilterChip]}
      onPress={() => toggleFilter(type, item)}
    >
      <Text style={[styles.filterChipText, isSelected && styles.selectedFilterChipText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderSortOption = (option, label) => (
    <TouchableOpacity
      style={[styles.sortOption, sortBy === option && styles.selectedSortOption]}
      onPress={() => setSortBy(option)}
    >
      <Text style={[styles.sortOptionText, sortBy === option && styles.selectedSortOptionText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search AI tools..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={20} color={showFilters ? '#4a6cf7' : '#64748b'} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Categories</Text>
              </View>
              <View style={styles.chipContainer}>
                {categories.map(category => (
                  renderFilterChip('categories', category.name, selectedCategories.includes(category.name))
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Pricing</Text>
              </View>
              <View style={styles.chipContainer}>
                {pricingModels.map(pricing => (
                  renderFilterChip('pricing', pricing, selectedPricing.includes(pricing))
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Features</Text>
              </View>
              <View style={styles.chipContainer}>
                {features.map(feature => (
                  renderFilterChip('features', feature, selectedFeatures.includes(feature))
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Sort By</Text>
              </View>
              <View style={styles.sortContainer}>
                {renderSortOption('relevance', 'Relevance')}
                {renderSortOption('rating', 'Rating')}
                {renderSortOption('newest', 'Newest')}
                {renderSortOption('popularity', 'Popularity')}
              </View>
            </View>

            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear All Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a6cf7" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderToolItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
        />
      ) : searchQuery.trim() !== '' ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
          <Text style={styles.noResultsSubtext}>Try different keywords or adjust your filters</Text>
        </View>
      ) : (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
          {recentSearches.map((search, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.recentSearchItem}
              onPress={() => setSearchQuery(search)}
            >
              <SearchIcon size={16} color="#64748b" />
              <Text style={styles.recentSearchText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1e293b',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    maxHeight: 400,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilterChip: {
    backgroundColor: '#4a6cf7',
  },
  filterChipText: {
    fontSize: 14,
    color: '#64748b',
  },
  selectedFilterChipText: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
  },
  selectedSortOption: {
    backgroundColor: '#4a6cf7',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#64748b',
  },
  selectedSortOptionText: {
    color: '#fff',
  },
  clearFiltersButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    marginTop: 10,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748b',
  },
  resultsList: {
    padding: 20,
    paddingBottom: 100, // Extra space for tab bar
  },
  resultItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  resultDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 4,
  },
  categoryBadge: {
    fontSize: 12,
    color: '#4a6cf7',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  priceBadge: {
    fontSize: 12,
    color: '#047857',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  recentSearchesContainer: {
    padding: 20,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  recentSearchText: {
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
});