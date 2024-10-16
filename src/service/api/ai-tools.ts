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

export function getAgentLists(data: any = {}) {
  return request<any>({
    url: 'openness/getagentlists',
    method: 'post',
    data
  });
}

export function evaluateReport(evaluateId: string | number) {
  return request<any>({
    url: 'aiweb/evaluate/report',
    method: 'post',
    data: { evaluateId }
  });
}
export function fetchAgentSysuser(data: any = {}) {
  return request<any>({
    url: 'aiweb/airecord/getsysuser',
    method: 'post',
    data
  });
}
export function aiSysUser(data: any = {}) {
  return request<any>({
    url: 'aiweb/chatai/sysuser',
    method: 'post',
    data
  });
}
export function conversation(data: any = {}) {
  return request<any>({
    url: 'aiweb/chatai/conversation',
    method: 'post',
    data
  });
}

export function fetchTtsId(context: string) {
  return request<any>({
    url: '/tts',
    method: 'post',
    data: { context }
  });
}

export function fetchAudio(fileid: string) {
  return request<any>({
    url: '/downmp3',
    method: 'get',
    params: { fileid }
  });
}

export function getConversationList(data: any = {}) {
  return request<any>({
    url: 'aiweb/airecord/getconversationlist',
    method: 'post',
    data
  });
}

export function getChatrecordsList(data: any = {}) {
  return request<any>({
    url: 'aiweb/airecord/getchatrecordslist',
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

export function upLoadFiles(data: any) {
  return request<any>({
    url: 'openness/upfiles',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    method: 'post'
  });
}

export function fetchArticle(data: any) {
  return request<any>({
    url: 'aiweb/chatai/article',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    method: 'post'
  });
}
