// JavaScript Document
const mongoose = require('mongoose');
const db = require('../controllers/database');

var userSchema = new mongoose.Schema({
  tendn: String,
matkhau: String,
hoten: String,
diachi: String,
dienthoai: String,
email:String,
role:String,
});

const userTable = mongoose.model('khachhang', userSchema);

module.exports.select = async function (query) {
  var userData = await userTable.find(query);
  return userData;
}

module.exports.insert = async function (newkh) {
  const kh=new userTable({
	  tendn: newkh.tendn,
	  matkhau: newkh.matkhau,
	  hoten:newkh.hoten,
	  diachi:newkh.diachi,
	  dienthoai:newkh.dienthoai,
	  email:newkh.email,
	  role:'user'
  });
  var userdata= await kh.save();
  return userdata;
};