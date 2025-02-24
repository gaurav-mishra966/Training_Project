export interface Alert {
  showAlert: boolean;
  alertMessage: string;
  alertType: 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info';
  alertDuration: number;
}
