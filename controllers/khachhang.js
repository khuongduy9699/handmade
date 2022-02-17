// JavaScript Document
const khachhang = require('../models/khachhangmodel.js');

module.exports.login = async function(id, mk) {
  const dskh = await khachhang.select({ tendn: id, matkhau: mk });
  if(dskh.length>0)
  return dskh[0];
  return "";
}


module.exports.insert = async function(newkhachhang) {
  createdkh = await khachhang.insert(newkhachhang);
  return createdkh;
};