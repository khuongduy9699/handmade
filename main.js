// JavaScript Document
var express=require('express');
var app=express();

app.set('view engine','ejs');

var publicDir=require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var session=require('express-session');
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: '1234567abc', 
    cookie: { maxAge: 60000 }}));

var nodemailer =require('nodemailer');
function sendmail(tomail, tieude, noidung){
var transporter= nodemailer.createTransport({
		service:'gmail',
		auth:{
			user:'banhangnodejs@gmail.com',
			pass:'node123$%^'
		}
});

var mailOptions={
	from :'banhangnodejs@gmail.com',
	to: tomail,
	subject: tieude,
	html: noidung
};
console.log(noidung);
transporter.sendMail(mailOptions, function(error, info){
	if(error){
		console.log(error);
	}else{
		console.log('Email sent: '+info.response);
	}
});
}
const fileUpload=require('express-fileupload');
app.use(fileUpload());

var loaisanpham=require('./controllers/loaisanpham');
var sanpham=require('./controllers/sanpham');
var khachhang=require('./controllers/khachhang');
var donhang=require('./controllers/donhang');
var baiviet=require('./controllers/baiviet');

async function HienThi(req, res,maloai)
{

	var dslsanpham=await loaisanpham.select();
	var ctsanpham=await sanpham.select(maloai);
	var posts=await baiviet.select();
	var tenkh="";
 if(req.session.kh!="" && req.session.kh!=undefined){
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
 }
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	
    res.render('pages/trang_chu',{dslsp:dslsanpham,dssp:ctsanpham,tendn:tenkh,posts:posts});
}

async function HienThiSanPham(req, res,maloai)
{
	var dslsanpham=await loaisanpham.select();
	var ctsanpham=await sanpham.select(maloai);
	var tenkh="";
if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	
    res.render('pages/trang_san_pham',{dslsp:dslsanpham,dssp:ctsanpham,tendn:tenkh});
}

async function HienThiChiTiet(req,res,masp)
{
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	var ctsanpham=await sanpham.select();
	var ttchitietsp=await sanpham.selectChiTiet(masp);
    res.render('pages/trang_chi_tiet_san_pham',{ctsp:ttchitietsp,dssp:ctsanpham, tendn:tenkh});
}
async function HienThiTimKiem(req,res,ten)
{
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	var tttkiem=await sanpham.find(ten);
	res.render('pages/trang_tim_kiem',{kqtk:tttkiem, tendn:tenkh});
}
async function HienThiBaiViet(req, res)
{
	var dsbv=await baiviet.select();
	var tenkh="";
if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	
    res.render('pages/trang_bai_viet',{posts:dsbv,tendn:tenkh});
}
async function HienThiChiTietBaiViet(req,res,mabv)
{
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	var dsbv=await baiviet.select();
	var ttchitietbv=await baiviet.selectById(mabv);
    res.render('pages/trang_chi_tiet_bai_viet',{post:ttchitietbv,posts:dsbv, tendn:tenkh});
}

async function HienThiQuanTri(req, res)
{
	var dslsanpham=await loaisanpham.select();
	var ctsanpham=await sanpham.select();
	var dsdonhang=await donhang.select();

	var dspost=await baiviet.select();
	var tenkh="";
if(req.session.kh!="" && req.session.kh!=undefined){
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	if(req.session.kh.role=='admin')
    res.render('pages/trang_quan_tri',{dslsp:dslsanpham,dssp:ctsanpham,dsdonhang:dsdonhang,tendn:tenkh,posts:dspost});
}
	else
	HienThi(req,res,'mockhoa');
	
	
}

function ThongTinGioHang(req){
	var sl=0, tt=0;
	var ttgh="";
	if(req.session.giohang!=undefined)
	{
		for(var i=0;i<req.session.giohang.length;i++){
			sl=sl+req.session.giohang[i].soluong;
			tt=tt+req.session.giohang[i].dongia*req.session.giohang[i].soluong;
		}
	ttgh="<b>Giỏ hàng<b></br><b>Số lượng: </b>"+sl+"</br><b>Thành tiền: </b>"+tt+"</br><b><a href='chitietgiohang'>Chi tiết...<b>";
	}
	return ttgh;
	
}
function HienThiChiTietGioHang(req,res){
	var giohang=req.session.giohang;
	var ttctgh=""
	var tenkh="";
 if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	if(giohang!=undefined){
		ttctgh="<table width = '80%' cellspacing ='0' cellpadding='2' border='1' align='center'><tr><td width='10%'>STT</td><td width='10%'>Mã sản phẩm</td><td width='30%'>Tên sản phẩm</td><td width ='10%'>Số lượng</td><td width='15%'>Đơn giá</td><td>Thành tiền</td><td>Xóa</td></tr>";
	var stt=1;
	var tongtien=0;
	for( i=0;i<giohang.length;i++){
		ttctgh=ttctgh+"<tr><td>"+stt+++"</td><td>"+giohang[i].masp+"</td><td>"+giohang[i].tensp+"</td><td><input type='text' value='"+giohang[i].soluong+"' name='txtsl"+giohang[i].masp+"'/></td><td>"+giohang[i].dongia+"</td><td>"+giohang[i].soluong*giohang[i].dongia+"</td><td><a href='/xoadonhang/"+giohang[i].masp+"'>Xóa</a></td></tr>";
	tongtien=tongtien+giohang[i].soluong*giohang[i].dongia;
	}
	ttctgh=ttctgh+"<tr><td colspan='6' align='right'>Tổng tiền: "+ tongtien +"</td><td colspan='1' align='center'><input type='submit' name='submit' value='Cập nhật' style='background-color:#ff9933; padding: 10px'></td></tr>";
	
	ttctgh=ttctgh+"</table>";
	
	
	
	res.render('pages/trang_gio_hang',{ttctgh:ttctgh, tendn:tenkh});
	}

}

function HienThiThanhToan(req,res){
	var giohang=req.session.giohang;
	var tenkh="";
 if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<td valign='top'>Chào "+req.session.kh.hoten+"</td></tr><tr><td valign='top'><div align='left' class='style10'><button onclick='myfunction()'> <a href='/dangxuat'>Đăng xuất</a></button></div></td><script>function myfunction(){ alert('Đăng xuất thành công');}</script>";
	else
	tenkh="<td><button><a href='/dangnhap'>Đăng nhập</a></button><button><a href='/dangky'>Đăng ký</a></button></td>";
	if(giohang!=undefined){
		var tongtien=0;
	for(var i=0;i<giohang.length;i++){
	tongtien=tongtien+giohang[i].soluong*giohang[i].dongia;
	}
	var hoten="";
	var diachi="";
	var dienthoai="";
	var email="";
	if(req.session.kh!="" &&req.session.kh!=undefined)
	{
		hoten=req.session.kh.hoten;
		diachi=req.session.kh.diachi;
		dienthoai=req.session.kh.dienthoai;
		email=req.session.kh.email;
		
	}
	
	
	res.render('pages/trang_thanh_toan',{tongtien:tongtien, hoten:hoten, diachi:diachi, dienthoai:dienthoai, email:email, tendn:tenkh});
	}

}


async function dangnhap(req,res,tendn,matkhau)
{
	var kh=await khachhang.login(tendn,matkhau);
	req.session.kh=kh;
	HienThi(req,res,'mockhoa');
}

async function Themsanpham(req,res){
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	var dslh=await loaisanpham.showCombo();
	res.render('pages/trang_them_san_pham',{dslsp:dslh, tendn:tenkh});
}


app.get('/', function(req, res) {
 	HienThi(req,res,'mockhoa'); 
});
app.get('/dangnhap', function(req, res) {
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
 	res.render('pages/trang_dang_nhap',{tendn:tenkh});
});

app.get('/:maloai', function(req, res) {
	var ml=req.params.maloai;
	var role="";
	if(req.session.kh!="" && req.session.kh!=undefined){
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	role=req.session.kh.role;}
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	
	   if(ml=="gioithieu"){
		 
	   res.render('pages/trang_gioi_thieu', {tendn: tenkh});
	   }
	 else if(ml=="dangky")
	   res.render('pages/trang_dang_ky', {tendn: tenkh});
	   else if(ml=="themsanpham")
	   Themsanpham(req,res);
	   else if(ml=="chitiet")
	   HienThiChiTietGioHang(req,res);
	   else if(ml=='dangxuat'){
		  req.session.kh=null;
	   HienThi(req,res,'mockhoa');
	   }
	   else if(ml=="themloai")
	   res.render('pages/trang_them_loai',{tendn: tenkh} );
	   else if(ml=="baiviet")
	   HienThiBaiViet(req,res);
	   else if(ml=="thembaiviet")
	   res.render('pages/trang_them_bai_viet',{tendn: tenkh} );
	   else if(ml=="chitietgiohang"){
	   HienThiChiTietGioHang(req,res);}
	   else if(ml=="thanhtoan"){
	   HienThiThanhToan(req,res);}
	   else if(ml=="chinhsach"){
	   res.render('pages/trang_chinh_sach',{tendn:tenkh});
	   }
	   else if(ml=="quantri"){
	   HienThiQuanTri(req,res);
	   }
	    else if(ml=="lienhe"){
	   res.render('pages/trang_lien_he',{tendn:tenkh});
	   }
	   else if(ml=="camon"){
	   res.render('pages/trang_cam_on',{tendn:tenkh});
	   }
	  else if(ml!='favicon.ico')
		 HienThiSanPham(req,res,ml);

});


app.get('/chitiet/:masp', function(req, res) {
	var masp=req.params.masp;	
	 HienThiChiTiet(req,res,masp);
	
});
app.get('/baivietchitiet/:mabv', function(req, res) {
	var mabv=req.params.mabv;	
	 HienThiChiTietBaiViet(req,res,mabv);
	
});
app.post('/timkiem', function(req, res) {
	var thongtin=req.body;	
	ten=thongtin.keyword;
	 HienThiTimKiem(req,res,ten); 
	 
});
app.post('/dangnhap', function(req, res) {
	var thongtin=req.body;	
	tendn=thongtin.ten_dn;
	matkhau=thongtin.mat_khau;
	 dangnhap(req,res,tendn,matkhau);
	 
});
app.post('/dangky', async function(req, res) {
	var thongtin=req.body;	
	 ten_dn=thongtin.ten_dn;
	 mat_khau=thongtin.mat_khau;
	 ho_ten=thongtin.ho_ten;
	 dia_chi=thongtin.dia_chi;
	 so_dt=thongtin.so_dt;
	 email=thongtin.email;
	 kh=khachhang.insert({tendn:ten_dn,matkhau:mat_khau,hoten:ho_ten,diachi:dia_chi,dienthoai:so_dt,email:email});
	 if(!kh){
		 return;
	}
	kh=await khachhang.login(ten_dn,mat_khau);
	req.session.kh=kh;
	res.redirect('/');
});

app.post('/themloai',async function(req,res){
	var thongtin=req.body;
	ma_loai=thongtin.ma_loai;
	ten_loai=thongtin.ten_loai;
	lm=loaisanpham.create({maloai:ma_loai, tenloai:ten_loai})
	if(!lm){
		 return;
	}
	res.redirect('/quantri');
});

app.get('/capnhatloai/:id', async function(req, res) {
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
  const id = req.params.id;
  const lspUpdate = await loaisanpham.selectById(id);

   res.render('pages/trang_cap_nhat_loai', {lspUpdate:lspUpdate, tendn:tenkh});
});

app.post('/capnhatloai/:id', async function(req, res) {
	
 const id = req.params.id;
  var thongtin=req.body;
    ma_loai= thongtin.ma_loai;
    ten_loai=thongtin.ten_loai;
  const updated = await loaisanpham.updateById(id,{maloai:ma_loai,tenloai:ten_loai});
  if (!updated) {
    res.json({ message: 'Cập nhật không thành công' });
    return;
  }
  res.redirect('/quantri');
});

app.get('/xoaloai/:id', async(req,res)=>{
	const id = req.params.id;
  const lspDelete = await loaisanpham.deleteById(id);
  res.redirect('/quantri');
});

app.get('/xoasanpham/:id', async(req,res)=>{
	const id = req.params.id;
  const spDelete = await sanpham.deleteById(id);
  res.redirect('/quantri');
});

app.get('/capnhatsanpham/:id', async function(req, res) {
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
  const id = req.params.id;
  const sanphamUpdate = await sanpham.selectChiTiet1(id);
 // if (!loaisanphamUp) {
  //  res.send('Loai sanpham khong ton tai');
 //   return;
 // }
	var dslh=await loaisanpham.showCombo1();
   res.render('pages/trang_cap_nhat_san_pham', {sanphamUpdate:sanphamUpdate,dslsp:dslh, tendn:tenkh});
});

app.post('/capnhatsanpham/:id', async function(req, res) {
 const id = req.params.id;

	

  var tt=req.body;//tt=thongtin
	let sampleFile;
	let uploadPath;
	sampleFile=req.files.file;
	sanphammoi={masp:tt.ma_sp,tensp:tt.ten_sp, maloai:tt.loai, hinh:sampleFile.name, giaban:tt.gia_ban, mota:tt.mo_ta};
	 const updated = await sanpham.updateById(id,sanphammoi);
	if(!req.files||Object.keys(req.files).length===0){
		return res.status(400).send('No files were uploaded.');
	}
	uploadPath=__dirname+'/public/images/'+tt.loai+"/"+sampleFile.name;
	sampleFile.mv(uploadPath,function(err){
	if(err)
	return res.status(500).send(err);
	res.redirect("/quantri");
	});
	 
  if (!updated) {
    res.json({ message: 'Cập nhật không thành công' });
    return;
  }
	
});


app.get('/muasanpham/:masp', async function(req, res){
	var ma=req.params.masp;
	var hm=await sanpham.selectChiTiet(ma);
	if(req.session.giohang==undefined){
		req.session.giohang=[];
		var h ={masp:hm.masp, tensp:hm.tensp, dongia:hm.giaban, soluong:1, thanhtien:hm.giaban};
		req.session.giohang[0]=h;
	}
	else{
		var co=0;
		for( var i=0; i<req.session.giohang.length;i++){
			if(req.session.giohang[i].masp==hm.masp){
				co=1;
				req.session.giohang[i].soluong++;
				req.session.giohang[i].thanhtien=req.session.giohang[i].soluong*req.session.giohang[i].dongia;
				break;
			}
		}
			if(co==0){
				var h ={masp:hm.masp, tensp:hm.tensp, dongia:hm.giaban, soluong:1, thanhtien:hm.giaban};
				req.session.giohang[req.session.giohang.length]=h;
			}
	}
	res.redirect('/'+hm.maloai);
});
app.get('/xoadonhang/:masp', function(req, res){
	var masp=req.params.masp;
	for( var i=0; i<req.session.giohang.length;i++){
		if(req.session.giohang[i].masp==masp)
		{
			req.session.giohang.splice(i,1);
			break;
		}
	}
	res.redirect('/chitietgiohang');
});
app.post('/capnhatgiohang', function(req, res){
	var thongtin=req.body;
	for(var i=0; i< req.session.giohang.length;i++){
		req.session.giohang[i].soluong=eval("thongtin.txtsl"+req.session.giohang[i].masp)*1;
	}
	res.redirect('/chitietgiohang');
});
app.post('/xulydathang', async function(req, res){
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
	var tt=req.body;
	hoten=tt.ho_ten;
	diachi=tt.dia_chi;
	dienthoai=tt.dien_thoai;
	email=tt.email;
	var dh={sodh:1, hoten:hoten,diachi:diachi,
	 dienthoai:dienthoai, email:email};
	dh.dslsp=req.session.giohang;
	var kq=donhang.insert(dh);
	giohang=req.session.giohang;
	//xử lý gửi Mail:
	ttctgh="<h1 align='center'>Thông Tin Đơn Hàng</h1>";
	ttctgh=ttctgh+"<p>Họ Tên: "+hoten+"</p>";
	ttctgh=ttctgh+"<p>Địa Chỉ Giao Hàng: "+diachi+"</p>";
	ttctgh=ttctgh+"<p>Điện Thoại: "+dienthoai+"</p>";
	ttctgh=ttctgh+"<p>Email: "+email+"</p>";
	ttctgh=ttctgh+"<table width='80%' cellspacing='0' cellpadding='2' border='1'>";
	ttctgh=ttctgh+"<tr><td width='10%'>Stt</td><td width='10%'>Mã sản phẩm</td><td width='30%'>Tên sản phẩm</td><td width='10%'>Số Lượng</td><td width='15%'>Đơn Giá</td><td>Thành Tiền</td></tr>";
	var stt=1;
	var tongtien=0;
	for(var i=0;i<giohang.length;i++)
	{
		ttctgh=ttctgh+"<tr><td>"+stt+"</td><td>"+giohang[i].masp+"</td><td>"+giohang[i].tensp+"</td><td>"+giohang[i].soluong+"</td><td>"+giohang[i].dongia+"</td><td>"+giohang[i].soluong*giohang[i].dongia+"</td></tr>";
		stt++;
		tongtien=tongtien+giohang[i].soluong*giohang[i].dongia;
	}
	ttctgh=ttctgh+"<tr><td colspan='7' align='right'>Tổng tiền: "+tongtien+"</td></tr></table>";
	ttctgh=ttctgh+"<p>Cảm ơn quý khách đã đặt hàng, đơn hàng sẽ chuyển đến quý khách trong thời gian sớm nhất</p>";
	sendmail(email,"Đơn hàng Shop Handmade", ttctgh);
	if(kq)
	req.session.giohang=null;
	res.redirect('/camon');
});

app.post('/themsanpham', function(req,res){
	var tt=req.body;//tt=thongtin
	let sampleFile;
	let uploadPath;
	sampleFile=req.files.file;
	sanphammoi={masp:tt.ma_sp,tensp:tt.ten_sp, maloai:tt.loai, hinh:sampleFile.name, giaban:tt.gia_ban,
	mota:tt.mo_ta};
	sanpham.insert(sanphammoi);
	if(!req.files||Object.keys(req.files).length===0){
		return res.status(400).send('No files were uploaded.');
	}
	uploadPath=__dirname+'/public/images/'+tt.loai+"/"+sampleFile.name;
	sampleFile.mv(uploadPath,function(err){
	if(err)
	return res.status(500).send(err);
	res.redirect("/quantri");
	});
});

app.post('/thembaiviet', function(req,res){
	var tt=req.body;//tt=thongtin
	let sampleFile;
	let uploadPath;
	sampleFile=req.files.file;
	bvmoi={mabv:tt.ma_sp,tenbv:tt.ten_sp,  hinh:sampleFile.name, ngaydang:tt.gia_ban,
	noidung:tt.mo_ta};
	baiviet.create(bvmoi);
	if(!req.files||Object.keys(req.files).length===0){
		return res.status(400).send('No files were uploaded.');
	}
	uploadPath=__dirname+'/public/images/post/'+sampleFile.name;
	sampleFile.mv(uploadPath,function(err){
	if(err)
	return res.status(500).send(err);
	res.redirect("/quantri");
	});
});

app.get('/xoabaiviet/:id', async(req,res)=>{
	const id = req.params.id;
  const bvDelete = await baiviet.deleteById(id);
  res.redirect('/quantri');
});

app.get('/capnhatbaiviet/:id', async function(req, res) {
	if(req.session.kh!="" && req.session.kh!=undefined)
 	tenkh="<li><button><a>Chào "+req.session.kh.hoten+"</a></button></li><li><button><a href='/dangxuat'>Đăng xuất</a></button></li>";
	else
	tenkh="<li><button><a href='/dangnhap'>Đăng nhập</a></button></li><li><button><a href='/dangky'>Đăng ký</a></button></li>";
  const id = req.params.id;
  const bvUpdate = await baiviet.selectById(id);
 // if (!loaisanphamUp) {
  //  res.send('Loai sanpham khong ton tai');
 //   return;
 // }
	
   res.render('pages/trang_cap_nhat_bai_viet', {post:bvUpdate, tendn:tenkh});
});

app.post('/capnhatbaiviet/:id', async function(req, res) {
 const id = req.params.id;

	

  var tt=req.body;//tt=thongtin
	let sampleFile;
	let uploadPath;
	sampleFile=req.files.file;
	baivietmoi={mabv:tt.ma_sp,tenbv:tt.ten_sp, hinh:sampleFile.name, ngaydang:tt.gia_ban, noidung:tt.mo_ta};
	 const updated = await baiviet.updateById(id,baivietmoi);
	if(!req.files||Object.keys(req.files).length===0){
		return res.status(400).send('No files were uploaded.');
	}
	
	uploadPath=__dirname+'/public/images/post/'+sampleFile.name;
	sampleFile.mv(uploadPath,function(err){
	if(err)
	return res.status(500).send(err);
	res.redirect("/quantri");
	});
	
	 
  if (!updated) {
    res.json({ message: 'Cập nhật không thành công' });
    return;
  }
	
});
			



app.listen(8080);
console.log('8080 is the magic port');