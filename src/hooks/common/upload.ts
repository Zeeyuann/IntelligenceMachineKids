import type { UploadCustomRequestOptions } from 'naive-ui';
import { upLoadFile } from '@/service/api';
export function useUpload() {
  const list = ref<string[]>([]);

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

  const handleRemove = () => {
    list.value = [];
  };
  return {
    list,
    customUpload,
    handleRemove
  };
}
