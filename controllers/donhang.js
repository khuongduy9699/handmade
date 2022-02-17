// JavaScript Document
var bangdonhang=require('../models/donhangmodel.js');
module.exports.select=async function(){
	var dsdonhang=await bangdonhang.select();
	dsmh=dsdonhang.dslsp;
	return dsdonhang;

}


module.exports.selectById = async function (id) {
  const donhang = await bangdonhang.selectOne(id);
  return donhang;
};
module.exports.insert=async function(dh){
	createdh=await bangdonhang.insert(dh);
	return createdh;
}
