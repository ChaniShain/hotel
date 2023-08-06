

import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';
import 'moment/locale/he';

interface CellProps {
    handleDatesDone: ({ startDate, endDate }: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => void;
  }
  
export const Cell: React.FC<CellProps> = ( { handleDatesDone }) => {
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [focusedInput, setFocusedInput] = useState<'startDate' | 'endDate' | null>(null);
        
    const isDateBlocked = (date: moment.Moment): boolean => {
        return date.isBefore(moment(), 'day');
    };

    const handleDatesChange = ({ startDate, endDate }: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        if (endDate != null) {
            console.log(startDate?.format('YYYY-MM-DD'));
            console.log(endDate.format('YYYY-MM-DD'));
        }setFocusedInput(null); 
        
        handleDatesDone({ startDate, endDate });
    };

    const handleFocusChange = (focusedInput: 'startDate' | 'endDate' | null) => {
        setFocusedInput(focusedInput);
    };

    const hebrewWeekdays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

    moment.updateLocale('he', {
        weekdaysMin: hebrewWeekdays,
        months: [
            'ינואר',
            'פברואר',
            'מרץ',
            'אפריל',
            'מאי',
            'יוני',
            'יולי',
            'אוגוסט',
            'ספטמבר',
            'אוקטובר',
            'נובמבר',
            'דצמבר',
        ],
    });

    return (
        <DateRangePicker 
        
            startDate={startDate}
            startDateId="start_date"
            endDate={endDate}
            endDateId="end_date"
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={handleFocusChange}
            isRTL={true}
            startDatePlaceholderText="תאריך הגעה"
            endDatePlaceholderText="תאריך עזיבה"
            displayFormat="DD/MM/YYYY"
            numberOfMonths={2}
            isOutsideRange={isDateBlocked}
            hideKeyboardShortcutsPanel={true}
            showClearDates={true}
            reopenPickerOnClearDates={true}
            minimumNights={0}
            keepOpenOnDateSelect={true}
            daySize={40}
            phrases={{
                closeDatePicker: 'סגירה',
                clearDates: 'ניקוי תאריכים',
                calendarLabel: 'לוח שנה',
                jumpToPrevMonth: 'המוקדם יותר',
                jumpToNextMonth: 'הבא יותר',
                keyboardShortcuts: 'קיצורי מקלדת',
                showKeyboardShortcutsPanel: 'הצגת פאנל קיצורי מקלדת',
                hideKeyboardShortcutsPanel: 'הסתרת פאנל קיצורי מקלדת',
                openThisPanel: 'פתיחת פאנל זה',
                enterKey: 'Enter',
                leftArrowRightArrow: 'ArrowLeft/ArrowRight',
                upArrowDownArrow: 'ArrowUp/ArrowDown',
                pageUpPageDown: 'PageUp/PageDown',
                homeEnd: 'Home/ End',
                escape: 'Escape',
                questionMark: '?',
                selectFocusedDate: 'בחירת תאריך זה',
                moveFocusByOneDay: 'העברת המוקד ליום אחר',
                moveFocusByOneWeek: 'העברת המוקד לשבוע אחר',
                moveFocusByOneMonth: 'העברת המוקד לחודש אחר',
                moveFocustoStartAndEndOfWeek: 'העברת המוקד לתחילת וסוף השבוע',
                returnFocusToInput: 'חזרת המוקד לתיבת הטקסט',
                
            }}
        />
    );
};
