import { list, book } from '@/server/meetingRoom'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useRoomsStore = defineStore('meetingRoom', () => {
  const rooms = ref()

  async function getList(
    statusSearch: string,
    capacity: string,

    equipment: string
  ) {
    const res = await list(statusSearch, capacity, equipment)

    rooms.value = res.data.meetingRooms
  }
  async function bookRoom(data: Record<string, any>) {
    await book(data)
  }

  return { getList, rooms, bookRoom }
})

export default useRoomsStore
