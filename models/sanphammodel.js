// JavaScript Document
const mongoose = require('mongoose');
const db = require('../controllers/database');

var userShema = new mongoose.Schema({
	masp:String,
  maloai: String,
  tensp: String,
  giaban: Number,
  hinh: String,
  mota: String,
});

const userTable = mongoose.model('sanpham', userShema);

module.exports.select = async function (query = {}) {
  var userData = await userTable.find(query);
  return userData;
};

module.exports.selectOne = async function (query) {
  var userData = await userTable.find(query);
  return userData;
};
module.exports.insert=async function(newsanpham){
	
	const h=new userTable({
			masp:newsanpham.masp,
			tensp:newsanpham.tensp,
			maloai:newsanpham.maloai,
			hinh:newsanpham.hinh,
			giaban:newsanpham.giaban,
			mota:newsanpham.mota		
		});
	var userData=await h.save();
	return userData;
}

module.exports.updateOne = async function (sp) {
  var spUpdate = await userTable.findById(sp._id);
  spUpdate.masp = sp.masp;
  spUpdate.tensp = sp.tensp;
  spUpdate.maloai = sp.maloai;
  spUpdate.hinh = sp.hinh;
  spUpdate.giaban = sp.giaban;
  spUpdate.mota = sp.mota;
  var userData = await spUpdate.save();
  return userData;
};

module.exports.deleteOne = async function (id) {
  var spDelete = await userTable.findById(id);
  if (spDelete) {
    var userData = await spDelete.remove();
    return true;
  }
  return false;
};