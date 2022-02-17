
// JavaScript Document
const mongoose = require('mongoose');
const db = require('../controllers/database');

var userShema = new mongoose.Schema({
  mabv: String,
  tenbv: String,
  noidung:String,
  ngaydang:String,
  hinh:String
});

const userTable = mongoose.model('baiviet', userShema);

module.exports.select = async function () {
  var userData = await userTable.find({});
  return userData;
};

module.exports.selectOne = async function (query) {
  var userData = await userTable.findById(query);
  return userData;
};

module.exports.insertOne = async function (newbaiviet) {
  const baiviet = new userTable({
    mabv: newbaiviet.mabv,
    tenbv: newbaiviet.tenbv,
	noidung:newbaiviet.noidung,
	ngaydang:newbaiviet.ngaydang,
	hinh:newbaiviet.hinh
  });
  var userData = await baiviet.save();
  return userData;
};

module.exports.updateOne = async function (baiviet) {
  var baivietUpdate = await userTable.findById(baiviet._id);
  baivietUpdate.mabv = baiviet.mabv;
  baivietUpdate.tenbv = baiviet.tenbv;
  baivietUpdate.noidung = baiviet.noidung;
  baivietUpdate.ngaydang = baiviet.ngaydang;
  baivietUpdate.hinh = baiviet.hinh;
  var userData = await baivietUpdate.save();
  return userData;
};

module.exports.deleteOne = async function (id) {
  var baivietDelete = await userTable.findById(id);
  if (baivietDelete) {
    var userData = await baivietDelete.remove();
    return true;
  }
  return false;
};
