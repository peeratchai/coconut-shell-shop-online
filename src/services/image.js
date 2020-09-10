export default function return_image(product_name) {
    let require_path;
    switch (product_name) {
        case 'โคมไฟกะลามะพร้าว': require_path = require('../assets/images/product-1.jpg'); break;
        case 'ชุดเครื่องครัวกะลามะพร้าว': require_path = require('../assets/images/product-2.jpg'); break;
        case 'ครกกะลามะพร้าว': require_path = require('../assets/images/product-3.jpg'); break;
        case 'กระบวยตักน้ำ': require_path = require('../assets/images/product-4.jpg'); break;
        case 'ที่ใส่สบู่เหลว': require_path = require('../assets/images/product-5.jpg'); break;
        case 'ออมสินหมู': require_path = require('../assets/images/product-6.jpg'); break;
        default: break;
    }
    return require_path;
}

