const mongoose = require("mongoose");
const Product = require("../ExpressJS01/src/models/product"); // đường dẫn đến file bạn vừa định nghĩa Product

// 🔹 Kết nối MongoDB
mongoose.connect("mongodb+srv://phatbee:Conheodatnhieutien1%24@potadoption.wtjtbjs.mongodb.net/CNPMMoi_BT04?retryWrites=true&w=majority&appName=PotAdoption", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProducts = [
  {
    name: "Thức ăn cho chó Pedigree",
    price: 200000,
    category: "Thức ăn",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 20,
    views: 500,
  },
  {
    name: "Sữa tắm cho mèo Me-o",
    price: 150000,
    category: "Chăm sóc",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 15,
    views: 300,
  },
  {
    name: "Đồ chơi xương cao su cho chó",
    price: 50000,
    category: "Đồ chơi",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 30,
    views: 800,
  },
  {
    name: "Cát vệ sinh cho mèo CatSand",
    price: 120000,
    category: "Phụ kiện",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 20,
    views: 450,
  },
  {
    name: "Chuồng nuôi hamster mini",
    price: 300000,
    category: "Chuồng trại",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 25,
    views: 150,
  },
  {
    name: "Vòng cổ da cho chó mèo",
    price: 80000,
    category: "Phụ kiện",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 20,
    views: 350,
  },
  {
    name: "Thức ăn cho mèo Whiskas",
    price: 220000,
    category: "Thức ăn",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 15,
    views: 600,
  },
  {
    name: "Thuốc nhỏ gáy diệt ve rận cho chó mèo",
    price: 180000,
    category: "Chăm sóc",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 10,
    views: 250,
  },
  {
    name: "Thức ăn hạt cho chó Royal Canin",
    price: 250000,
    category: "Thức ăn",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 10,
    views: 420
  },
  {
    name: "Dầu gội khô cho mèo Trixie",
    price: 130000,
    category: "Chăm sóc",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 25,
    views: 280
  },
  {
    name: "Bóng cao su phát sáng cho chó",
    price: 45000,
    category: "Đồ chơi",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 15,
    views: 650
  },
  {
    name: "Bát ăn đôi cho chó mèo",
    price: 90000,
    category: "Phụ kiện",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 20,
    views: 380
  },
  {
    name: "Chuồng nuôi thỏ kích thước lớn",
    price: 450000,
    category: "Chuồng trại",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 30,
    views: 200
  },
  {
    name: "Thức ăn ướt cho mèo Sheba",
    price: 180000,
    category: "Thức ăn",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 15,
    views: 550
  },
  {
    name: "Lược chải lông cho chó mèo",
    price: 70000,
    category: "Chăm sóc",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 10,
    views: 320
  },
  {
    name: "Đồ chơi dây thừng cho chó",
    price: 60000,
    category: "Đồ chơi",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 25,
    views: 700
  },
  {
    name: "Yếm đeo phản quang cho chó",
    price: 110000,
    category: "Phụ kiện",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 20,
    views: 400
  },
  {
    name: "Nhà cây cho mèo cào móng",
    price: 350000,
    category: "Phụ kiện",
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zNV9hX2N1dGVfZG9nX2FuZF9jYXRfc2l0dGluZ190b2dldGhlcl9pc29sYXRlZF82NTdiZmRjZC0xNzQ3LTRlNjktODc1MC0wYTk3ODliYzE2NDEucG5n.png",
    discount: 15,
    views: 270
  }
];

async function seedDB() {
  try {
    await Product.deleteMany(); // xóa hết dữ liệu cũ
    await Product.insertMany(sampleProducts);
    console.log("✅ Dữ liệu mẫu đã được thêm thành công!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Lỗi khi seed data:", err);
  }
}

seedDB();
