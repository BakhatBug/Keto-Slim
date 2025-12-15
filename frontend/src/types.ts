export interface FormData {
  Gender: string;
  BodyFat: string | number;
  BMI: string | number;
  Calorie: string | number;
  WaterCups: string | number;
  WeightLoss: string | number;
  DaysToResults: string | number;
  [key: string]: any;
}
