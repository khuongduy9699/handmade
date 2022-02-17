
// JavaScript Document
const mongoose = require('mongoose');
const db = require('../controllers/database');

var userShema = new mongoose.Schema({
  maloai: String,
  tenloai: String,
});

const userTable = mongoose.model('loaisanpham', userShema);

module.exports.select = async function () {
  var userData = await userTable.find({});
  return userData;
};

module.exports.selectOne = async function (query) {
  var userData = await userTable.findById(query);
  return userData;
};

module.exports.insertOne = async function (newLoaiHoa) {
  const loaiHoa = new userTable({
    maloai: newLoaiHoa.maloai,
    tenloai: newLoaiHoa.tenloai,
  });
  var userData = await loaiHoa.save();
  return userData;
};

module.exports.updateOne = async function (loaiHoa) {
  var loaihoaUpdate = await userTable.findById(loaiHoa._id);
  loaihoaUpdate.maloai = loaiHoa.maloai;
  loaihoaUpdate.tenloai = loaiHoa.tenloai;
  var userData = await loaihoaUpdate.save();
  return userData;
};

module.exports.deleteOne = async function (id) {
  var loaihoaDelete = await userTable.findById(id);
  if (loaihoaDelete) {
    var userData = await loaihoaDelete.remove();
    return true;
  }
  return false;
};
