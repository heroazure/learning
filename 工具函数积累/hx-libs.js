/**
 * Created by heroxiao on 2016/12/6.
 */
//判断变量类型
export const is=function(type,val) {
    return Object.prototype.toString.call(val)==='[object '+type+']'
}
//深度克隆(包括数组类型)
export const deepClone=function(obj){
    let result=is('Object',obj)?{}:[]
    if(is('Object',obj)){
        Object.keys(obj).forEach(key=>{
            if(is('Object',obj[key])||is('Array',obj[key])){
                result[key]=deepClone(obj[key])
            }else {
                result[key]=obj[key]
            }
        })
    }else if(is('Array',obj)){
        obj.forEach(item=>{
            if(is('Object',item)||is('Array',item)){
                result.push(deepClone(item))
            }
            result.push(item)
        })
    }
    return result
}