import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bookmark, Star, Trash2, BarChart2 } from 'lucide-react-native';
import { useAuth } from '../../context/auth';
import { fetchSavedTools, unsaveTool } from '../../lib/api';

export default function SavedScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [savedTools, setSavedTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadSavedTools();
    }
  }, [user]);

  const loadSavedTools = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchSavedTools(user.id);
      setSavedTools(data);
    } catch (err) {
      console.error('Error fetching saved tools:', err);
      setError('Failed to load saved tools. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToTool = (id) => {
    if (isSelectionMode) {
      toggleToolSelection(id);
    } else {
      router.push(`/tool/${id}`);
    }
  };

  const toggleToolSelection = (id) => {
    setSelectedTools(prev => {
      if (prev.includes(id)) {
        return prev.filter(toolId => toolId !== id);
      } else {
        if (prev.length < 4) {
          return [...prev, id];
        }
        return prev;
      }
    });
  };

  const startCompare = () => {
    router.push({
      pathname: '/compare',
      params: { tools: selectedTools.join(',') }
    });
  };

  const removeTool = async (id) => {
    try {
      await unsaveTool(user.id, id);
      setSavedTools(prev => prev.filter(tool => tool.id !== id));
    } catch (err) {
      console.error('Error removing tool:', err);
      // Show error message to user
    }
  };

  const renderToolItem = ({ item }) => {
    const isSelected = selectedTools.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={[styles.toolCard, isSelected && styles.selectedToolCard]}
        onPress={() => navigateToTool(item.id)}
        activeOpacity={0.7}
      >
        {isSelectionMode && (
          <View style={[styles.selectionIndicator, isSelected && styles.selectedIndicator]}>
            {isSelected && <View style={styles.selectedDot} />}
          </View>
        )}
        
        <Image source={{ uri: item.logo }} style={styles.toolLogo} />
        
        <View style={styles.toolInfo}>
          <Text style={styles.toolName}>{item.name}</Text>
          <Text style={styles.toolCategory}>{item.category}</Text>
          <View style={styles.toolMeta}>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.priceBadge}>{item.pricing_model || 'Free'}</Text>
          </View>
        </View>
        
        {!isSelectionMode && (
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeTool(item.id)}
          >
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]} edges={['top']}>
        <ActivityIndicator size="large" color="#4a6cf7" />
        <Text style={styles.loadingText}>Loading saved tools...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]} edges={['top']}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadSavedTools}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Saved Tools</Text>
          <Text style={styles.subtitle}>Your bookmarked AI tools</Text>
        </View>
        
        {savedTools.length > 0 && (
          <TouchableOpacity 
            style={styles.selectionButton}
            onPress={() => {
              setIsSelectionMode(!isSelectionMode);
              setSelectedTools([]);
            }}
          >
            <Text style={styles.selectionButtonText}>
              {isSelectionMode ? 'Cancel' : 'Select'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {savedTools.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Bookmark size={60} color="#cbd5e1" />
          <Text style={styles.emptyTitle}>No saved tools</Text>
          <Text style={styles.emptySubtitle}>
            Tools you bookmark will appear here for easy access
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.browseButtonText}>Browse Tools</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={savedTools}
            renderItem={renderToolItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.toolsList}
            showsVerticalScrollIndicator={false}
          />
          
          {isSelectionMode && selectedTools.length > 0 && (
            <View style={styles.compareBarContainer}>
              <View style={styles.compareBar}>
                <View style={styles.compareInfo}>
                  <Text style={styles.compareCount}>
                    {selectedTools.length} {selectedTools.length === 1 ? 'tool' : 'tools'} selected
                  </Text>
                  <Text style={styles.compareHint}>
                    {selectedTools.length < 4 ? 'Select up to 4 tools' : 'Maximum reached'}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.compareButton}
                  onPress={startCompare}
                  disabled={selectedTools.length < 2}
                >
                  <BarChart2 size={18} color="#fff" />
                  <Text style={styles.compareButtonText}>Compare</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  selectionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e0e7ff',
  },
  selectionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a6cf7',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4a6cf7',
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight