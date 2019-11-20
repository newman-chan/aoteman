const signKey = "q1VW2pCL3NqaR4tFt3EFdxlRG8yjqg1"
const debug = false
const test = false
const host = test ? "https://120.79.162.117/" : "https://kapai.jtdm.com.cn/"
const imghost = test ? "https://120.79.162.117/" : "http://wximg.jtdm.ltd/"
const bgSound = "https://umh-2019.oss-cn-shenzhen.aliyuncs.com/bgm.mp3"

function log(v){
    if(debug){
      console.log(v)
    }
}
export default {
  signKey,
  host,
  imghost,
  debug,
  test,
  log,
  bgSound
};