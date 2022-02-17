// JavaScript Document

const sanpham = require('../models/sanphammodel');

module.exports.select = async function (maloai = 'all') {
  if (maloai === 'all') {
    const dssanpham = await sanpham.select({});
    return dssanpham;
  }
  const dssp = await sanpham.select({ maloai });
  return dssp;
};

module.exports.selectChiTiet = async function (id) {
  const sanphamDetail = await sanpham.selectOne({ masp: id });
  return sanphamDetail[0];
};
module.exports.selectChiTiet1 = async function (id) {
  const sanphamDetail = await sanpham.selectOne({ _id: id });
  return sanphamDetail[0];
};

module.exports.find = async function (query = '') {
  const sanphams = await sanpham.select({
    $or: [
      { tensp: { $regex: `${query}`, $options: 'i' } }
    ],
  });
  return sanphams;
};

module.exports.insert=async function(newsanpham){
	createdsp=await sanpham.insert(newsanpham);
	return createdsp;
};

module.exports.updateById = async function (id, newsanpham) {
  const sanphamUpdate = await sanpham.updateOne({
    _id: id,
    masp: newsanpham.masp,
    tensp: newsanpham.tensp,
	maloai: newsanpham.maloai,
	hinh: newsanpham.hinh,
    giaban: newsanpham.giaban,
	mota: newsanpham.mota,
  });
  return sanphamUpdate;
};

module.exports.deleteById = async function (id) {
  const sanphamDelete = await sanpham.deleteOne(id);
  return sanphamDelete;
};

















/*var csdl=require('./database');
module.exports.select= async function (maloaihoa)
{
var dshoa = await csdl.select('hoa',{maloai:maloaihoa});

	var kq="<table width='100%' align='center' >";
	for(i=0;i<dshoa.length;i++)
	 {
		   if(i%3==0)
			   kq=kq+"<tr>";
			   kq=kq+"<td><a href='/detail/"+ dshoa[i].mahoa+"'><img src='/images/"+dshoa[i].hinh+"'></a><br>Tên hoa :"+dshoa[i].tenhoa +"<br>Giá bán :"+dshoa[i].giaban+"</td>";
			   if((i+1)%3==0)
			   kq=kq+"</tr>";
			   
			   
		}
		 
		 kq=kq+"</table";
		 return kq;
}
module.exports.selectChitiet=async function(mahoa)
{
	var cthoa = await csdl.select('hoa',{mahoa:mahoa});
	var kq="<table width ='100%' align ='center'>";
	 kq=kq+"<tr>";
		kq=kq+"<td><a href='/detail/"+ cthoa[0].mahoa+"'><img src='/images/"+cthoa[0].hinh+"'></a><br>Tên hoa :"+cthoa[0].tenhoa +"<br>Giá bán :"+cthoa[0].giaban+"</td>";
		kq=kq+"</tr>";
		kq=kq+"</table>";
	return kq;
}
module.exports.selectFind=async function(tenhoa)
{
	var dshoa=await csdl.select('hoa',{$or:[{tenhoa: new RegExp(tenhoa,'i')},{mota: new RegExp(tenhoa,'i')}]});
	var kq="<table width='100%' align='center' >";
	for(i=0;i<dshoa.length;i++)
	 {
		  if(i%2==0)
		   kq=kq+"<tr>";
			   kq=kq+"<td width='50%'><table width='100%'><tr>";
			   kq=kq+"<td><img src='/images/"+dshoa[i].hinh+"'></td><td>Tên hoa :"+dshoa[i].tenhoa +"<br>Giá bán :"+dshoa[i].dongia+"<br>Mô Tả :"+dshoa[i].mota+"<br><a href='/"+dshoa[i].maloai+"'>Về Trang Chủ</a></td></tr></table></td>";
			if((i+1)%2==0)
			 kq=kq+"</tr>";
		 
			   
		}
		 
		 kq=kq+"</table>";
		 return kq;
}

module.exports.selectFind= async function (tenhoa)
{
	var chuoi="SELECT * from hoa where tenhoa like'%"+tenhoa +"%' or mota like '%"+tenhoa+"%'";
	
	  var dshoa = await csdl.DocBang(chuoi);
	
	
	var kq="<table width='100%' align='center' >";
	for(i=0;i<dshoa.length;i++)
	 {
		  if(i%2==0)
		   kq=kq+"<tr>";
			   kq=kq+"<td width='50%'><table width='100%'><tr>";
			   kq=kq+"<td><img src='/images/"+dshoa[i].hinh+"'></td><td>Tên hoa :"+dshoa[i].tenhoa +"<br>Giá bán :"+dshoa[i].dongia+"<br>Mô Tả :"+dshoa[i].mota+"<br><a href='/"+dshoa[i].maloai+"'>Về Trang Chủ</a></td></tr></table></td>";
			if((i+1)%2==0)
			 kq=kq+"</tr>";
		 
			   
		}
		 
		 kq=kq+"</table";
		 return kq;
	}
*/