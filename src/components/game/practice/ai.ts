import * as tf from '@tensorflow/tfjs';
import calsses, { ClassEl } from './classes';

let model: tf.LayersModel;

export const WIDTH = 48;
export const HEIGHT = 48;

const initTfModel = async () => {
  model = await tf.loadLayersModel('model/model.json');
};

export const getPrediction = async (image: Float32Array): Promise<ClassEl> => {
  if (!model) await initTfModel();
  return new Promise((resolve, reject) => {
    try {
      tf.tidy(() => {
        const xs = tf.tensor4d(
          image,
          [1, WIDTH, HEIGHT, 1],
        );

        const output = model.predict(xs) as tf.Tensor<tf.Rank>;

        const prediction = output.argMax(1).dataSync() as unknown as number;
        if (Number.isNaN(prediction)) throw new Error('failed to get prediction (prediction is NaN)');

        return resolve(calsses[prediction]);
      });
    } catch (err) { reject(err); }
  });
};
