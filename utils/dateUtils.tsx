export const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  export const formatTime = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  export const formatDateTime = (date: Date | string): string => {
    const d = new Date(date);
    return `${formatDate(d)} at ${formatTime(d)}`;
  };
  
  export const getDayName = (day: number): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };
  
  export const getShortDayName = (day: number): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  };
  
  export const getMonthName = (month: number): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };
  
  export const getShortMonthName = (month: number): string => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[month];
  };
  
  export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  export const getWeekDates = (date: Date): Date[] => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date);
      newDate.setDate(diff + i);
      weekDates.push(newDate);
    }
    
    return weekDates;
  };
  
  export const getMonthDates = (year: number, month: number): Date[] => {
    const daysInMonth = getDaysInMonth(year, month);
    const dates = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    
    return dates;
  };
  
  export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };
  
  export const isSameMonth = (date1: Date | string, date2: Date | string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth()
    );
  };
  
  export const isToday = (date: Date | string): boolean => {
    return isSameDay(new Date(date), new Date());
  };
  
  export const isTomorrow = (date: Date | string): boolean => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(new Date(date), tomorrow);
  };
  
  export const isYesterday = (date: Date | string): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(new Date(date), yesterday);
  };
  
  export const isThisWeek = (date: Date | string): boolean => {
    const d = new Date(date);
    const today = new Date();
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    return d >= startOfWeek && d <= endOfWeek;
  };
  
  export const isThisMonth = (date: Date | string): boolean => {
    const d = new Date(date);
    const today = new Date();
    
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth()
    );
  };
  
  export const getDurationInMinutes = (startTime: Date | string, endTime: Date | string): number => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    
    return Math.round((end - start) / (1000 * 60));
  };
  
  export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };
  
  export const getRelativeDateString = (date: Date | string): string => {
    const d = new Date(date);
    
    if (isToday(d)) {
      return 'Today';
    } else if (isTomorrow(d)) {
      return 'Tomorrow';
    } else if (isYesterday(d)) {
      return 'Yesterday';
    } else if (isThisWeek(d)) {
      return getDayName(d.getDay());
    } else if (isThisMonth(d)) {
      return `${getShortDayName(d.getDay())}, ${d.getDate()}`;
    } else {
      return formatDate(d);
    }
  };
  
  export const getTimeSlots = (startHour = 8, endHour = 22, interval = 30): string[] => {
    const slots = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const h = hour % 12 || 12;
        const m = minute.toString().padStart(2, '0');
        const ampm = hour < 12 ? 'AM' : 'PM';
        
        slots.push(`${h}:${m} ${ampm}`);
      }
    }
    
    return slots;
  };