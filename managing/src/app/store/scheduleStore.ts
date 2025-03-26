import { create } from 'zustand'

type ScheduleItem = {
  id: string
  title: string
  date: string // ISO 형식 (예: "2025-03-26")
  type: 'todo' | 'vacation'
}

type ScheduleStore = {
  schedules: ScheduleItem[]
  fetchSchedules: () => Promise<void>
  addSchedule: (item: ScheduleItem) => void
  removeSchedule: (id: string) => void
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],
  fetchSchedules: async () => {
    // 여기에 API 호출 로직
    const res = await fetch('/api/schedule') // 예시
    const data = await res.json()
    set({ schedules: data })
  },
  addSchedule: (item) =>
    set((state) => ({
      schedules: [...state.schedules, item],
    })),
  removeSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((s) => s.id !== id),
    })),
}))
