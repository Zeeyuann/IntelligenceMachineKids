import { request } from '../request';

export function subjectList(data: any = {}) {
  return request<any>({
    url: 'aiweb/subject/list',
    method: 'post',
    data
  });
}

export function subjectDetail(subjectid: string) {
  return request<any>({
    url: 'aiweb/subject/subject',
    method: 'post',
    data: { subjectid }
  });
}

export function subjectVerify(subjectid: string) {
  return request<any>({
    url: 'aiweb/subject/verify',
    method: 'post',
    data: { subjectid }
  });
}

export function subjectHit(subjectid: string, courseid: string) {
  return request<any>({
    url: 'aiweb/subject/hit',
    method: 'post',
    data: { subjectid, courseid }
  });
}
