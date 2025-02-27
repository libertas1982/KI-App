import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, BellOff, Clock, Star, Tag, Zap, Trash2 } from 'lucide-react-native';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New AI Tool Added',
      message: 'Claude 3 Opus has been added to our database',
      time: '2 hours ago',
      read: false,
      type: 'new_tool',
    },
    {
      id: '2',
      title: 'Price Change',
      message: 'Midjourney has updated their pricing model',
      time: '1 day ago',
      read: true,
      type: 'price_change',
    },
    {
      id: '3',
      title: 'Feature Update',
      message: 'ChatGPT has added new features to their platform',
      time: '3 days ago',
      read: true,
      type: 'feature_update',
    },
    {
      id: '4',
      title: 'New Review',
      message: 'Someone replied to your review of DALL-E',
      time: '1 week ago',
      read: true,
      type: 'review',
    },
  ]);

  const [preferences, setPreferences] = useState({
    newTools: true,
    priceChanges: true,
    featureUpdates: true,
    reviews: true,
  });

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_tool':
        return <Zap size={20} color="#4a6cf7" />;
      case 'price_change':
        return <Tag size={20} color="#f59e0b" />;
      case 'feature_update':
        return <Star size={20} color="#10b981" />;
      case 'review':
        return <Clock size={20} color="#8b5cf6" />;
      default:
        return <Bell size={20} color="#64748b" />;
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read && styles.readNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>{getNotificationIcon(item.type)}</View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Trash2 size={18} color="#64748b" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPreferenceItem = (title, key) => (
    <View style={styles.preferenceItem}>
      <Text style={styles.preferenceTitle}>{title}</Text>
      <Switch
        value={preferences[key]}
        onValueChange={(value) => setPreferences({ ...preferences, [key]: value })}
        trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
        thumbColor={preferences[key] ? '#4a6cf7' : '#f1f5f9'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        {notifications.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Unread</Text>
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <BellOff size={60} color="#cbd5e1" />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptySubtitle}>
            You don't have any notifications at the moment
          </Text>
        </View>
      )}

      <View style={styles.preferencesContainer}>
        <Text style={styles.preferencesTitle}>Notification Preferences</Text>
        {renderPreferenceItem('New Tools', 'newTools')}
        {renderPreferenceItem('Price Changes', 'priceChanges')}
        {renderPreferenceItem('Feature Updates', 'featureUpdates')}
        {renderPreferenceItem('Reviews', 'reviews')}
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
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
  },
  notificationsList: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4a6cf7',
  },
  readNotification: {
    borderLeftColor: 'transparent',
    opacity: 0.8,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  deleteButton: {
    padding: 8,
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
  },
  preferencesContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 20,
  },
  preferencesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  preferenceTitle: {
    fontSize: 16,
    color: '#1e293b',
  },
});