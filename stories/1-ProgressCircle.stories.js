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

const refreshRateOptions = {
   range: true,
   min: 5,
   max: 50,
   step: 5,
}

const sizeOptions = {
  Small: 'small',
  Medium: '',
  Large: 'big',
  Micro: 'micro',
  None: 'small',
}

const colorOptions = {
  Blue: '',
  DarkMode: 'dark',
  Green: 'green',
  GreenDarkmode: 'green dark',
  Orange: 'orange',
  OrangeDark: 'orange dark',
}

export const KitchenSink = () => ({
  components: { PercentageCircle },
  props: {
    percent: {
      default: number('Percent', 50, percentOptions)
    },
    size: {
      default: select('Size', sizeOptions, 'small')
    },
    activeColor: {
      default: select('Active Color', colorOptions, '')
    },
    completeColor: {
      default: select('Complete Color', colorOptions, '')
    }
  },
  template: '<PercentageCircle @click="recountUp" :percent="percent" :size="size" :active-color="activeColor" :complete-color="completeColor"></PercentageCircle>',
});


export const Animated = () => ({
  components: { PercentageCircle },
  props: {
    percent: {
      default: number('Percent', 50, percentOptions)
    },
    refreshRate: {
      default: number('Refresh Rate (milliseconds) ', 5, refreshRateOptions)
    },
    size: {
      default: select('Size', sizeOptions, 'small')
    },
    activeColor: {
      default: select('Active Color', colorOptions, '')
    },
    completeColor: {
      default: select('Complete Color', colorOptions, '')
    }
  },
  template: `
    <PercentageCircle
      @click="recountUp"
      :animate="true"
      :percent="percent"
      :size="size"
      :active-color="activeColor"
      :refresh-rate="refreshRate"
      :complete-color="completeColor">
    </PercentageCircle>`,
  data() {
    return {
      percent: 100,
      timeout: null
    }
  },
  methods: {
    recountUp() {
      clearTimeout(this.timeout)
      this.percent = 0
      this.$nextTick(() => this.countUp())
    },
    countUp() {
      this.percent = 100
      this.timeout = setTimeout(() => this.percent = 0, 2000)
    }
  }
});