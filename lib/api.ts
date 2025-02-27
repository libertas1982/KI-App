import supabase from './supabase';

// Tool related functions
export const fetchTools = async (options: any = {}) => {
  const { category, pricing, features, sortBy, limit = 20, page = 0 } = options;
  
  let query = supabase.from('tools').select('*');
  
  // Apply filters
  if (category && category !== 'All') {
    query = query.eq('category', category);
  }
  
  if (pricing) {
    query = query.eq('pricing_model', pricing);
  }
  
  if (features && features.length > 0) {
    query = query.contains('features', features);
  }
  
  // Apply sorting
  if (sortBy === 'rating') {
    query = query.order('rating', { ascending: false });
  } else if (sortBy === 'newest') {
    query = query.order('release_date', { ascending: false });
  } else if (sortBy === 'popularity') {
    query = query.order('popularity', { ascending: false });
  } else {
    // Default sort by relevance (id for now)
    query = query.order('id', { ascending: true });
  }
  
  // Apply pagination
  query = query.range(page * limit, (page + 1) * limit - 1);
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
  
  return data || [];
};

export const fetchToolById = async (id: string | number) => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching tool by ID:', error);
    return null;
  }
  
  return data;
};

export const fetchFeaturedTools = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('featured', true)
    .limit(5);
  
  if (error) {
    console.error('Error fetching featured tools:', error);
    return [];
  }
  
  return data || [];
};

export const fetchTrendingTools = async (limit = 10) => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('popularity', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching trending tools:', error);
    return [];
  }
  
  return data || [];
};

export const fetchNewTools = async (limit = 10) => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('release_date', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching new tools:', error);
    return [];
  }
  
  return data || [];
};

export const fetchTopRatedTools = async (limit = 10) => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('rating', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching top rated tools:', error);
    return [];
  }
  
  return data || [];
};

export const searchTools = async (query: string, options: any = {}) => {
  if (!query.trim()) return [];
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
  
  if (error) {
    console.error('Error searching tools:', error);
    return [];
  }
  
  return data || [];
};

export const fetchSimilarTools = async (toolId: string | number, category: string, limit = 5) => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category', category)
    .neq('id', toolId)
    .limit(limit);
  
  if (error) {
    console.error('Error fetching similar tools:', error);
    return [];
  }
  
  return data || [];
};

// User related functions
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data;
};

// Saved tools functions
export const fetchSavedTools = async (userId: string) => {
  const { data, error } = await supabase
    .from('saved_tools')
    .select(`
      id,
      tool_id,
      tools:tool_id (*)
    `)
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching saved tools:', error);
    return [];
  }
  
  return data.map((item: any) => ({
    id: item.id,
    ...item.tools
  })) || [];
};

export const saveTool = async (userId: string, toolId: number) => {
  const { data, error } = await supabase
    .from('saved_tools')
    .insert([
      { user_id: userId, tool_id: toolId }
    ])
    .select();
  
  if (error) {
    console.error('Error saving tool:', error);
    throw error;
  }
  
  // Update the saved_tools_count in the user's profile
  await updateSavedToolsCount(userId);
  
  return data;
};

export const unsaveTool = async (userId: string, toolId: number) => {
  const { data, error } = await supabase
    .from('saved_tools')
    .delete()
    .eq('user_id', userId)
    .eq('tool_id', toolId);
  
  if (error) {
    console.error('Error unsaving tool:', error);
    throw error;
  }
  
  // Update the saved_tools_count in the user's profile
  await updateSavedToolsCount(userId);
  
  return data;
};

export const isToolSaved = async (userId: string, toolId: number) => {
  const { data, error } = await supabase
    .from('saved_tools')
    .select('id')
    .eq('user_id', userId)
    .eq('tool_id', toolId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
    console.error('Error checking if tool is saved:', error);
    return false;
  }
  
  return !!data;
};

const updateSavedToolsCount = async (userId: string) => {
  // Get the count of saved tools
  const { count, error: countError } = await supabase
    .from('saved_tools')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  
  if (countError) {
    console.error('Error counting saved tools:', countError);
    return;
  }
  
  // Update the profile with the new count
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ saved_tools_count: count || 0 })
    .eq('id', userId);
  
  if (updateError) {
    console.error('Error updating saved tools count:', updateError);
  }
};

// Reviews functions
export const fetchReviews = async (toolId: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (full_name, avatar_url)
    `)
    .eq('tool_id', toolId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  
  return data || [];
};

export const createReview = async (userId: string, toolId: number, rating: number, comment: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      { 
        user_id: userId, 
        tool_id: toolId,
        rating,
        comment
      }
    ])
    .select();
  
  if (error) {
    console.error('Error creating review:', error);
    throw error;
  }
  
  // Update the reviews_count in the user's profile
  await updateReviewsCount(userId);
  
  // Update the tool's average rating and review count
  await updateToolRating(toolId);
  
  return data;
};

const updateReviewsCount = async (userId: string) => {
  // Get the count of reviews
  const { count, error: countError } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  
  if (countError) {
    console.error('Error counting reviews:', countError);
    return;
  }
  
  // Update the profile with the new count
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ reviews_count: count || 0 })
    .eq('id', userId);
  
  if (updateError) {
    console.error('Error updating reviews count:', updateError);
  }
};

const updateToolRating = async (toolId: number) => {
  // Get all reviews for the tool
  const { data, error: reviewsError } = await supabase
    .from('reviews')
    .select('rating')
    .eq('tool_id', toolId);
  
  if (reviewsError) {
    console.error('Error fetching reviews for rating update:', reviewsError);
    return;
  }
  
  // Calculate the average rating
  const totalRating = data?.reduce((sum, review) => sum + review.rating, 0) || 0;
  const averageRating = data && data.length > 0 ? totalRating / data.length : 0;
  
  // Update the tool with the new rating and review count
  const { error: updateError } = await supabase
    .from('tools')
    .update({ 
      rating: averageRating,
      review_count: data?.length || 0
    })
    .eq('id', toolId);
  
  if (updateError) {
    console.error('Error updating tool rating:', updateError);
  }
};

// Notifications functions
export const fetchNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
  
  return data || [];
};

export const markNotificationAsRead = async (notificationId: number) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .select();
  
  if (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
  
  return data;
};

export const deleteNotification = async (notificationId: number) => {
  const { data, error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);
  
  if (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
  
  return data;
};

export const clearAllNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .delete()
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error clearing notifications:', error);
    throw error;
  }
  
  return data;
};

// Categories, pricing models, and features
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('category')
    .order('category')
    .not('category', 'is', null);
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  // Extract unique categories
  const categories = [...new Set(data.map(item => item.category))];
  
  return categories.map((name, index) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name
  }));
};

export const fetchPricingModels = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('pricing_model')
    .order('pricing_model')
    .not('pricing_model', 'is', null);
  
  if (error) {
    console.error('Error fetching pricing models:', error);
    return [];
  }
  
  // Extract unique pricing models
  return [...new Set(data.map(item => item.pricing_model))];
};

export const fetchFeatures = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('features');
  
  if (error) {
    console.error('Error fetching features:', error);
    return [];
  }
  
  // Extract unique features from all tools
  const allFeatures = data.flatMap(item => item.features || []);
  return [...new Set(allFeatures)];
};