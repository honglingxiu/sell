let selectFoods=[];
try {
  if(localStorage.selectFoods){
    selectFoods=JSON.parse(localStorage.selectFoods);
  }else {
    selectFoods=[];
  }
}catch (e) {

}
const state = {
  selectFoods:selectFoods
};

const getters = {
  selectFoods:state=>state.selectFoods
};


const actions = {
  changeCart({commit},food){
    commit("changeCart",food);
  }
};

const mutations = {
  changeCart(state,food){
    if (state.selectFoods.length>0){
      var flag=true;
      for(var i=0;i<state.selectFoods.length;i++){
        if(food.name===state.selectFoods[i].name){
            flag=false;
            if(food.num==0){
              state.selectFoods.splice(i,1);
            }else{
              state.selectFoods[i].num=food.num;
            }
            break;
        }
      }
      if(flag){//新添加的food
        state.selectFoods.push(food);
      }
    } else {//第一次初始化selectFoods
      state.selectFoods.push(food);
    }
    localStorage.setItem("selectFoods",JSON.stringify(state.selectFoods));
  }
};
export default {
  state,
  getters,
  mutations,
  actions
}
