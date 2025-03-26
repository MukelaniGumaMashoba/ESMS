import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/color';
import { TaskItem } from '@/components/TaskItem';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import { useTaskStore } from '@/store/taskStore';
import { TaskStatus, TaskPriority, TaskCategory, Task } from '@/types';
import { 
  CheckCircle, 
  Plus, 
  Filter, 
  Clock, 
  AlertCircle, 
  BookOpen 
} from 'lucide-react-native';

export default function TasksScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TaskStatus>('pending');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<{
    priority?: TaskPriority;
    category?: TaskCategory;
  }>({});
  
  const { tasks, completeTask, filterTasks } = useTaskStore();
  
  // Filter tasks based on active tab and filters
  const filteredTasks = filterTasks({
    status: activeTab,
    ...filters,
  });
  
  const handleTaskComplete = (taskId: string) => {
    completeTask(taskId);
  };
  
  const handleAddTask = () => {
    router.push('/(tabs)/explore');
  };
  
  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };
  
  const handleFilterChange = (filterType: 'priority' | 'category', value: any) => {
    setFilters(prev => {
      // If the same value is selected, remove the filter
      if (prev[filterType] === value) {
        const newFilters = { ...prev };
        delete newFilters[filterType];
        return newFilters;
      }
      
      // Otherwise, set the new filter value
      return {
        ...prev,
        [filterType]: value,
      };
    });
  };
  
  const clearFilters = () => {
    setFilters({});
  };
  
  const renderFilterButton = (
    filterType: 'priority' | 'category',
    value: any,
    label: string
  ) => {
    const isActive = filters[filterType] === value;
    
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          isActive && styles.activeFilterButton,
        ]}
        onPress={() => handleFilterChange(filterType, value)}
      >
        <Text
          style={[
            styles.filterButtonText,
            isActive && styles.activeFilterButtonText,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterToggle}
        >
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'pending' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText,
            ]}
          >
            To Do
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'in-progress' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('in-progress')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'in-progress' && styles.activeTabText,
            ]}
          >
            In Progress
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'completed' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      {filterVisible && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Priority</Text>
            <View style={styles.filterButtonsRow}>
              {renderFilterButton('priority', 'high', 'High')}
              {renderFilterButton('priority', 'medium', 'Medium')}
              {renderFilterButton('priority', 'low', 'Low')}
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.filterButtonsRow}>
              {renderFilterButton('category', 'assignment', 'Assignment')}
              {renderFilterButton('category', 'exam', 'Exam')}
              {renderFilterButton('category', 'reading', 'Reading')}
              {renderFilterButton('category', 'meeting', 'Meeting')}
              {renderFilterButton('category', 'project', 'Project')}
            </View>
          </View>
          
          {(filters.priority || filters.category) && (
            <Button
              title="Clear Filters"
              onPress={clearFilters}
              variant="ghost"
              size="small"
              style={styles.clearFiltersButton}
            />
          )}
        </View>
      )}
      
      <ScrollView
        style={styles.tasksContainer}
        contentContainerStyle={styles.tasksContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <TaskItem
              key={task.id}
              task={task}
              onPress={() => router.push(`/`)}
              onComplete={handleTaskComplete}
            />
          ))
        ) : (
          <EmptyState
            title={`No ${activeTab} tasks`}
            description={
              activeTab === 'completed'
                ? "You haven't completed any tasks yet."
                : `You don't have any ${activeTab} tasks. Add a new task to get started.`
            }
            icon={<CheckCircle size={24} color={colors.textSecondary} />}
            actionLabel={activeTab !== 'completed' ? "Add Task" : undefined}
            onAction={activeTab !== 'completed' ? handleAddTask : undefined}
            style={styles.emptyState}
          />
        )}
      </ScrollView>
      
      <View style={styles.actionsContainer}>
        <Button
          title="Add New Task"
          onPress={handleAddTask}
          variant="primary"
          leftIcon={<Plus size={16} color="white" />}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },

  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterSection: {
    marginBottom: 12,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  filterButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.borderLight,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activeFilterButtonText: {
    color: 'white',
  },
  clearFiltersButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  tasksContainer: {
    flex: 1,
  },
  tasksContent: {
    padding: 16,
  },
  emptyState: {
    marginTop: 40,
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});