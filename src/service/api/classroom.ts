import { request } from '../request';

export function fetchGrades(data: any = {}) {
  return request<any>({
    url: 'aiweb/evaluate/grades',
    method: 'post',
    data
  });
}

export function fetchSubjects(grade_id: number) {
  return request<any>({
    url: 'aiweb/evaluate/subjects',
    method: 'post',
    data: { grade_id }
  });
}

export function fetchPress(grade_id: number, subject_id: number) {
  return request<any>({
    url: 'aiweb/evaluate/press',
    method: 'post',
    data: { grade_id, subject_id }
  });
}

export function fetchBooks(data: any) {
  return request<any>({
    url: 'aiweb/evaluate/books',
    method: 'post',
    data
  });
}

export function fetchQuestions(data: any) {
  return request<any>({
    url: 'aiweb/evaluate/questions',
    method: 'post',
    data
  });
}

export function fetchUserevaluate(data: any = {}) {
  return request<any>({
    url: 'aiweb/evaluate/userevaluate',
    method: 'post',
    data
  });
}

export function fetchReport(data: any = {}) {
  return request<any>({
    url: 'aiweb/evaluate/getevaluatereport',
    method: 'post',
    data
  });
}
