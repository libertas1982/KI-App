import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, X, ArrowRight, Check, Star } from 'lucide-react-native';
import { mockTools } from '../../data/mockData';
import { useLocalSearchParams } from 'expo-router';

export default function CompareScreen() {
  const params = useLocalSearchParams();
  const [selectedTools, setSelectedTools] = useState([]);
  const [showToolSelector, setShowToolSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toolsToSelect, setToolsToSelect] = useState([]);

  useEffect(() => {
    // Handle tools passed from other screens
    if (params.tools) {
      const toolIds = params.tools.split(',').map(id => parseInt(id));
      const toolsToCompare = mockTools.filter(tool => toolIds.includes(tool.id));
      setSelectedTools(toolsToCompare);
    }
    
    // Filter tools based on search query
    const filteredTools = mockTools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTools.some(selected => selected.id === tool.id)
    );
    setToolsToSelect(filteredTools);
  }, [searchQuery, selectedTools, params.tools]);

  const addTool = (tool) => {
    if (selectedTools.length < 4) {
      setSelectedTools([...selectedTools, tool]);
      setShowToolSelector(false);
      setSearchQuery('');
    }
  };

  const removeTool = (toolId) => {
    setSelectedTools(selectedTools.filter(tool => tool.id !== toolId));
  };

  const renderToolSelector = () => (
    <View style={styles.toolSelectorContainer}>
      <View style={styles.toolSelectorHeader}>
        <Text style={styles.toolSelectorTitle}>Select a tool to compare</Text>
        <TouchableOpacity onPress={() => setShowToolSelector(false)}>
          <X size={24} color="#64748b" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for tools..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>
      
      <FlatList
        data={toolsToSelect}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.toolSelectItem}
            onPress={() => addTool(item)}
          >
            <Image source={{ uri: item.logo }} style={styles.toolSelectLogo} />
            <View style={styles.toolSelectInfo}>
              <Text style={styles.toolSelectName}>{item.name}</Text>
              <Text style={styles.toolSelectCategory}>{item.category}</Text>
            </View>
            <ArrowRight size={20} color="#4a6cf7" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No tools found</Text>
          </View>
        }
      />
    </View>
  );

  const renderComparisonTable = () => {
    if (selectedTools.length === 0) {
      return (
        <View style={styles.emptyCompareContainer}>
          <Text style={styles.emptyCompareText}>
            Select up to 4 AI tools to compare their features, pricing, and capabilities
          </Text>
          <TouchableOpacity 
            style={styles.addToolButton}
            onPress={() => setShowToolSelector(true)}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.addToolButtonText}>Add Tool</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView style={styles.comparisonContainer}>
        {/* Tools Header Row */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Tools</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonHeaderCell}>
              <Image source={{ uri: tool.logo }} style={styles.comparisonToolLogo} />
              <Text style={styles.comparisonToolName}>{tool.name}</Text>
              <TouchableOpacity 
                style={styles.removeToolButton}
                onPress={() => removeTool(tool.id)}
              >
                <X size={16} color="#64748b" />
              </TouchableOpacity>
            </View>
          ))}
          {selectedTools.length < 4 && (
            <TouchableOpacity 
              style={styles.addMoreCell}
              onPress={() => setShowToolSelector(true)}
            >
              <Plus size={24} color="#4a6cf7" />
              <Text style={styles.addMoreText}>Add Tool</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Row */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Category</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonCell}>
              <Text style={styles.comparisonCellText}>{tool.category}</Text>
            </View>
          ))}
          {selectedTools.length < 4 && <View style={styles.emptyCell} />}
        </View>

        {/* Rating Row */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Rating</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonCell}>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>{tool.rating.toFixed(1)}</Text>
              </View>
            </View>
          ))}
          {selectedTools.length < 4 && <View style={styles.emptyCell} />}
        </View>

        {/* Pricing Row */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Pricing</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonCell}>
              <Text style={styles.comparisonCellText}>{tool.pricingModel}</Text>
              <Text style={styles.pricingDetails}>{tool.pricing || 'Details not available'}</Text>
            </View>
          ))}
          {selectedTools.length < 4 && <View style={styles.emptyCell} />}
        </View>

        {/* Features Row */}
        <View style={[styles.comparisonRow, styles.featuresRow]}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Features</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonCell}>
              {(tool.features || []).map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color="#4a6cf7" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          ))}
          {selectedTools.length < 4 && <View style={styles.emptyCell} />}
        </View>

        {/* Release Date Row */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Release Date</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonCell}>
              <Text style={styles.comparisonCellText}>
                {tool.releaseDate ? new Date(tool.releaseDate).toLocaleDateString() : 'N/A'}
              </Text>
            </View>
          ))}
          {selectedTools.length < 4 && <View style={styles.emptyCell} />}
        </View>

        {/* Security Row */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Security</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonCell}>
              {(tool.security || []).map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color="#4a6cf7" />
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
              {(!tool.security || tool.security.length === 0) && (
                <Text style={styles.noDataText}>No data available</Text>
              )}
            </View>
          ))}
          {selectedTools.length < 4 && <View style={styles.emptyCell} />}
        </View>

        {/* Ease of Use Row */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonLabelCell}>
            <Text style={styles.comparisonLabelText}>Ease of Use</Text>
          </View>
          {selectedTools.map(tool => (
            <View key={tool.id} style={styles.comparisonCell}>
              <Text style={styles.comparisonCellText}>{tool.easeOfUse ? `${tool.easeOfUse}/10` : 'N/A'}</Text>
            </View>
          ))}
          {selectedTools.length < 4 && <View style={styles.emptyCell} />}
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Compare Tools</Text>
        <Text style={styles.subtitle}>Compare features, pricing, and capabilities</Text>
      </View>
      
      {showToolSelector ? renderToolSelector() : renderComparisonTable()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
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
  emptyCompareContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCompareText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  addToolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a6cf7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToolButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  toolSelectorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toolSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  toolSelectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  toolSelectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  toolSelectLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  toolSelectInfo: {
    flex: 1,
  },
  toolSelectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  toolSelectCategory: {
    fontSize: 14,
    color: '#64748b',
  },
  emptyListContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#64748b',
  },
  comparisonContainer: {
    flex: 1,
    padding: 20,
  },
  comparisonRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  featuresRow: {
    minHeight: 120,
  },
  comparisonLabelCell: {
    width: 100,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },
  comparisonLabelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  comparisonHeaderCell: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  comparisonToolLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 8,
  },
  comparisonToolName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  removeToolButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
  },
  comparisonCell: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  comparisonCellText: {
    fontSize: 14,
    color: '#1e293b',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginLeft: 4,
  },
  pricingDetails: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 8,
    flex: 1,
  },
  addMoreCell: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  addMoreText: {
    fontSize: 14,
    color: '#4a6cf7',
    marginTop: 8,
  },
  emptyCell: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  noDataText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
});