'use client';

import { useState, useEffect } from 'react';

interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 8)); // April 2026 (challenge time)
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [dayNotes, setDayNotes] = useState<Record<string, string>>({});
  const [monthNotes, setMonthNotes] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingDate, setEditingDate] = useState<Date | null>(null);
  const [modalNote, setModalNote] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('dayNotes');
    if (savedNotes) setDayNotes(JSON.parse(savedNotes));

    const monthKey = `monthNotes-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    const savedMonthNotes = localStorage.getItem(monthKey);
    if (savedMonthNotes) setMonthNotes(savedMonthNotes);
  }, [currentDate]);

  // Save day notes
  useEffect(() => {
    localStorage.setItem('dayNotes', JSON.stringify(dayNotes));
  }, [dayNotes]);

  const saveMonthNotes = () => {
    const monthKey = `monthNotes-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    localStorage.setItem(monthKey, monthNotes);
    alert('Monthly notes saved! ✅');
  };

  // Generate calendar days
  const getDays = (): Day[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days: Day[] = [];

    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({ date, isCurrentMonth: false, isToday: false });
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      days.push({ date, isCurrentMonth: true, isToday });
    }

    // Next month padding (fixed 6 rows = 42 cells)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false, isToday: false });
    }

    return days;
  };

  const days = getDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (date: Date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      if (date < selectedStart) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
      } else {
        setSelectedEnd(date);
      }
    }
  };

  const isStart = (date: Date) => selectedStart && date.toDateString() === selectedStart.toDateString();
  const isEnd = (date: Date) => selectedEnd && date.toDateString() === selectedEnd.toDateString();
  const isInRange = (date: Date) => {
    if (!selectedStart || !selectedEnd) return false;
    return date >= selectedStart && date <= selectedEnd;
  };

  const clearSelection = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const openNoteModal = (date: Date) => {
    setEditingDate(date);
    const key = date.toISOString().split('T')[0];
    setModalNote(dayNotes[key] || '');
    setShowNoteModal(true);
  };

  const saveDayNote = () => {
    if (editingDate) {
      const key = editingDate.toISOString().split('T')[0];
      setDayNotes((prev) => ({ ...prev, [key]: modalNote }));
    }
    setShowNoteModal(false);
    setEditingDate(null);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    clearSelection();
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const yearNum = currentDate.getFullYear();

  return (
    <div className="max-w-6xl mx-auto bg-[#f8f1e3] shadow-2xl border-8 border-[#d4b88a] rounded-3xl p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#5c4033] tracking-tight">Wall Calendar</h1>
        
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="px-6 py-3 bg-white border-2 border-[#d4b88a] rounded-2xl hover:bg-amber-100 text-[#5c4033] font-medium"
          >
            ← Prev
          </button>
          <div className="text-center min-w-[200px]">
            <span className="text-3xl font-semibold text-[#5c4033]">{monthName}</span>
            <span className="text-3xl font-light text-[#8b6f47] ml-3">{yearNum}</span>
          </div>
          <button
            onClick={nextMonth}
            className="px-6 py-3 bg-white border-2 border-[#d4b88a] rounded-2xl hover:bg-amber-100 text-[#5c4033] font-medium"
          >
            Next →
          </button>
          <button
            onClick={goToToday}
            className="px-6 py-3 bg-[#5c4033] text-white rounded-2xl hover:bg-[#8b6f47]"
          >
            Today
          </button>
        </div>

        <button
          onClick={clearSelection}
          className="px-5 py-3 text-red-600 border border-red-300 rounded-2xl hover:bg-red-50 text-sm font-medium"
        >
          Clear Range
        </button>
      </div>

      {/* Hero Image */}
      <div className="mb-8 rounded-3xl overflow-hidden border-4 border-[#d4b88a] shadow-inner">
        <img
          src="https://picsum.photos/id/1015/1200/400"
          alt="Wall Calendar Hero"
          className="w-full h-64 md:h-80 object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Grid */}
        <div className="flex-1">
          {/* Weekdays */}
          <div className="grid grid-cols-7 bg-[#d4b88a] rounded-t-3xl p-1">
            {weekdays.map((day) => (
              <div key={day} className="bg-[#f8f1e3] py-4 text-center text-sm font-semibold text-[#5c4033]">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-px bg-[#d4b88a] p-1 rounded-b-3xl">
            {days.map((day, i) => {
              const key = day.date.toISOString().split('T')[0];
              const hasNote = !!dayNotes[key];
              const startDay = isStart(day.date);
              const endDay = isEnd(day.date);
              const inRangeDay = isInRange(day.date);

              let classes = `h-24 flex flex-col items-center justify-center bg-white text-[#5c4033] relative transition-all cursor-pointer hover:bg-amber-50 border border-transparent`;
              
              if (!day.isCurrentMonth) classes += ' text-gray-400 bg-[#f8f1e3]';
              if (day.isToday) classes += ' ring-2 ring-offset-2 ring-blue-400';
              if (startDay || endDay) classes += ' bg-blue-600 text-white font-bold scale-105';
              if (inRangeDay && !startDay && !endDay) classes += ' bg-blue-100';

              return (
                <div
                  key={i}
                  className={classes}
                  onClick={() => handleDateClick(day.date)}
                  onDoubleClick={() => openNoteModal(day.date)}
                >
                  <span className="text-2xl">{day.date.getDate()}</span>
                  {hasNote && <span className="absolute bottom-2 right-2 text-lg">📝</span>}
                  {startDay && <span className="absolute top-2 left-2 text-xs bg-white/30 px-2 py-0.5 rounded">START</span>}
                  {endDay && <span className="absolute top-2 right-2 text-xs bg-white/30 px-2 py-0.5 rounded">END</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes Panel */}
        <div className="lg:w-96 bg-white border-4 border-[#d4b88a] rounded-3xl p-6 flex flex-col shadow-inner">
          <h3 className="text-2xl font-semibold text-[#5c4033] mb-3">Monthly Notes</h3>
          <textarea
            value={monthNotes}
            onChange={(e) => setMonthNotes(e.target.value)}
            className="flex-1 p-5 border-2 border-[#d4b88a] rounded-2xl focus:outline-none focus:border-[#5c4033] resize-none text-sm leading-relaxed"
            placeholder="General memos for the whole month..."
          />
          <button
            onClick={saveMonthNotes}
            className="mt-6 w-full py-4 bg-[#5c4033] hover:bg-[#8b6f47] text-white font-medium rounded-2xl transition"
          >
            💾 Save Monthly Notes
          </button>

          {/* Range Info */}
          {selectedStart && selectedEnd && (
            <div className="mt-8 pt-8 border-t border-[#d4b88a]">
              <h4 className="font-semibold text-[#5c4033]">Selected Range</h4>
              <p className="text-lg text-blue-700 font-medium">
                {selectedStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
                {selectedEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-xs text-amber-700 mt-4 italic">
                Tip: Double-click any date in the grid to add specific notes to individual dates!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && editingDate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-2">
              Note for {editingDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
            </h3>
            <textarea
              value={modalNote}
              onChange={(e) => setModalNote(e.target.value)}
              className="w-full h-48 p-5 border-2 border-[#d4b88a] rounded-2xl focus:outline-none mb-6"
              placeholder="Write your personal note..."
            />
            <div className="flex gap-4">
              <button
                onClick={saveDayNote}
                className="flex-1 py-4 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700"
              >
                Save Note
              </button>
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom status */}
      <div className="text-center mt-8 text-sm text-[#8b6f47]">
        {selectedStart ? (
          <>Selected: <span className="font-medium">{selectedStart.toLocaleDateString()} {selectedEnd ? `→ ${selectedEnd.toLocaleDateString()}` : ''}</span></>
        ) : (
          'Click any two dates to select a range'
        )}
      </div>
    </div>
  );
}