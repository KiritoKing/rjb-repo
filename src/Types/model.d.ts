interface IModelInfo {
  name: string;
  description?: string;
  id: number;
  params?: ModelParams;
}

type ModelParams = {
  name: string;
  inWindowSize: number;
  outWindowSize: number;
  [key: string]: number | string;
};

type TrainParams = {
  epoch: number;
  batchSize: number;
  learningRate: number;
} & ModelParams;
