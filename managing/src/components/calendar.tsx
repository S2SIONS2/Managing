'use client';

import { useScheduleStore } from "@/app/store/scheduleStore";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

export default function CalendarComponent() {
    const { schedules } = useScheduleStore()

    const selectedDays = schedules.map((s) => new Date(s.date))
    return (
        <div>
            <DayPicker
                selected={selectedDays}
                modifiersClassNames={{
                selected: 'bg-green-300 text-white rounded-full',
                }}
                showOutsideDays
            />
        </div>
    )
}