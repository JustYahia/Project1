
(function(){
  document.getElementById('counters').innerHTML = 
  `
  <a href="" class="btn px-0">
  <i class="fas fa-heart text-primary"></i>
  <span 
    class="badge text-secondary border border-secondary rounded-circle"
    style="padding-bottom: 2px" id="love-counter"
    >${localStorage.getItem('loveCounter') ?? 0}</span
  >
</a>
<a href="" class="btn px-0 ml-3">
  <i class="fas fa-shopping-cart text-primary"></i>
  <span
    class="badge text-secondary border border-secondary rounded-circle"
    style="padding-bottom: 2px" id="cart-counter"
    >${localStorage.getItem('cartCounter') ?? 0}</span
  >
</a>`
})();
const getHtmlList = (products,featuredProducts) => {
    let list = '';
  for (let i = 0; i < products.length; ++i) {
    let product = products[i];
    const {  _id, category_id,  color,  description,  discount,  image,  is_featured,  is_recent, 
             name,  price,  rating,  rating_count,size, } = product;

    let product_obj = new Product(product)

    featuredProducts.push(product_obj);
    if(i < 8){
        list += product_obj.getHtmlProduct();
      }
  }
  return list;
}
const fetchFeaturedProducts = async () => {
  let response = await fetch("http://localhost:5000/api/products/getFeatured");
  response = await response.json();
  let products = response.data;
  let featured_products = [];
  let list = getHtmlList(products,featured_products);
  
  localStorage.setItem( "featuredProducts", JSON.stringify(featured_products) );
  document.getElementById('featured-products').innerHTML = list;
  console.log(featured_products);
};

const fetchRecentProducts = async () => {
    let response = await fetch("http://localhost:5000/api/products/getRecent");
    response = await response.json();
    let products = response.data;
    let recentProducts = [];
    let list = getHtmlList(products,recentProducts);
    
    localStorage.setItem( "recentProducts", JSON.stringify(recentProducts) );
    document.getElementById('recent-products').innerHTML = list;
    console.log("RecentProducts: ",recentProducts);
  };


  //localStorage.setItem('loveCounter',0);
  //localStorage.setItem('cartCounter',0);


 const addToWishList =() => {
    let counter = localStorage.getItem('loveCounter') ;
    if(counter === null) {
        counter = 0;
    }
    ++counter;

    localStorage.setItem('loveCounter',JSON.stringify(counter));
    document.getElementById('love-counter').innerHTML = localStorage.getItem('loveCounter');
}

addToCart = (id) =>{
    let counter = localStorage.getItem('cartCounter') ;
    if(counter === null) {
        counter = 0;
    }
    ++counter;

    localStorage.setItem('cartCounter',JSON.stringify(counter));
    document.getElementById('cart-counter').innerHTML = localStorage.getItem('cartCounter');
     console.log(id);

    let products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    localStorage.setItem('products', JSON.stringify(product));

}
fetchFeaturedProducts();
fetchRecentProducts();

/* const addToWishList = () => {
    let counter = parseInt(localStorage.getItem('loveCounter')) + 1;
    localStorage.setItem('loveCounter',JSON.stringify(counter));
    document.getElementById('love-counter').innerHTML = counter;
} */

/* const addToCart = () => {
    let counter = parseInt(localStorage.getItem('cartCounter')) + 1;
    localStorage.setItem('cartCounter',JSON.stringify(counter));
    document.getElementById('cart-counter').innerHTML = counter;
}
 */
class Product {
  _id;
  _category_id;
  _name;
  _price;
  _color;
  _description;
  _discount;
  _image;
  _is_featured;
  _is_recent;
  _rating;
  _rating_count;
  _size;
  obj;

  constructor( obj ) {
    this._id = obj.id;
    this._category_id = obj.category_id;
    this._name = obj.name;
    this._price = obj.price;
    this._color = obj.color;
    this._description = obj.description;
    this._discount = obj.discount;
    this._image = obj.image;
    this._is_featured = obj.is_featured;
    this._is_recent = obj.is_recent;
    this._rating = obj.rating;
    this._rating_count = obj.rating_count;
    this._size = obj.size;
    this.obj = obj;
    
  }

  getPriceAfterDiscount(){
    let finalPrice = this._price - this._price * this._discount;
    return finalPrice;
  }
  getHtmlRating(){
    return `
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small>(${this._rating_count})</small>
    
    `
  }
  getHtmlProduct(){
    return `
    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" src="${this._image}" alt="" />
              <div class="product-action">
                <a 
                  class="btn btn-outline-dark btn-square"
                  href="#"
                  value = ${this.obj}
                  onclick='addToCart(${this._id})'
                  ><i class="fa fa-shopping-cart" ></i> 
                </a>
                <a  onclick='addToWishList()' class="btn btn-outline-dark btn-square" href="#"
                  ><i class="far fa-heart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href="#"
                  ><i class="fa fa-sync-alt"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href="#"
                  ><i class="fa fa-search"></i
                ></a>
              </div>
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href=""
                >${this._name} </a
              >
              <div
                class="d-flex align-items-center justify-content-center mt-2"
              >
                <h5>$${this.getPriceAfterDiscount().toFixed(2)}</h5>
                <h6 class="text-muted ml-2"><del>$${this._price.toFixed(2)}</del></h6>
              </div>
              <div class="d-flex align-items-center justify-content-center mb-1" >
                ${this.getHtmlRating()}
              </div>
            </div>
          </div>
        </div>
    `
  }

 

  getId() {
    return this._id;
  }
  getCategoryId() {
    return this._category_id;
  }
  getName() {
    return this._name;
  }
  getColor() {
    return this._color;
  }
  getDescription() {
    return this._description;
  }
  getDiscount() {
    return this._discount;
  }
  getImage() {
    return this._image;
  }
  getIsFeatured() {
    return this._is_featured;
  }
  getIsRecent() {
    return this._is_recent;
  }
  getPrice() {
    return this._price;
  }
  getRating() {
    return this._rating;
  }
  getRatingCount() {
    return this._rating_count;
  }
  getSize() {
    return this._size;
  }
}
