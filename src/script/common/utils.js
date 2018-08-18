// 公共方法
 function sleep(time){
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,time);
	});
}

function showmsg(msg){
	console.log('公共方法'+msg);
}

export var str = 'hello world';

export { sleep , showmsg };