// JavaScript Document
const mongoose = require('mongoose');
const db = require('../controllers/database');

var userShema = new mongoose.Schema({
	sodh:Number,
  hoten: String,
  diachi: String,
  dienthoai: String,
  email: String,
  dslsp: [{masp: String, tensp: String, soluong: Number, dongia: Number, thanhtien:Number}] ,
});


const userTable = mongoose.model('donhang', userShema);

module.exports.select = async function () {
  var userData = await userTable.find({});
  return userData;
};

module.exports.selectOne = async function (query) {
  var userData = await userTable.find(query);
  return userData;
};

module.exports.insert=async function(newdonhang){
	var bangdonhang=await userTable.find().sort({sodh:-1}).limit(1);
	var sodh=1;
	if(bangdonhang.length>0)
	sodh=sodh+bangdonhang[0].sodh;
	const donhang=new userTable({sodh: sodh, hoten:newdonhang.hoten, diachi:newdonhang.diachi, dienthoai:newdonhang.dienthoai, email:newdonhang.email, dslsp:newdonhang.dslsp
	});
	var userData=await donhang.save();
	return userData;
}