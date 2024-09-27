import { request } from '../request';

export function startDraw(data: any) {
  return request<any>({
    url: 'aiweb/superai/draw',
    method: 'post',
    data
  });
}

export function drawConfig() {
  return request<any>({
    url: 'aiweb/superai/config',
    method: 'post'
  });
}

export function drawTaskSearch(task_id: any) {
  return request<any>({
    url: 'aiweb/superai/drawtask',
    method: 'post',
    data: { task_id }
  });
}

export function fetchDrawInfo(task_id: any) {
  return request<any>({
    url: 'aiweb/superai/taskinfo',
    method: 'post',
    data: { task_id }
  });
}

export function fetchDrawList(data: any) {
  return request<any>({
    url: 'aiweb/airecord/getdrawrecordlist',
    method: 'post',
    data
  });
}

export function deleteDrawItem(data: any) {
  return request<any>({
    url: 'aiweb/airecord/drawrecorddel',
    method: 'post',
    data
  });
}

export function upLoadFile(data: any) {
  return request<any>({
    url: 'openness/upimgs',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    method: 'post'
  });
}
