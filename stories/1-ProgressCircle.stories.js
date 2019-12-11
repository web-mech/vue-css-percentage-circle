import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, number, select } from '@storybook/addon-knobs'

import PercentageCircle from '../src/PercentageCircle';

export default {
  title: 'ProgressCircle',
  decorators: [withKnobs]
};

const percentOptions = {
   range: true,
   min: 0,
   max: 100,
   step: 1,
}


const sizeOptions = {
  Small: 'small',
  Medium: '',
  Large: 'big',
  Micro: 'micro',
  None: 'small',
};

export const KitchenSink = () => ({
  components: { PercentageCircle },
  props: {
    percent: {
      default: number('Percent', 50, percentOptions)
    },
    size: {
      default: select('Size', sizeOptions, 'small')
    }
  },
  template: '<PercentageCircle :percent="percent" :size="size"></PercentageCircle>',
});