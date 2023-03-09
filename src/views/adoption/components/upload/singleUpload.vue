<template>
    <el-upload action="http://gulimall-void.oss-cn-guangzhou.aliyuncs.com" :data="dataObj" list-type="picture"
      :multiple="false" :show-file-list="showFileList" :file-list="fileList" :before-upload="beforeUpload"
      :on-remove="handleRemove" :on-success="handleUploadSuccess" :on-preview="handlePreview">
      <view style="width:60px;" v-if="dialogVisible">
        <img style="width:100%;" :src="imgUrl" alt="">
      </view>
      <el-button size="small" type="primary">点击上传</el-button>
      <div class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <!-- <el-dialog v-model="dialogVisible"> -->
    <!-- </el-dialog> -->
</template>
<script setup>
import { defineProps, ref, computed, defineEmits } from 'vue';
import { policy } from './policy'
import { getUUID } from '../../utils'

const props = defineProps({ value: { type: String } })

const emit = defineEmits(['input'])

const imageUrl = computed(() => props.value);

const imageName = computed(() => {
  if (props.value != null && props.value !== '') {
    return props.value.substr(props.value.lastIndexOf("/") + 1);
  } else {
    return null;
  }
});

const fileList = computed(() => ([{
  name: imageName.value,
  url: imageUrl.value
}]));

const showFileList = computed({
  get: function () {
    return props.value !== null && props.value !== '' && props.value !== undefined;
  },
  set: function (newValue) {
    console.log(newValue)
  }
});

const imgUrl = ref('')
const policyVal = ref('');
const signatureVal = ref('');
const keyVal = ref('');
const ossaccessKeyIdVal = ref('');
const dirVal = ref('');
const hostVal = ref('');

const dialogVisible = ref(false)

const emitInput = (val) => {
  console.log(val)
  imgUrl.value = val
  emit('input', val)
  dialogVisible.value = true;
}

const handleRemove = (file, fileList) => {
  console.log(file, fileList)
  emitInput('');
}

const handlePreview = (file) => {
  console.log(file)
}

const beforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    policy().then(response => {
      policyVal.value = response.data.policy;
      signatureVal.value = response.data.signature;
      ossaccessKeyIdVal.value = response.data.accessid;
      keyVal.value = response.data.dir + getUUID() + '_' + file.name;
      dirVal.value = response.data.dir;
      hostVal.value = response.data.host;
      resolve(true)
    }).catch(err => {
      console.log(err)
      reject(false)
    })
  })
}

const handleUploadSuccess = (res, file) => {
  console.log("上传成功...")
  console.log(res, file)
  showFileList.value = true;
  fileList.value.pop();
  fileList.value.push({ name: file.name, url: hostVal.value + '/' + keyVal.value });
  emitInput(fileList.value[0].url);
}

const dataObj = computed(() => {
  return {
    policy: policyVal.value,
    signature: signatureVal.value,
    key: keyVal.value,
    ossaccessKeyId: ossaccessKeyIdVal.value,
    dir: dirVal.value,
    host: hostVal.value,
  }
});

</script>