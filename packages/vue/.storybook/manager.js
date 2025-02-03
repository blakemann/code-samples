import { addons } from '@storybook/manager-api';
import theme from '../../../build/storybook/.storybook/theme';

addons.setConfig({
  theme,
  panelPosition: 'right',
});
