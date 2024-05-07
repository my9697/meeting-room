<template>
  <div h-204>
    <a-space direction="vertical" relative flex flex-auto flex-row text-lg>
      <div relative mb-20 mt-11 flex flex-auto flex-row text-lg>
        <div mr-12 flex items-center justify-center>
          <div w-40 content-center>预定状态</div>
          <a-input v-model:value="statusSearch" />
        </div>

        <div mr-12 flex items-center justify-center>
          <div w-35 content-center>容纳人数</div>
          <a-input v-model:value="capacity" />
        </div>
        <div mr-12 flex items-center justify-center>
          <div w-20 content-center>位置</div>
          <a-input v-model:value="location" />
        </div>
        <div flex items-center justify-center>
          <div w-20 content-center>设备</div>
          <a-input v-model:value="equipment" />
        </div>
      </div>

      <a-button
        type="primary"
        absolute
        right-0
        mt-9.6
        h-10
        w-25
        content-center
        text-lg
        @click="search"
        >搜索</a-button
      >
      <context-holder />
    </a-space>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a @click="Click(record)">预定</a>
        </template>
      </template>
    </a-table>
    <div>
      <a-modal v-model:open="open" title="预定信息" @ok="handleOk" destroyOnClose="true">
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 60 }" :model="formState">
          <a-form-item
            label="会议主题"
            name="note"
            :rules="[{ required: true, message: '请输入会议主题' }]"
          >
          <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk" />
    <a-range-picker
      :show-time="{ format: 'HH:mm' }"
      format="YYYY-MM-DD HH:mm"
      :placeholder="['Start Time', 'End Time']"
      @change="onRangeChange"
      @ok="onRangeOk"
    />
 
            <a-input allowClear v-model:value="formState.note" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import useRoomsStore from '../stores/meetingRoom'
import { ref } from 'vue'
import { Dayjs } from 'dayjs';

const onChange = (value: Dayjs, dateString: string) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOk = (value: Dayjs) => {
  console.log('onOk: ', value);
};

const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onRangeOk = (value: [Dayjs, Dayjs]) => {
  console.log('onOk: ', value);
};

message.config({
  top: '150px'
})
interface IformState {
  note: string
  startTime: string
  endTime: string
}

const formState = ref<IformState>({
  note: '',
  startTime: '',
  endTime: ''
})

const roomStore = useRoomsStore()
const statusSearch = ref()
const capacity = ref()
const location = ref()
const equipment = ref()

const columns = [
  {
    title: '会议室名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '容纳人数',
    dataIndex: 'capacity',
    key: 'capacity'
  },
  {
    title: '设备',
    dataIndex: 'equipment',
    key: 'equipment'
  },
  {
    title: '位置',
    key: 'location',
    dataIndex: 'location'
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime'
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime'
  },
  {
    title: '预定状态',
    key: 'satatus',
    dataIndex: 'status'
  },

  {
    title: '预定',
    key: 'operation',
    dataIndex: 'operation'
  }
]
const data = ref([])
const open = ref<boolean>(false)
const currenRecord = ref<Record<string, any>>()

function Click(record: any) {
  open.value = true
  currenRecord.value = record
}
const handleOk = () => {
  open.value = false
}
async function fetchData() {
  await roomStore.getList(statusSearch.value, capacity.value, equipment.value)
  roomStore.rooms.map((item: Record<string, any>) => {
    if (item.isBooked) {
      item.status = '不可预定'
    } else {
      item.status = '可预定'
    }
  })
  data.value = roomStore.rooms
}
fetchData()

async function search() {
  fetchData()
}
</script>
