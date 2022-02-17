// JavaScript Document
const loaisanpham = require('../models/loaisanphammodel.js');

module.exports.select = async function() {
  const dsloaisanpham = await loaisanpham.select();
  return dsloaisanpham;
};


module.exports.selectById = async function (id) {
  const loaisanpham1 = await loaisanpham.selectOne(id);
  return loaisanpham1;
};

module.exports.create = async function (newLoaisanpham) {
  const createdLoaisanpham = await loaisanpham.insertOne(newLoaisanpham);
  return createdLoaisanpham;
};

module.exports.updateById = async function (id, newLoaisanpham) {
  const loaisanphamUpdate = await loaisanpham.updateOne({
    _id: id,
    maloai: newLoaisanpham.maloai,
    tenloai: newLoaisanpham.tenloai,
  });
  return loaisanphamUpdate;
};

module.exports.deleteById = async function (id) {
  const loaisanphamDelete = await loaisanpham.deleteOne(id);
  return loaisanphamDelete;
};
module.exports.showCombo=async function(req,res){
	var dslsp=await loaisanpham.select();
	var kq="";
	for(i=0;i<dslsp.length;i++){
		kq=kq+"<option value='"+dslsp[i].maloai+"'>"+dslsp[i].tenloai+"</option>"
	}
	return kq;
}
module.exports.showCombo1=async function(req,res){
	var dslsp=await loaisanpham.select();
	
	return dslsp;
}




