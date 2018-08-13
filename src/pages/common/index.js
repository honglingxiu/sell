import cartControl from './cartcontrol';
import space from './space';
import star from './star';
import ratingSelect from './ratingselect';

const install = function(Vue, config = {}) {
  if (install.installed) return;
  Vue.component(star.name, star); //注册组件
  Vue.component(cartControl.name, cartControl);
  Vue.component(ratingSelect.name, ratingSelect);
  Vue.component(space.name, space);
};
export  default {
  install
}
