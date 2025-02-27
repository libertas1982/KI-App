import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Settings, ChevronRight, LogOut, Moon, Shield, HelpCircle, Star, MessageSquare } from 'lucide-react-native';
import { useAuth } from '../../context/auth';
import supabase from '../../lib/supabase';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: signOut,
          style: 'destructive',
        },
      ]
    );
  };

  const renderSettingsItem = (icon, title, value = null, action = null, toggle = false) => (
    <TouchableOpacity 
      style={styles.settingsItem}
      onPress={action}
      disabled={toggle}
    >
      <View style={styles.settingsItemLeft}>
        {icon}
        <Text style={styles.settingsItemTitle}>{title}</Text>
      </View>
      
      <View style={styles.settingsItemRight}>
        {value && <Text style={styles.settingsItemValue}>{value}</Text>}
        {toggle ? null : <ChevronRight size={20} color="#64748b" />}
        {toggle && (
          <Switch
            value={toggle === 'darkMode' ? isDarkMode : notificationsEnabled}
            onValueChange={toggle === 'darkMode' 
              ? () => setIsDarkMode(!isDarkMode) 
              : () => setNotificationsEnabled(!notificationsEnabled)
            }
            trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
            thumbColor={
              toggle === 'darkMode' 
                ? isDarkMode ? '#4a6cf7' : '#f1f5f9'
                : notificationsEnabled ? '#4a6cf7' : '#f1f5f9'
            }
          />
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]} edges={['top']}>
        <ActivityIndicator size="large" color="#4a6cf7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileCard}>
          <Image 
            source={{ 
              uri: profile?.avatar_url || 
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' 
            }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.full_name || user?.user_metadata?.full_name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <Text style={styles.memberSince}>
              Member since {new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.saved_tools_count || 0}</Text>
            <Text style={styles.statLabel}>Saved Tools</Text>
          </View>
          <View style={[styles.statItem, styles.statItemBorder]}>
            <Text style={styles.statValue}>{profile?.reviews_count || 0}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          {renderSettingsItem(
            <Moon size={20} color="#64748b" style={styles.settingsIcon} />,
            'Dark Mode',
            null,
            null,
            'darkMode'
          )}
          
          {renderSettingsItem(
            <Bell size={20} color="#64748b" style={styles.settingsIcon} />,
            'Notifications',
            null,
            () => router.push('/notifications'),
            'notifications'
          )}
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {renderSettingsItem(
            <Shield size={20} color="#64748b" style={styles.settingsIcon} />,
            'Privacy & Security',
            null,
            () => {}
          )}
          
          {renderSettingsItem(
            <Star size={20} color="#64748b" style={styles.settingsIcon} />,
            'My Reviews',
            null,
            () => {}
          )}
          
          {renderSettingsItem(
            <MessageSquare size={20} color="#64748b" style={styles.settingsIcon} />,
            'Feedback',
            null,
            () => {}
          )}
          
          {renderSettingsItem(
            <HelpCircle size={20} color="#64748b" style={styles.settingsIcon} />,
            'Help & Support',
            null,
            () => {}
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>AI Tool Discovery v1.0.0</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#e2e8f0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  settingsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: '#1e293b',
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemValue: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 14,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 100, // Extra space for tab bar
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 14,
    color: '#4a6cf7',
    marginBottom: 8,
  },
});