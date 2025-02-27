import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, ExternalLink, Bookmark, Share2, ChartBar as BarChart2, Check, MessageSquare } from 'lucide-react-native';
import { fetchToolById, fetchSimilarTools, saveTool, unsaveTool, isToolSaved, fetchReviews, createReview } from '../lib/api';
import { useAuth } from '../context/auth';

export default function ToolDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [tool, setTool] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [similarTools, setSimilarTools] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingState, setSavingState] = useState(false);

  useEffect(() => {
    loadToolData();
  }, [id]);

  useEffect(() => {
    if (user && tool) {
      checkIfToolIsSaved();
    }
  }, [user, tool]);

  const loadToolData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const toolData = await fetchToolById(id);
      
      if (!toolData) {
        setError('Tool not found');
        return;
      }
      
      setTool(toolData);
      
      // Load similar tools and reviews
      const [similarToolsData, reviewsData] = await Promise.all([
        fetchSimilarTools(toolData.id, toolData.category),
        fetchReviews(toolData.id)
      ]);
      
      setSimilarTools(similarToolsData);
      setReviews(reviewsData);
      
    } catch (err) {
      console.error('Error loading tool data:', err);
      setError('Failed to load tool data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkIfToolIsSaved = async () => {
    try {
      const saved = await isToolSaved(user.id, parseInt(id as string));
      setIsSaved(saved);
    } catch (err) {
      console.error('Error checking if tool is saved:', err);
    }
  };

  const toggleSaved = async () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to save tools.');
      router.push('/auth/login');
      return;
    }
    
    try {
      setSavingState(true);
      
      if (isSaved) {
        await unsaveTool(user.id, parseInt(id as string));
        setIsSaved(false);
      } else {
        await saveTool(user.id, parseInt(id as string));
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error toggling saved state:', err);
      Alert.alert('Error', 'Failed to update saved status. Please try again.');
    } finally {
      setSavingState(false);
    }
  };

  const shareTool = () => {
    // In a real app, this would open the native share dialog
    Alert.alert('Share', `Sharing ${tool?.name} - Check out this AI tool!`);
  };

  const visitWebsite = () => {
    if (tool?.website) {
      Linking.openURL(tool.website);
    }
  };

  const compareWithOthers = () => {
    router.push({
      pathname: '/compare',
      params: { tools: tool.id }
    });
  };

  const submitReview = async (rating, comment) => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to leave a review.');
      router.push('/auth/login');
      return;
    }
    
    try {
      await createReview(user.id, parseInt(id as string), rating, comment);
      
      // Refresh reviews and tool data
      const [toolData, reviewsData] = await Promise.all([
        fetchToolById(id),
        fetchReviews(parseInt(id as string))
      ]);
      
      setTool(toolData);
      setReviews(reviewsData);
      
      Alert.alert('Success', 'Your review has been submitted. Thank you!');
    } catch (err) {
      console.error('Error submitting review:', err);
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    }
  };

  const renderRatingStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star}
            size={16}
            color="#FFD700"
            fill={star <= Math.round(rating) ? "#FFD700" : "transparent"}
          />
        ))}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const renderSimilarTool = ({ item }) => (
    <TouchableOpacity 
      style={styles.similarToolCard}
      onPress={() => router.push(`/tool/${item.id}`)}
    >
      <Image source={{ uri: item.logo }} style={styles.similarToolLogo} />
      <Text style={styles.similarToolName}>{item.name}</Text>
      <View style={styles.similarToolRating}>
        <Star size={12} color="#FFD700" fill="#FFD700" />
        <Text style={styles.similarToolRatingText}>{item.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]} edges={['top']}>
        <ActivityIndicator size="large" color="#4a6cf7" />
        <Text style={styles.loadingText}>Loading tool details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]} edges={['top']}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadToolData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!tool) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]} edges={['top']}>
        <Text style={styles.errorText}>Tool not found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#1e293b" />
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={toggleSaved}
                disabled={savingState}
              >
                {savingState ? (
                  <ActivityIndicator size="small" color="#4a6cf7" />
                ) : (
                  <Bookmark 
                    size={24} 
                    color={isSaved ? "#4a6cf7" : "#64748b"} 
                    fill={isSaved ? "#4a6cf7" : "transparent"} 
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={shareTool}
              >
                <Share2 size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Tool Info */}
          <View style={styles.toolInfoContainer}>
            <Image source={{ uri: tool.logo }} style={styles.toolLogo} />
            <Text style={styles.toolName}>{tool.name}</Text>
            <Text style={styles.toolCategory}>{tool.category}</Text>
            {renderRatingStars(tool.rating)}
            
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>{tool.pricing_model}</Text>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={visitWebsite}
              >
                <Text style={styles.primaryButtonText}>Visit Website</Text>
                <ExternalLink size={16} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={compareWithOthers}
              >
                <Text style={styles.secondaryButtonText}>Compare</Text>
                <BarChart2 size={16} color="#4a6cf7" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
              onPress={() => setActiveTab('overview')}
            >
              <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'features' && styles.activeTab]}
              onPress={() => setActiveTab('features')}
            >
              <Text style={[styles.tabText, activeTab === 'features' && styles.activeTabText]}>
                Features
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'pricing' && styles.activeTab]}
              onPress={() => setActiveTab('pricing')}
            >
              <Text style={[styles.tabText, activeTab === 'pricing' && styles.activeTabText]}>
                Pricing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'overview' && (
              <View>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{tool.description}</Text>
                
                <Text style={styles.sectionTitle}>Key Information</Text>
                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Release Date</Text>
                    <Text style={styles.infoValue}>
                      {tool.release_date ? new Date(tool.release_date).toLocaleDateString() : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Last Updated</Text>
                    <Text style={styles.infoValue}>
                      {tool.last_updated ? new Date(tool.last_updated).toLocaleDateString() : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Developer</Text>
                    <Text style={styles.infoValue}>{tool.developer || 'Unknown'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Ease of Use</Text>
                    <Text style={styles.infoValue}>{tool.ease_of_use ? `${tool.ease_of_use}/10` : 'N/A'}</Text>
                  </View>
                </View>
                
                {similarTools.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Similar Tools</Text>
                    <FlatList
                      data={similarTools}
                      renderItem={renderSimilarTool}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.similarToolsList}
                    />
                  </>
                )}
              </View>
            )}
            
            {activeTab === 'features' && (
              <View>
                <Text style={styles.sectionTitle}>Key Features</Text>
                {(tool.features || []).map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={18} color="#4a6cf7" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
                
                <Text style={styles.sectionTitle}>Use Cases</Text>
                {(tool.use_cases || ['Content creation', 'Productivity enhancement', 'Creative assistance']).map((useCase, index) => (
                  <View key={index} style={styles.useCaseItem}>
                    <Text style={styles.useCaseText}>• {useCase}</Text>
                  </View>
                ))}
                
                <Text style={styles.sectionTitle}>Integrations</Text>
                {(tool.integrations || ['Web browser', 'Mobile app']).map((integration, index) => (
                  <View key={index} style={styles.integrationItem}>
                    <Text style={styles.integrationText}>• {integration}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {activeTab === 'pricing' && (
              <View>
                <Text style={styles.sectionTitle}>Pricing Model</Text>
                <View style={styles.pricingModelBadge}>
                  <Text style={styles.pricingModelText}>{tool.pricing_model}</Text>
                </View>
                
                <Text style={styles.sectionTitle}>Pricing Details</Text>
                <Text style={styles.pricingDetails}>
                  {tool.pricing || 'Detailed pricing information not available. Please visit the official website for the most up-to-date pricing.'}
                </Text>
                
                <View style={styles.pricingTiers}>
                  {(tool.pricing_tiers || [
                    { name: 'Free', price: '$0', features: ['Basic features', 'Limited usage'] },
                    { name: 'Pro', price: '$19/mo', features: ['Advanced features', 'Priority support', 'No usage limits'] },
                    { name: 'Enterprise', price: 'Custom', features: ['All features', 'Dedicated support', 'Custom integration'] }
                  ]).map((tier, index) => (
                    <View key={index} style={styles.pricingTier}>
                      <Text style={styles.tierName}>{tier.name}</Text>
                      <Text style={styles.tierPrice}>{tier.price}</Text>
                      {tier.features.map((feature, featureIndex) => (
                        <View key={featureIndex} style={styles.tierFeatureItem}>
                          <Check size={14} color="#4a6cf7" />
                          <Text style={styles.tierFeatureText}>{feature}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}
            
            {activeTab === 'reviews' && (
              <View>
                <View style={styles.reviewSummary}>
                  <View style={styles.overallRating}>
                    <Text style={styles.ratingBig}>{tool.rating.toFixed(1)}</Text>
                    <View style={styles.starsContainerBig}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star}
                          size={20}
                          color="#FFD700"
                          fill={star <= Math.round(tool.rating) ? "#FFD700" : "transparent"}
                        />
                      ))}
                    </View>
                    <Text style={styles.ratingCount}>Based on {tool.review_count || 0} reviews</Text>
                  </View>
                  
                  <View style={styles.ratingBreakdown}>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <View key={rating} style={styles.ratingBar}>
                        <Text style={styles.ratingLabel}>{rating} stars</Text>
                        <View style={styles.ratingBarContainer}>
                          <View 
                            style={[
                              styles.ratingBarFill, 
                              { width: `${Math.random() * 100}%` }
                            ]} 
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.reviewsContainer}>
                  <View style={styles.reviewsHeader}>
                    <Text style={styles.sectionTitle}>User Reviews</Text>
                    <TouchableOpacity 
                      style={styles.writeReviewButton}
                      onPress={() => {
                        if (user) {
                          // Show review dialog (in a real app, this would be a modal)
                          Alert.prompt(
                            'Write a Review',
                            'Share your experience with this tool',
                            [
                              {
                                text: 'Cancel',
                                style: 'cancel',
                              },
                              {
                                text: 'Submit',
                                onPress: (comment) => {
                                  // For simplicity, we're using a fixed rating of 5
                                  // In a real app, you'd have a rating picker
                                  submitReview(5, comment);
                                },
                              },
                            ],
                            'plain-text'
                          );
                        } else {
                          Alert.alert('Sign In Required', 'Please sign in to write a review.');
                          router.push('/auth/login');
                        }
                      }}
                    >
                      <MessageSquare size={16} color="#4a6cf7" />
                      <Text style={styles.writeReviewText}>Write a Review</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <View key={review.id} style={styles.reviewItem}>
                        <View style={styles.reviewHeader}>
                          <Text style={styles.reviewUser}>
                            {review.profiles?.full_name || 'Anonymous User'}
                          </Text>
                          <Text style={styles.reviewDate}>
                            {new Date(review.created_at).toLocaleDateString()}
                          </Text>
                        </View>
                        <View style={styles.reviewRating}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star}
                              size={14}
                              color="#FFD700"
                              fill={star <= review.rating ? "#FFD700" : "transparent"}
                            />
                          ))}
                        </View>
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={styles.noReviewsContainer}>
                      <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
                    </View>
                  )}
                  
                  {reviews.length > 0 && (
                    <TouchableOpacity style={styles.loadMoreButton}>
                      <Text style={styles.loadMoreText}>Load More Reviews</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  toolInfoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  toolLogo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },
  toolName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  toolCategory: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 6,
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e0e7ff',
    borderRadius: 12,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a6cf7',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a6cf7',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a6cf7',
    marginRight: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a6cf7',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#4a6cf7',
    fontWeight: '600',
  },
  tabContent: {
    padding: 20,
    paddingBottom: 100, // Extra space for tab bar
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  infoItem: {
    width: '50%',
    paddingRight: 10,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  similarToolsList: {
    paddingRight: 20,
  },
  similarToolCard: {
    width: 100,
    alignItems: 'center',
    marginRight: 12,
  },
  similarToolLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 8,
  },
  similarToolName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  similarToolRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  similarToolRatingText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 12,
    flex: 1,
  },
  useCaseItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  useCaseText: {
    fontSize: 16,
    color: '#334155',
  },
  integrationItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  integrationText: {
    fontSize: 16,
    color: '#334155',
  },
  pricingModelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e0e7ff',
    borderRadius: 12,
    marginBottom: 16,
  },
  pricingModelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a6cf7',
  },
  pricingDetails: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
    marginBottom: 20,
  },
  pricingTiers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pricingTier: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  tierName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  tierPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4a6cf7',
    marginBottom: 12,
  },
  tierFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tierFeatureText: {
    fontSize: 14,
    color: '#334155',
    marginLeft: 8,
    flex: 1,
  },
  reviewSummary: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  overallRating: {
    alignItems: 'center',
    width: '40%',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    paddingRight: 16,
  },
  ratingBig: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1e293b',
  },
  starsContainerBig: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  ratingCount: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  ratingBreakdown: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingLabel: {
    width: 60,
    fontSize: 12,
    color: '#64748b',
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#4a6cf7',
  },
  reviewsContainer: {
    marginTop: 10,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  writeReviewText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a6cf7',
    marginLeft: 6,
  },
  reviewItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  reviewDate: {
    fontSize: 12,
    color: '#64748b',
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  noReviewsContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  loadMoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a6cf7',
  },
});