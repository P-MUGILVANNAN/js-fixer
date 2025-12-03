export interface FixResult {
  correctedCode: string;
  explanation: string;
}

export enum FixStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}