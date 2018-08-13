export function formatDate(date,format) {
  if(new RegExp("(y+)").test(format)){
    //console.log(date.getFullYear());
    //console.log(RegExp.$1);
    format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length));
    let obj={
      "M+":date.getMonth()+1,
      "d+":date.getDate(),
      "h+":date.getHours(),
      "m+":date.getMinutes(),
      "s+":date.getSeconds()//
    }
    for(var o in obj){
      if(new RegExp(`(${o})`).test(format)){
        let str=obj[o]+"";
        //format=format.replace(RegExp.$1,RegExp.$1.length==1? str : padLeftZero(str));
        format=format.replace(RegExp.$1,padLeftZero(str));
      }
    }
  }
  return format;
}
function padLeftZero(str) {
  return ("00"+str).substr(str.length);
}

/**
 * 解析url参数
 * example：“？id=48522&a=b&c=85235”
 * return {
 *    id:48522,
 *    a:c,
 *    c:85235
 * }
 */
export  function urlParse() {
  var  location=window.location;
  var search=location.search;
  var obj={};
  var reg=/[?&][^?&]+=[^?&]+/g;
  if(search==""){
    var index=location.hash.indexOf("?");
    search=location.hash.substring(index);
  }
  var arr=search.match(reg);
  var newArr=[];
  arr.forEach(function (item) {
    newArr=item.substring(1).split("=");
    var key=decodeURIComponent(newArr[0]);
    var value=decodeURIComponent(newArr[1]);
    obj[key]=value;
  });
  return obj;
}
