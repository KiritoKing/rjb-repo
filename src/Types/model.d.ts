interface IModelInfo {
  name: string;
  description?: string;
  id: number;
  params?: IModelParam;
}

interface IModelParam {
  epoch: number;
  batchSize: number;
  learningRate: number;
  windowSize: number;
  [key: string]: number | string;
}
