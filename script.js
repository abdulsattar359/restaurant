const products = [
{ id:1, name:"Premium Headphones", price:120, category:"audio", image:"https://picsum.photos/400?1"},
{ id:2, name:"Smart Watch", price:180, category:"wearable", image:"https://picsum.photos/400?2"},
{ id:3, name:"Wireless Speaker", price:95, category:"audio", image:"https://picsum.photos/400?3"},
{ id:4, name:"Gaming Mouse", price:60, category:"accessory", image:"https://picsum.photos/400?4"},
{ id:5, name:"Laptop Backpack", price:75, category:"accessory", image:"https://picsum.photos/400?5"},
{ id:6, name:"Fitness Band", price:110, category:"wearable", image:"https://picsum.photos/400?6"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productContainer = document.getElementById("products");

/* DISPLAY PRODUCTS */
function displayProducts(items){
    productContainer.innerHTML="";
    items.forEach(product=>{
        productContainer.innerHTML+=`
        <div class="product">
            <img src="${product.image}" onclick="openModal(${product.id})">
            <div class="product-content">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>`;
    });
}

displayProducts(products);

/* FILTER */
function filterProducts(category){
    document.querySelectorAll(".filter button").forEach(btn=>btn.classList.remove("active"));
    event.target.classList.add("active");

    if(category==="all") displayProducts(products);
    else displayProducts(products.filter(p=>p.category===category));
}

/* CART FUNCTIONS */
function addToCart(id){
    const item = cart.find(p=>p.id===id);
    if(item) item.qty++;
    else{
        const product = products.find(p=>p.id===id);
        cart.push({...product, qty:1});
    }
    updateCart();
}

function updateCart(){
    localStorage.setItem("cart",JSON.stringify(cart));
    const cartItems=document.getElementById("cart-items");
    cartItems.innerHTML="";
    let total=0, count=0;

    cart.forEach(item=>{
        total+=item.price*item.qty;
        count+=item.qty;

        cartItems.innerHTML+=`
        <div class="cart-item">
            <span>${item.name} x${item.qty}</span>
            <button onclick="removeFromCart(${item.id})">X</button>
        </div>`;
    });

    document.getElementById("cart-total").innerText="Total: $"+total;
    document.getElementById("cart-count").innerText=count;
}

function removeFromCart(id){
    cart=cart.filter(p=>p.id!==id);
    updateCart();
}

updateCart();

/* MODAL */
function openModal(id){
    const product=products.find(p=>p.id===id);
    document.getElementById("modal-img").src=product.image;
    document.getElementById("modal-title").innerText=product.name;
    document.getElementById("modal-price").innerText="$"+product.price;
    document.getElementById("modal-add").onclick=()=>addToCart(id);
    document.getElementById("product-modal").style.display="flex";
}

function closeModal(){
    document.getElementById("product-modal").style.display="none";
}

/* CART TOGGLE */
function toggleCart(){
    document.getElementById("cart").classList.toggle("active");
}

function scrollToProducts(){
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
