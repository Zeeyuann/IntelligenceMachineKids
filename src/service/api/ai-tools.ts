import { jzcRequest, request } from '../request';

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

export function aiSysList(data: any = {}) {
  return request<any>({
    url: 'openness/aisyslist',
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

export function getEvaluateGrade(data: any = {}) {
  return jzcRequest<any>({
    url: 'evaluate/grade',
    method: 'get',
    data,
    headers: {
      hideErr: true
    },
    proxy: false
  });
}

export function getEvaluateSubject(gid: any = {}) {
  return jzcRequest<any>({
    url: `evaluate/subject/${gid}`,
    method: 'get'
  });
}

export function getEvaluatePress(gid: any = {}, sid: any = {}) {
  return jzcRequest<any>({
    url: `evaluate/press/${gid}/${sid}`,
    method: 'get'
  });
}

export function getEvaluateBooks(data: any = {}) {
  return jzcRequest<any>({
    url: `evaluate/books`,
    method: 'post',
    data
  });
}

export function getEvaluateQuestion(data: any = {}) {
  return jzcRequest<any>({
    url: `evaluate/question`,
    method: 'post',
    data
  });
}

export function getEvaluate(data: any = {}) {
  return jzcRequest<any>({
    url: `evaluate/evaluate`,
    method: 'post',
    data
  });
}

export function getReport(id: any = {}) {
  return jzcRequest<any>({
    url: `evaluate/report/${id}`,
    method: 'get'
  });
}

export function getChatrecordsList(data: any = {}) {
  return request<any>({
    url: 'aiweb/airecord/getchatrecordslist',
    method: 'post',
    data
  });
}

export function getTaskList(params: any = {}) {
  return request<any>({
    url: 'wxx/learn/getUserTask',
    method: 'get',
    params
  });
}

export function getTaskQuestion(data: any = {}) {
  return request<any>({
    url: 'wxx/learn/task_questions',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function getTaskAnswer(data: any = {}) {
  return request<any>({
    url: 'wxx/learn/task_submit',
    method: 'post',
    data
  });
}

export function getExerciseReport(Authorization?: string, params: any = {}) {
  if (Authorization) {
    console.log('🚀 ~ getExerciseReport ~ Authorization:', Authorization);
    return request<any>({
      url: 'wxx/learn/getTaskReport',
      method: 'get',
      headers: {
        Authorization
      },
      params
    });
  }
  return request<any>({
    url: 'wxx/learn/getTaskReport',
    method: 'get',
    params
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

export function ocraiSolve(data: any) {
  return request<any>({
    url: 'ocrai/solve',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    method: 'post'
  });
}

export function questionDetail(params: any) {
  return request<any>({
    url: 'learn/wrongbook/questionDetail',
    params,
    method: 'post'
  });
}

export function fetchQuestion(params: any) {
  return request<any>({
    url: 'wxx/learn/getQuestionById',
    params,
    method: 'get'
  });
}

export function videoList(params: any) {
  return request<any>({
    url: 'learn/video/knowledge',
    params,
    method: 'get'
  });
}

export function fetchVideo(id: any) {
  return request<any>({
    url: `learn/video/path/${id}`,
    method: 'get'
  });
}
