// JavaScript Document
const baiviet = require('../models/baivietmodel.js');

module.exports.select = async function() {
  const dsbaiviet = await baiviet.select();
  return dsbaiviet;
};


module.exports.selectById = async function (id) {
  const baiviet1 = await baiviet.selectOne(id);
  return baiviet1;
};

module.exports.create = async function (newbaiviet) {
  const createdbaiviet = await baiviet.insertOne(newbaiviet);
  return createdbaiviet;
};

module.exports.updateById = async function (id, newbaiviet) {
  const baivietUpdate = await baiviet.updateOne({
    _id: id,
    mabv: newbaiviet.mabv,
    tenbv: newbaiviet.tenbv,
	noidung:newbaiviet.noidung,
	ngaydang:newbaiviet.ngaydang,
	hinh:newbaiviet.hinh
  });
  
  return baivietUpdate;
};

module.exports.deleteById = async function (id) {
  const baivietDelete = await baiviet.deleteOne(id);
  return baivietDelete;
};





