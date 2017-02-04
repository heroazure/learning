/**
 * Created by Administrator on 2017/2/3.
 */
 function func1(){
    console.log('func1')
}
 let func2=function(){
    console.log('func2')
}
export let func3=function () {
    console.log('func3')
}

export {
    func1 as ffu,
    func2
}
