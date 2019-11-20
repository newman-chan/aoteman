"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var signKey = "q1VW2pCL3NqaR4tFt3EFdxlRG8yjqg1";
var debug = false;
var test = true;
var host = test ? "http://api-atm.dev.kcbigdata.cn/" : "https://kapai.jtdm.com.cn/";
var imghost = test ? "http://api-atm.dev.kcbigdata.cn/" : "http://wximg.jtdm.ltd/";
var bgSound = "https://umh-2019.oss-cn-shenzhen.aliyuncs.com/bgm.mp3";

function log(v) {
  if (debug) {
    console.log(v);
  }
}
exports.default = {
  signKey: signKey,
  host: host,
  imghost: imghost,
  debug: debug,
  test: test,
  log: log,
  bgSound: bgSound
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJzaWduS2V5IiwiZGVidWciLCJ0ZXN0IiwiaG9zdCIsImltZ2hvc3QiLCJiZ1NvdW5kIiwibG9nIiwidiIsImNvbnNvbGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsVUFBVSxpQ0FBaEI7QUFDQSxJQUFNQyxRQUFRLEtBQWQ7QUFDQSxJQUFNQyxPQUFPLEtBQWI7QUFDQSxJQUFNQyxPQUFPRCxPQUFPLHlCQUFQLEdBQW1DLDRCQUFoRDtBQUNBLElBQU1FLFVBQVVGLE9BQU8seUJBQVAsR0FBbUMsd0JBQW5EO0FBQ0EsSUFBTUcsVUFBVSx1REFBaEI7O0FBRUEsU0FBU0MsR0FBVCxDQUFhQyxDQUFiLEVBQWU7QUFDWCxNQUFHTixLQUFILEVBQVM7QUFDUE8sWUFBUUYsR0FBUixDQUFZQyxDQUFaO0FBQ0Q7QUFDSjtrQkFDYztBQUNiUCxrQkFEYTtBQUViRyxZQUZhO0FBR2JDLGtCQUhhO0FBSWJILGNBSmE7QUFLYkMsWUFMYTtBQU1iSSxVQU5hO0FBT2JEO0FBUGEsQyIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzaWduS2V5ID0gXCJxMVZXMnBDTDNOcWFSNHRGdDNFRmR4bFJHOHlqcWcxXCJcclxuY29uc3QgZGVidWcgPSBmYWxzZVxyXG5jb25zdCB0ZXN0ID0gZmFsc2VcclxuY29uc3QgaG9zdCA9IHRlc3QgPyBcImh0dHBzOi8vMTIwLjc5LjE2Mi4xMTcvXCIgOiBcImh0dHBzOi8va2FwYWkuanRkbS5jb20uY24vXCJcclxuY29uc3QgaW1naG9zdCA9IHRlc3QgPyBcImh0dHBzOi8vMTIwLjc5LjE2Mi4xMTcvXCIgOiBcImh0dHA6Ly93eGltZy5qdGRtLmx0ZC9cIlxyXG5jb25zdCBiZ1NvdW5kID0gXCJodHRwczovL3VtaC0yMDE5Lm9zcy1jbi1zaGVuemhlbi5hbGl5dW5jcy5jb20vYmdtLm1wM1wiXHJcblxyXG5mdW5jdGlvbiBsb2codil7XHJcbiAgICBpZihkZWJ1Zyl7XHJcbiAgICAgIGNvbnNvbGUubG9nKHYpXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNpZ25LZXksXHJcbiAgaG9zdCxcclxuICBpbWdob3N0LFxyXG4gIGRlYnVnLFxyXG4gIHRlc3QsXHJcbiAgbG9nLFxyXG4gIGJnU291bmRcclxufTsiXX0=