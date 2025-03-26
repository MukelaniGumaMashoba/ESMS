import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '@/types';
import { formatDate, formatTime, getRelativeDateString } from '@/utils/dateUtils';
import { colors } from '@/constants/color';
import { CheckCircle, Clock, AlertCircle, BookOpen, Calendar } from 'lucide-react-native';
import { useCourseStore } from '@/store/courseStore';

interface TaskItemProps {
  task: Task;
  onPress?: (task: Task) => void;
  onComplete?: (taskId: string) => void;
  showCourse?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onPress,
  onComplete,
  showCourse = true,
}) => {
  const { getCourseById } = useCourseStore();
  const course = task.course ? getCourseById(task.course) : undefined;

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return colors.danger;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const getCategoryIcon = () => {
    switch (task.category) {
      case 'assignment':
        return <BookOpen size={16} color={colors.textSecondary} />;
      case 'exam':
        return <AlertCircle size={16} color={colors.textSecondary} />;
      case 'reading':
        return <BookOpen size={16} color={colors.textSecondary} />;
      case 'meeting':
        return <Calendar size={16} color={colors.textSecondary} />;
      default:
        return <BookOpen size={16} color={colors.textSecondary} />;
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress(task);
    }
  };

  const handleComplete = (e: any) => {
    e.stopPropagation();
    if (onComplete) {
      onComplete(task.id);
    }
  };

  const isOverdue = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < now && task.status !== 'completed';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        task.status === 'completed' && styles.completedContainer,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={handleComplete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View
          style={[
            styles.checkbox,
            task.status === 'completed' && styles.checkboxChecked,
          ]}
        >
          {task.status === 'completed' && (
            <CheckCircle size={20} color={colors.primary} />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              task.status === 'completed' && styles.completedTitle,
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <View
            style={[styles.priorityIndicator, { backgroundColor: getPriorityColor() }]}
          />
        </View>

        <View style={styles.detailsContainer}>
          {showCourse && course && (
            <View style={[styles.courseTag, { backgroundColor: course.color + '20' }]}>
              <Text style={[styles.courseText, { color: course.color }]}>
                {course.name}
              </Text>
            </View>
          )}

          <View style={styles.metaContainer}>
            {getCategoryIcon()}
            <Text style={styles.categoryText}>{task.category}</Text>
          </View>

          <View style={styles.metaContainer}>
            <Clock size={16} color={isOverdue() ? colors.danger : colors.textSecondary} />
            <Text
              style={[
                styles.dateText,
                isOverdue() && styles.overdueText,
              ]}
            >
              {getRelativeDateString(task.dueDate)} {formatTime(task.dueDate)}
            </Text>
          </View>

          {task.estimatedTime && (
            <View style={styles.metaContainer}>
              <Clock size={16} color={colors.textSecondary} />
              <Text style={styles.timeText}>
                {Math.floor(task.estimatedTime / 60)}h {task.estimatedTime % 60}m
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  completedContainer: {
    opacity: 0.7,
    borderLeftColor: colors.success,
  },
  checkboxContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: colors.success,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  courseTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  courseText: {
    fontSize: 12,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  overdueText: {
    color: colors.danger,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});