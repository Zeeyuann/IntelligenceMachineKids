import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';
import { upLoadFile, upLoadFiles } from '@/service/api';
import { useFileStoreWithOut } from '@/store/modules/file';
const fileStore = useFileStoreWithOut();

export function useUpload() {
  const list = ref<UploadFileInfo[]>([]);
  const fileName = ref<any>('');

  // 图片上传
  const customUpload = async ({ file, data, onFinish, onError, onProgress }: UploadCustomRequestOptions) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key as keyof UploadCustomRequestOptions['data']]);
      });
    }
    formData.append('file', file.file as File);
    onProgress({ percent: 0 });
    const { data: fileUrl, error } = await upLoadFile(formData);
    onProgress({ percent: 100 });
    if (!error) {
      onFinish();
      list.value.push(fileUrl);
    } else {
      onError();
    }
  };
  // 文件上传
  const customUploadFile = async ({ file, data, onFinish, onError, onProgress }: UploadCustomRequestOptions) => {
    fileStore.clearUploadedFile();
    fileName.value = file.name;
    fileStore.setUploadedFile(file.file as File);
    console.log('🚀 ~ customUploadFile ~ fileStore:', fileStore);

    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key as keyof UploadCustomRequestOptions['data']]);
      });
    }
    formData.append('file', file.file as File);
    onProgress({ percent: 0 });
    const { data: fileUrl, error } = await upLoadFiles(formData);
    onProgress({ percent: 100 });
    if (!error) {
      onFinish();
      list.value.push(fileUrl);
    } else {
      onError();
    }
  };

  const handleRemove = () => {
    list.value = [];
  };
  return {
    list,
    fileName,
    customUpload,
    customUploadFile,
    handleRemove
  };
}
