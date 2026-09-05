/* =========================================================
   FASHION GARMENTS
   PRODUCTION-READY FRONTEND
   Supabase Auth + 100+ Products + Cart + Wishlist + Search
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL = "https://llehrynfkntrvndbqwsn.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_RiKV4zUAposqKWbtbMr9IQ_M9cT5Zcy";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================================
   PRODUCT DATABASE
========================================================= */

const imagePool = {

  tshirts: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85"
  ],

  hoodies: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1512400930990-e0bc0a0f3d2e?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85"
  ],

  oversized: [
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=85"
  ],

  pants: [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1624378441864-6edae7d0a8f6?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85"
  ],

  waffle: [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1625910513413-5fc45c5b1f15?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=900&q=85"
  ],

  shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=85"
  ],

  jackets: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85"
  ],

  joggers: [
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1506629905607-d9a8b7c1b9f8?auto=format&fit=crop&w=900&q=85"
  ]

};


/* =========================================================
   PRODUCT GENERATOR
========================================================= */

const products = [];

function addProduct(
  id,
  name,
  category,
  price,
  image,
  badge = "",
  oldPrice = null,
  description = ""
) {

  products.push({
    id,
    name,
    category,
    price,
    oldPrice,
    image,
    badge,
    description:
      description ||
      `Premium ${category.toLowerCase()} designed with a modern silhouette, comfortable feel and everyday versatility.`
  });

}


/* =========================================================
   CORE PRODUCTS
========================================================= */

addProduct(
  "FG001",
  "Essential Oversized Tee",
  "Oversized",
  1499,
  imagePool.oversized[0],
  "BESTSELLER",
  1899
);

addProduct(
  "FG002",
  "Studio Cream Tee",
  "T-Shirts",
  1299,
  imagePool.tshirts[0],
  "NEW"
);

addProduct(
  "FG003",
  "Archive Grey Hoodie",
  "Hoodies",
  2499,
  imagePool.hoodies[0],
  "DROP 01",
  2999
);

addProduct(
  "FG004",
  "Form Oversized Shirt",
  "Oversized",
  2199,
  imagePool.oversized[1],
  "NEW"
);

addProduct(
  "FG005",
  "Essential Black Tee",
  "T-Shirts",
  1299,
  imagePool.tshirts[2]
);

addProduct(
  "FG006",
  "Washed Street Hoodie",
  "Hoodies",
  2699,
  imagePool.hoodies[1],
  "LIMITED"
);

addProduct(
  "FG007",
  "Daily Boxy Tee",
  "T-Shirts",
  1399,
  imagePool.tshirts[3],
  "NEW"
);

addProduct(
  "FG008",
  "Relaxed Signature Hoodie",
  "Hoodies",
  2899,
  imagePool.hoodies[2],
  "SALE",
  3299
);


/* =========================================================
   20 PANTS
========================================================= */

const pantsNames = [
  "Essential Straight Pant",
  "Studio Wide Leg Pant",
  "Relaxed Utility Pant",
  "Washed Cargo Pant",
  "Minimal Pleated Pant",
  "Everyday Taper Pant",
  "Archive Work Pant",
  "Heavy Cotton Pant",
  "Urban Straight Pant",
  "Signature Relaxed Pant",
  "Clean Cut Trouser",
  "Raw Edge Cargo Pant",
  "Core Black Pant",
  "Stone Relaxed Pant",
  "Daily Utility Trouser",
  "Modern Carpenter Pant",
  "Loose Fit Cargo",
  "Structured Wide Pant",
  "Essential Grey Trouser",
  "Classic Straight Pant"
];

pantsNames.forEach((name, index) => {

  addProduct(
    `FG-P${String(index + 1).padStart(2, "0")}`,
    name,
    "Pants",
    1999 + (index % 5) * 200,
    imagePool.pants[index % imagePool.pants.length],
    index < 2 ? "NEW" : ""
  );

});


/* =========================================================
   20 WAFFLE TEES
========================================================= */

const waffleNames = [
  "Waffle Core Tee",
  "Waffle Stone Tee",
  "Waffle Cream Tee",
  "Waffle Black Tee",
  "Waffle Olive Tee",
  "Waffle Charcoal Tee",
  "Waffle Sand Tee",
  "Waffle Relaxed Tee",
  "Waffle Heavy Tee",
  "Waffle Boxy Tee",
  "Waffle Daily Tee",
  "Waffle Studio Tee",
  "Waffle Rib Tee",
  "Waffle Textured Tee",
  "Waffle Essential Tee",
  "Waffle Mineral Tee",
  "Waffle Natural Tee",
  "Waffle Vintage Tee",
  "Waffle Signature Tee",
  "Waffle Premium Tee"
];

waffleNames.forEach((name, index) => {

  addProduct(
    `FG-W${String(index + 1).padStart(2, "0")}`,
    name,
    "Waffle Tees",
    1499 + (index % 4) * 150,
    imagePool.waffle[index % imagePool.waffle.length],
    index < 3 ? "NEW" : ""
  );

});


/* =========================================================
   20 SHOES
========================================================= */

const shoeNames = [
  "Mono Runner",
  "Studio Court Sneaker",
  "Core White Sneaker",
  "Archive Low Trainer",
  "Street Form Runner",
  "Minimal Leather Sneaker",
  "Urban Mesh Runner",
  "Everyday Canvas Sneaker",
  "Shadow Runner",
  "Essential Court Shoe",
  "Retro Daily Sneaker",
  "Motion Knit Runner",
  "Clean Line Trainer",
  "Neutral Street Shoe",
  "Signature Low Sneaker",
  "Modern Track Runner",
  "Mono Court Trainer",
  "Premium Daily Sneaker",
  "Archive Street Runner",
  "Future Form Sneaker"
];

shoeNames.forEach((name, index) => {

  addProduct(
    `FG-S${String(index + 1).padStart(2, "0")}`,
    name,
    "Shoes",
    2499 + (index % 5) * 300,
    imagePool.shoes[index % imagePool.shoes.length],
    index === 0 ? "BESTSELLER" : index < 3 ? "NEW" : ""
  );

});


/* =========================================================
   20 JACKETS
========================================================= */

const jacketNames = [
  "Essential Bomber Jacket",
  "Studio Utility Jacket",
  "Washed Denim Jacket",
  "Archive Coach Jacket",
  "Minimal Harrington Jacket",
  "Heavy Overshirt Jacket",
  "Urban Shell Jacket",
  "Core Black Bomber",
  "Stone Work Jacket",
  "Daily Zip Jacket",
  "Relaxed Field Jacket",
  "Modern Varsity Jacket",
  "Signature Nylon Jacket",
  "Structured Overshirt",
  "Utility Pocket Jacket",
  "Mono Windbreaker",
  "Premium Flight Jacket",
  "Vintage Wash Jacket",
  "Clean Cut Jacket",
  "Future Form Jacket"
];

jacketNames.forEach((name, index) => {

  addProduct(
    `FG-J${String(index + 1).padStart(2, "0")}`,
    name,
    "Jackets",
    2999 + (index % 5) * 300,
    imagePool.jackets[index % imagePool.jackets.length],
    index < 2 ? "NEW" : ""
  );

});


/* =========================================================
   20 JOGGERS
========================================================= */

const joggerNames = [
  "Essential Core Jogger",
  "Relaxed Grey Jogger",
  "Studio Black Jogger",
  "Heavy Cotton Jogger",
  "Everyday Comfort Jogger",
  "Archive Track Jogger",
  "Minimal Utility Jogger",
  "Washed Relaxed Jogger",
  "Signature Wide Jogger",
  "Clean Form Jogger",
  "Daily Street Jogger",
  "Essential Olive Jogger",
  "Soft Loopback Jogger",
  "Urban Taper Jogger",
  "Premium Lounge Jogger",
  "Core Charcoal Jogger",
  "Motion Jogger",
  "Relaxed Cargo Jogger",
  "Modern Fit Jogger",
  "Future Everyday Jogger"
];

joggerNames.forEach((name, index) => {

  addProduct(
    `FG-JG${String(index + 1).padStart(2, "0")}`,
    name,
    "Joggers",
    1799 + (index % 5) * 200,
    imagePool.joggers[index % imagePool.joggers.length],
    index < 2 ? "NEW" : ""
  );

});


/* =========================================================
   EXTRA T-SHIRTS
========================================================= */

const teeNames = [
  "Core White Tee",
  "Core Charcoal Tee",
  "Vintage Wash Tee",
  "Daily Sand Tee",
  "Essential Olive Tee",
  "Mono Grey Tee",
  "Studio Black Tee",
  "Heavy Cotton Tee",
  "Minimal Logo Tee",
  "Classic Regular Tee",
  "Premium Jersey Tee",
  "Clean Line Tee",
  "Archive Graphic Tee",
  "Relaxed Daily Tee",
  "Signature Cotton Tee",
  "Urban Essential Tee",
  "Natural Tone Tee",
  "Washed Navy Tee",
  "Modern Fit Tee",
  "Everyday Premium Tee"
];

teeNames.forEach((name, index) => {

  addProduct(
    `FG-T${String(index + 1).padStart(2, "0")}`,
    name,
    "T-Shirts",
    1199 + (index % 4) * 100,
    imagePool.tshirts[index % imagePool.tshirts.length],
    index < 2 ? "NEW" : ""
  );

});


/* =========================================================
   EXTRA HOODIES
========================================================= */

const hoodieNames = [
  "Core Black Hoodie",
  "Studio Cream Hoodie",
  "Heavy Grey Hoodie",
  "Essential Olive Hoodie",
  "Washed Black Hoodie",
  "Minimal Zip Hoodie",
  "Relaxed Pullover Hoodie",
  "Signature Cotton Hoodie",
  "Urban Essential Hoodie",
  "Archive Logo Hoodie"
];

hoodieNames.forEach((name, index) => {

  addProduct(
    `FG-H${String(index + 1).padStart(2, "0")}`,
    name,
    "Hoodies",
    2399 + (index % 4) * 200,
    imagePool.hoodies[index % imagePool.hoodies.length],
    index < 2 ? "NEW" : ""
  );

});


/* =========================================================
   EXTRA OVERSIZED
========================================================= */

const oversizedNames = [
  "Relaxed Black Oversized",
  "Studio Grey Oversized",
  "Washed Cream Oversized",
  "Archive Blue Oversized",
  "Core Olive Oversized",
  "Heavy Cotton Oversized",
  "Minimal Sand Oversized",
  "Street Charcoal Oversized",
  "Signature White Oversized",
  "Daily Black Oversized"
];

oversizedNames.forEach((name, index) => {

  addProduct(
    `FG-O${String(index + 1).padStart(2, "0")}`,
    name,
    "Oversized",
    1499 + (index % 4) * 150,
    imagePool.oversized[index % imagePool.oversized.length],
    index < 2 ? "NEW" : ""
  );

});


/* =========================================================
   TOTAL PRODUCT COUNT
========================================================= */

console.log("FASHION GARMENTS PRODUCTS:", products.length);


/* =========================================================
   STORAGE
========================================================= */

const CART_KEY = "fashionGarmentsCart";
const WISHLIST_KEY = "fashionGarmentsWishlist";

let cart = loadJSON(CART_KEY, []);
let wishlist = loadJSON(WISHLIST_KEY, []);

let activeFilter = "All";
let currentProduct = null;
let selectedSize = "M";
let toastTimer = null;


/* =========================================================
   HELPERS
========================================================= */

function loadJSON(key, fallback) {

  try {

    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    const parsed = JSON.parse(value);

    return parsed;

  } catch (error) {

    console.warn("Storage error:", error);

    return fallback;

  }

}


function money(value) {

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

}


function saveCart() {

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

}


function saveWishlist() {

  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(wishlist)
  );

}


function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

  const toast = document.getElementById("toast");
  const text = document.getElementById("toastText");

  if (!toast || !text) return;

  text.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* =========================================================
   OVERLAYS
========================================================= */

function openOverlay(id) {

  const overlay = document.getElementById(id);

  if (!overlay) return;

  overlay.classList.add("open");

  document.body.classList.add("no-scroll");

}


function closeOverlay(id) {

  const overlay = document.getElementById(id);

  if (!overlay) return;

  overlay.classList.remove("open");

  if (
    !document.querySelector(
      ".overlay.open, .cart-drawer.open"
    )
  ) {

    document.body.classList.remove("no-scroll");

  }

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

  const isWishlisted =
    wishlist.includes(product.id);

  return `

    <article class="product-card reveal">

      <div
        class="product-image"
        data-product-id="${escapeHTML(product.id)}"
      >

        ${
          product.badge
            ? `<span class="product-badge">
                ${escapeHTML(product.badge)}
              </span>`
            : ""
        }

        <button
          class="wishlist-heart ${isWishlisted ? "active" : ""}"
          data-wishlist="${escapeHTML(product.id)}"
          aria-label="Wishlist"
        >
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="${isWishlisted ? "currentColor" : "none"}"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path d="M20.8 8.7c0 5.1-8.8 10.3-8.8 10.3S3.2 13.8 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"></path>
          </svg>
        </button>

        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

        <button
          class="quick-add"
          data-quick-add="${escapeHTML(product.id)}"
        >
          ADD TO CART
        </button>

      </div>

      <div class="product-info">

        <h3>${escapeHTML(product.name)}</h3>

        <div class="product-meta">

          <span>
            ${escapeHTML(product.category)}
          </span>

          <span class="product-price">
            ${money(product.price)}
            ${
              product.oldPrice
                ? `<del>${money(product.oldPrice)}</del>`
                : ""
            }
          </span>

        </div>

      </div>

    </article>

  `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(list, containerId) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  if (!list.length) {

    container.innerHTML = `
      <div
        class="empty-cart"
        style="grid-column:1/-1;min-height:250px"
      >
        <div>
          <strong>No products found</strong>
          <span>Try another search or category.</span>
        </div>
      </div>
    `;

    return;

  }

  container.innerHTML =
    list.map(productCard).join("");

  requestAnimationFrame(() => {

    container
      .querySelectorAll(".reveal")
      .forEach((element, index) => {

        setTimeout(() => {

          element.classList.add("visible");

        }, Math.min(index * 25, 350));

      });

  });

}


/* =========================================================
   INITIAL NEW PRODUCTS
========================================================= */

function renderInitialProducts() {

  const newest = products.slice(0, 8);

  renderProducts(
    newest,
    "newProducts"
  );

}


/* =========================================================
   SHOP FILTER
========================================================= */

function applyShopFilters() {

  let result = [...products];

  if (activeFilter !== "All") {

    result =
      result.filter(
        product =>
          product.category === activeFilter
      );

  }

  const sort =
    document.getElementById("sortSelect")?.value;

  if (sort === "low") {

    result.sort(
      (a, b) =>
        a.price - b.price
    );

  } else if (sort === "high") {

    result.sort(
      (a, b) =>
        b.price - a.price
    );

  } else if (sort === "name") {

    result.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );

  }

  renderProducts(
    result,
    "shopProducts"
  );

}


function setFilter(category) {

  activeFilter = category;

  document
    .querySelectorAll(".filter")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );

    });

  applyShopFilters();

}


/* =========================================================
   PRODUCT EVENTS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const wishlistButton =
      event.target.closest(
        "[data-wishlist]"
      );

    if (wishlistButton) {

      event.stopPropagation();

      toggleWishlist(
        wishlistButton.dataset.wishlist
      );

      return;

    }

    const quickAdd =
      event.target.closest(
        "[data-quick-add]"
      );

    if (quickAdd) {

      event.stopPropagation();

      addToCart(
        quickAdd.dataset.quickAdd,
        "M"
      );

      return;

    }

    const productImage =
      event.target.closest(
        ".product-image"
      );

    if (productImage) {

      const id =
        productImage.dataset.productId;

      if (id) {

        openProduct(id);

      }

    }

  }
);


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {

  const index =
    wishlist.indexOf(id);

  if (index >= 0) {

    wishlist.splice(index, 1);

    showToast("Removed from wishlist");

  } else {

    wishlist.push(id);

    showToast("Added to wishlist");

  }

  saveWishlist();

  updateWishlistCount();

  refreshProductCards();

}


function updateWishlistCount() {

  const count =
    document.getElementById(
      "wishlistCount"
    );

  if (count) {

    count.textContent =
      wishlist.length;

  }

}


function refreshProductCards() {

  const shop =
    document.getElementById(
      "shopProducts"
    );

  if (shop) {

    applyShopFilters();

  }

  const newest =
    document.getElementById(
      "newProducts"
    );

  if (newest) {

    renderInitialProducts();

  }

}


/* =========================================================
   WISHLIST BUTTON
========================================================= */

document
  .getElementById("wishlistBtn")
  ?.addEventListener(
    "click",
    () => {

      if (!wishlist.length) {

        showToast(
          "Your wishlist is empty"
        );

        return;

      }

      const wishProducts =
        products.filter(
          product =>
            wishlist.includes(product.id)
        );

      renderProducts(
        wishProducts,
        "shopProducts"
      );

      activeFilter = "All";

      document
        .querySelectorAll(".filter")
        .forEach(button => {

          button.classList.toggle(
            "active",
            button.dataset.filter === "All"
          );

        });

      document
        .getElementById("shop")
        ?.scrollIntoView({
          behavior: "smooth"
        });

      showToast(
        `${wishlist.length} wishlist item${wishlist.length > 1 ? "s" : ""}`
      );

    }
  );


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(id) {

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;

  currentProduct = product;

  selectedSize = "M";

  const content =
    document.getElementById(
      "productModalContent"
    );

  if (!content) return;

  content.innerHTML = `

    <div class="product-modal-content">

      <div class="modal-product-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
        >
      </div>

      <div class="modal-product-info">

        <p class="eyebrow">
          ${escapeHTML(product.category)}
        </p>

        <h2>
          ${escapeHTML(product.name)}
        </h2>

        <div class="modal-price">
          ${money(product.price)}
          ${
            product.oldPrice
              ? `<del style="color:#777;font-size:13px;margin-left:8px;font-weight:400">
                  ${money(product.oldPrice)}
                </del>`
              : ""
          }
        </div>

        <p class="modal-description">
          ${escapeHTML(product.description)}
        </p>

        <div class="size-title">
          SELECT SIZE
        </div>

        <div class="sizes">

          ${["S", "M", "L", "XL", "XXL"]
            .map(
              size => `
                <button
                  class="size-btn ${
                    size === "M"
                      ? "active"
                      : ""
                  }"
                  data-size="${size}"
                >
                  ${size}
                </button>
              `
            )
            .join("")}

        </div>

        <button
          class="btn btn-dark full"
          id="modalAddToCart"
        >
          <span>ADD TO CART</span>
          <span>→</span>
        </button>

      </div>

    </div>

  `;

  openOverlay(
    "productOverlay"
  );

}


document.addEventListener(
  "click",
  event => {

    const sizeButton =
      event.target.closest(
        "[data-size]"
      );

    if (!sizeButton) return;

    selectedSize =
      sizeButton.dataset.size;

    document
      .querySelectorAll(
        ".size-btn"
      )
      .forEach(button => {

        button.classList.toggle(
          "active",
          button === sizeButton
        );

      });

  }
);


document.addEventListener(
  "click",
  event => {

    if (
      event.target.closest(
        "#modalAddToCart"
      )
    ) {

      if (!currentProduct) return;

      addToCart(
        currentProduct.id,
        selectedSize
      );

      closeOverlay(
        "productOverlay"
      );

    }

  }
);


/* =========================================================
   CART
========================================================= */

function addToCart(id, size = "M") {

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;

  const existing =
    cart.find(
      item =>
        item.id === id &&
        item.size === size
    );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      id,
      size,
      quantity: 1
    });

  }

  saveCart();

  updateCart();

  showToast(
    `${product.name} added to cart`
  );

}


function removeFromCart(id, size) {

  cart =
    cart.filter(
      item =>
        !(
          item.id === id &&
          item.size === size
        )
    );

  saveCart();

  updateCart();

}


function changeQuantity(
  id,
  size,
  change
) {

  const item =
    cart.find(
      cartItem =>
        cartItem.id === id &&
        cartItem.size === size
    );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {

    removeFromCart(
      id,
      size
    );

    return;

  }

  saveCart();

  updateCart();

}


function cartSubtotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return total;

      return (
        total +
        product.price *
        item.quantity
      );

    },
    0
  );

}


/* =========================================================
   CART UPDATE
========================================================= */

function updateCart() {

  const items =
    document.getElementById(
      "cartItems"
    );

  const count =
    document.getElementById(
      "cartCount"
    );

  const total =
    document.getElementById(
      "cartTotal"
    );

  const shippingMessage =
    document.getElementById(
      "shippingMessage"
    );

  const shippingProgress =
    document.getElementById(
      "shippingProgress"
    );

  if (!items) return;

  const itemCount =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const subtotal =
    cartSubtotal();

  if (count) {

    count.textContent =
      itemCount;

  }

  if (total) {

    total.textContent =
      money(subtotal);

  }

  if (!cart.length) {

    items.innerHTML = `

      <div class="empty-cart">

        <div>

          <strong>
            YOUR CART IS EMPTY
          </strong>

          <span>
            Discover something you love.
          </span>

        </div>

      </div>

    `;

  } else {

    items.innerHTML =
      cart.map(
        item => {

          const product =
            products.find(
              p =>
                p.id === item.id
            );

          if (!product) return "";

          return `

            <div class="cart-item">

              <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
              >

              <div>

                <h4>
                  ${escapeHTML(product.name)}
                </h4>

                <small>
                  SIZE: ${escapeHTML(item.size)}
                </small>

                <div class="quantity">

                  <button
                    data-cart-minus="${escapeHTML(product.id)}"
                    data-cart-size="${escapeHTML(item.size)}"
                    aria-label="Decrease"
                  >
                    −
                  </button>

                  <span>
                    ${item.quantity}
                  </span>

                  <button
                    data-cart-plus="${escapeHTML(product.id)}"
                    data-cart-size="${escapeHTML(item.size)}"
                    aria-label="Increase"
                  >
                    +
                  </button>

                </div>

                <button
                  class="remove"
                  data-cart-remove="${escapeHTML(product.id)}"
                  data-cart-size="${escapeHTML(item.size)}"
                >
                  REMOVE
                </button>

              </div>

              <strong>
                ${money(
                  product.price *
                  item.quantity
                )}
              </strong>

            </div>

          `;

        }
      ).join("");

  }

  const freeShippingTarget =
    1999;

  if (shippingProgress) {

    const progress =
      Math.min(
        subtotal /
          freeShippingTarget *
          100,
        100
      );

    shippingProgress.style.width =
      `${progress}%`;

  }

  if (shippingMessage) {

    if (!cart.length) {

      shippingMessage.textContent =
        "Add products to your cart.";

    } else if (
      subtotal >=
      freeShippingTarget
    ) {

      shippingMessage.textContent =
        "You unlocked FREE SHIPPING.";

    } else {

      shippingMessage.textContent =
        `Add ${money(
          freeShippingTarget - subtotal
        )} more for FREE SHIPPING.`;

    }

  }

}


/* =========================================================
   CART CONTROLS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const plus =
      event.target.closest(
        "[data-cart-plus]"
      );

    if (plus) {

      changeQuantity(
        plus.dataset.cartPlus,
        plus.dataset.cartSize,
        1
      );

      return;

    }

    const minus =
      event.target.closest(
        "[data-cart-minus]"
      );

    if (minus) {

      changeQuantity(
        minus.dataset.cartMinus,
        minus.dataset.cartSize,
        -1
      );

      return;

    }

    const remove =
      event.target.closest(
        "[data-cart-remove]"
      );

    if (remove) {

      removeFromCart(
        remove.dataset.cartRemove,
        remove.dataset.cartSize
      );

      showToast(
        "Item removed"
      );

    }

  }
);


/* =========================================================
   OPEN CART
========================================================= */

document
  .getElementById("cartBtn")
  ?.addEventListener(
    "click",
    () => {

      updateCart();

      document
        .getElementById("cartDrawer")
        ?.classList.add("open");

      document
        .getElementById("cartBackdrop")
        ?.classList.add("open");

      document.body.classList.add(
        "no-scroll"
      );

    }
  );


function closeCart() {

  document
    .getElementById("cartDrawer")
    ?.classList.remove("open");

  document
    .getElementById("cartBackdrop")
    ?.classList.remove("open");

  if (
    !document.querySelector(
      ".overlay.open"
    )
  ) {

    document.body.classList.remove(
      "no-scroll"
    );

  }

}


document
  .getElementById("closeCart")
  ?.addEventListener(
    "click",
    closeCart
  );

document
  .getElementById("cartBackdrop")
  ?.addEventListener(
    "click",
    closeCart
  );


/* =========================================================
   SEARCH
========================================================= */

function searchProducts(query) {

  const value =
    query
      .trim()
      .toLowerCase();

  if (!value) {

    return products.slice(0, 8);

  }

  return products.filter(
    product =>
      product.name
        .toLowerCase()
        .includes(value) ||
      product.category
        .toLowerCase()
        .includes(value)
  ).slice(0, 20);

}


function renderSearchResults(
  query = ""
) {

  const results =
    document.getElementById(
      "searchResults"
    );

  if (!results) return;

  const found =
    searchProducts(query);

  if (!found.length) {

    results.innerHTML = `
      <div
        class="empty-cart"
        style="min-height:180px"
      >
        <div>
          <strong>
            NOTHING FOUND
          </strong>
          <span>
            Try another search.
          </span>
        </div>
      </div>
    `;

    return;

  }

  results.innerHTML =
    found.map(
      product => `

        <div
          class="search-result"
          data-search-product="${escapeHTML(product.id)}"
        >

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
          >

          <div>
            <strong>
              ${escapeHTML(product.name)}
            </strong>

            <div
              style="
                color:var(--muted);
                font-size:10px;
                margin-top:4px;
              "
            >
              ${escapeHTML(product.category)}
            </div>
          </div>

          <strong style="margin-left:auto">
            ${money(product.price)}
          </strong>

        </div>

      `
    ).join("");

}


document
  .getElementById("searchBtn")
  ?.addEventListener(
    "click",
    () => {

      openOverlay(
        "searchOverlay"
      );

      renderSearchResults();

      setTimeout(
        () =>
          document
            .getElementById(
              "searchInput"
            )
            ?.focus(),
        200
      );

    }
  );


document
  .getElementById("searchInput")
  ?.addEventListener(
    "input",
    event => {

      renderSearchResults(
        event.target.value
      );

    }
  );


document.addEventListener(
  "click",
  event => {

    const result =
      event.target.closest(
        "[data-search-product]"
      );

    if (!result) return;

    closeOverlay(
      "searchOverlay"
    );

    openProduct(
      result.dataset.searchProduct
    );

  }
);


/* =========================================================
   FILTER BUTTONS
========================================================= */

document
  .getElementById("filterTabs")
  ?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".filter"
        );

      if (!button) return;

      setFilter(
        button.dataset.filter
      );

    }
  );


document
  .getElementById("sortSelect")
  ?.addEventListener(
    "change",
    applyShopFilters
  );


/* =========================================================
   CATEGORY CARDS
========================================================= */

document
  .querySelectorAll(
    ".category-card"
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const category =
          card.dataset.category;

        if (!category) return;

        setFilter(
          category
        );

        setTimeout(() => {

          document
            .getElementById("shop")
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }, 50);

      }
    );

  });


/* =========================================================
   FOOTER FILTERS
========================================================= */

document
  .querySelectorAll(
    "[data-footer-filter]"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        setFilter(
          link.dataset.footerFilter
        );

      }
    );

  });


/* =========================================================
   MOBILE MENU
========================================================= */

document
  .getElementById(
    "mobileMenuBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "mobileMenu"
        )
        ?.classList.toggle(
          "open"
        );

    }
  );


document
  .querySelectorAll(
    "#mobileMenu a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        document
          .getElementById(
            "mobileMenu"
          )
          ?.classList.remove(
            "open"
          );

      }
    );

  });


/* =========================================================
   ACCOUNT VIEWS
========================================================= */

function showAccountView(view) {

  document
    .querySelectorAll(
      ".account-view"
    )
    .forEach(element => {

      element.hidden =
        element.id !== view;

    });

}


function setMessage(
  id,
  message,
  type = ""
) {

  const element =
    document.getElementById(id);

  if (!element) return;

  element.textContent =
    message;

  element.className =
    `account-message ${type}`;

}


async function refreshAuthUI() {

  const {
    data
  } =
    await supabaseClient.auth.getSession();

  const session =
    data?.session;

  if (session?.user) {

    showAccountView(
      "accountLoggedIn"
    );

    const user =
      session.user;

    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "Customer";

    document
      .getElementById(
        "accountName"
      ).textContent =
      name;

    document
      .getElementById(
        "accountEmail"
      ).textContent =
      user.email || "";

  } else {

    showAccountView(
      "loginView"
    );

  }

}


/* =========================================================
   ACCOUNT OPEN
========================================================= */

async function openAccount() {

  await refreshAuthUI();

  openOverlay(
    "accountOverlay"
  );

}


document
  .getElementById("accountBtn")
  ?.addEventListener(
    "click",
    openAccount
  );


document
  .getElementById("mobileAccount")
  ?.addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "mobileMenu"
        )
        ?.classList.remove(
          "open"
        );

      openAccount();

    }
  );


/* =========================================================
   SIGN UP
========================================================= */

document
  .getElementById(
    "showSignupBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      setMessage(
        "loginMessage",
        ""
      );

      setMessage(
        "signupMessage",
        ""
      );

      showAccountView(
        "signupView"
      );

    }
  );


document
  .getElementById(
    "showLoginBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      setMessage(
        "signupMessage",
        ""
      );

      showAccountView(
        "loginView"
      );

    }
  );


document
  .getElementById("signupForm")
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const name =
        document
          .getElementById(
            "signupName"
          )
          .value
          .trim();

      const email =
        document
          .getElementById(
            "signupEmail"
          )
          .value
          .trim();

      const password =
        document
          .getElementById(
            "signupPassword"
          )
          .value;

      setMessage(
        "signupMessage",
        "Creating your account..."
      );

      const {
        data,
        error
      } =
        await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name
            }
          }
        });

      if (error) {

        setMessage(
          "signupMessage",
          error.message,
          "error"
        );

        return;

      }

      if (!data.session) {

        setMessage(
          "signupMessage",
          "Account created. Check your email to confirm your account, then login.",
          "success"
        );

      } else {

        setMessage(
          "signupMessage",
          "Account created successfully.",
          "success"
        );

        await refreshAuthUI();

      }

    }
  );


/* =========================================================
   LOGIN
========================================================= */

document
  .getElementById("loginForm")
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document
          .getElementById(
            "loginEmail"
          )
          .value
          .trim();

      const password =
        document
          .getElementById(
            "loginPassword"
          )
          .value;

      setMessage(
        "loginMessage",
        "Logging you in..."
      );

      const {
        error
      } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

      if (error) {

        setMessage(
          "loginMessage",
          error.message,
          "error"
        );

        return;

      }

      setMessage(
        "loginMessage",
        "Login successful.",
        "success"
      );

      await refreshAuthUI();

    }
  );


/* =========================================================
   FORGOT PASSWORD
========================================================= */

document
  .getElementById(
    "forgotPasswordBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      setMessage(
        "loginMessage",
        ""
      );

      showAccountView(
        "forgotView"
      );

    }
  );


document
  .getElementById(
    "backToLoginBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      setMessage(
        "forgotMessage",
        ""
      );

      showAccountView(
        "loginView"
      );

    }
  );


document
  .getElementById(
    "forgotForm"
  )
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document
          .getElementById(
            "forgotEmail"
          )
          .value
          .trim();

      const redirectTo =
        window.location.origin +
        window.location.pathname;

      setMessage(
        "forgotMessage",
        "Sending reset link..."
      );

      const {
        error
      } =
        await supabaseClient.auth.resetPasswordForEmail(
          email,
          {
            redirectTo
          }
        );

      if (error) {

        setMessage(
          "forgotMessage",
          error.message,
          "error"
        );

        return;

      }

      setMessage(
        "forgotMessage",
        "Reset link sent. Check your email.",
        "success"
      );

    }
  );


/* =========================================================
   PASSWORD RESET
========================================================= */

document
  .getElementById(
    "resetForm"
  )
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const password =
        document
          .getElementById(
            "resetPassword"
          )
          .value;

      const confirmPassword =
        document
          .getElementById(
            "resetPasswordConfirm"
          )
          .value;

      if (
        password !==
        confirmPassword
      ) {

        setMessage(
          "resetMessage",
          "Passwords do not match.",
          "error"
        );

        return;

      }

      setMessage(
        "resetMessage",
        "Updating password..."
      );

      const {
        error
      } =
        await supabaseClient.auth.updateUser({
          password
        });

      if (error) {

        setMessage(
          "resetMessage",
          error.message,
          "error"
        );

        return;

      }

      setMessage(
        "resetMessage",
        "Password updated successfully.",
        "success"
      );

      setTimeout(
        () => {

          showAccountView(
            "loginView"
          );

        },
        1000
      );

    }
  );


/* =========================================================
   LOGOUT
========================================================= */

document
  .getElementById(
    "logoutBtn"
  )
  ?.addEventListener(
    "click",
    async () => {

      const {
        error
      } =
        await supabaseClient.auth.signOut();

      if (error) {

        showToast(
          error.message
        );

        return;

      }

      showAccountView(
        "loginView"
      );

      showToast(
        "Logged out successfully"
      );

    }
  );


/* =========================================================
   SUPABASE AUTH STATE
========================================================= */

supabaseClient.auth.onAuthStateChange(
  async (event, session) => {

    if (
      event ===
      "PASSWORD_RECOVERY"
    ) {

      openOverlay(
        "accountOverlay"
      );

      showAccountView(
        "resetView"
      );

      return;

    }

    if (
      event ===
        "SIGNED_IN" ||
      event ===
        "SIGNED_OUT"
    ) {

      if (
        document
          .getElementById(
            "accountOverlay"
          )
          ?.classList.contains(
            "open"
          )
      ) {

        if (session?.user) {

          showAccountView(
            "accountLoggedIn"
          );

          const name =
            session.user.user_metadata?.full_name ||
            "Customer";

          document
            .getElementById(
              "accountName"
            ).textContent =
            name;

          document
            .getElementById(
              "accountEmail"
            ).textContent =
            session.user.email || "";

        } else {

          showAccountView(
            "loginView"
          );

        }

      }

    }

  }
);


/* =========================================================
   CHECKOUT
========================================================= */

async function isLoggedIn() {

  const {
    data
  } =
    await supabaseClient.auth.getSession();

  return Boolean(
    data?.session?.user
  );

}


function renderCheckout() {

  const checkoutItems =
    document.getElementById(
      "checkoutItems"
    );

  if (!checkoutItems) return;

  const subtotal =
    cartSubtotal();

  const shipping =
    subtotal >= 1999
      ? 0
      : cart.length
        ? 99
        : 0;

  const total =
    subtotal + shipping;

  checkoutItems.innerHTML =
    cart.map(
      item => {

        const product =
          products.find(
            p => p.id === item.id
          );

        if (!product) return "";

        return `

          <div class="checkout-product">

            <span>
              ${escapeHTML(product.name)}
              × ${item.quantity}
              <small
                style="
                  display:block;
                  color:var(--muted);
                  margin-top:3px;
                "
              >
                Size ${escapeHTML(item.size)}
              </small>
            </span>

            <strong>
              ${money(
                product.price *
                item.quantity
              )}
            </strong>

          </div>

        `;

      }
    ).join("");

  document
    .getElementById(
      "checkoutSubtotal"
    ).textContent =
    money(subtotal);

  document
    .getElementById(
      "checkoutShipping"
    ).textContent =
    shipping === 0
      ? "FREE"
      : money(shipping);

  document
    .getElementById(
      "checkoutTotal"
    ).textContent =
    money(total);

}


/* =========================================================
   CHECKOUT BUTTON
========================================================= */

document
  .getElementById(
    "checkoutBtn"
  )
  ?.addEventListener(
    "click",
    async () => {

      if (!cart.length) {

        showToast(
          "Your cart is empty"
        );

        return;

      }

      const loggedIn =
        await isLoggedIn();

      if (!loggedIn) {

        closeCart();

        await openAccount();

        setMessage(
          "loginMessage",
          "Please login before checkout."
        );

        return;

      }

      closeCart();

      renderCheckout();

      openOverlay(
        "checkoutOverlay"
      );

    }
  );


/* =========================================================
   CHECKOUT FORM
========================================================= */

document
  .getElementById(
    "checkoutForm"
  )
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      if (!cart.length) {

        showToast(
          "Your cart is empty"
        );

        return;

      }

      const button =
        event.target.querySelector(
          "button[type='submit']"
        );

      if (button) {

        button.disabled = true;

      }

      const name =
        document
          .getElementById(
            "checkoutName"
          )
          .value
          .trim();

      const email =
        document
          .getElementById(
            "checkoutEmail"
          )
          .value
          .trim();

      const address =
        document
          .getElementById(
            "checkoutAddress"
          )
          .value
          .trim();

      const city =
        document
          .getElementById(
            "checkoutCity"
          )
          .value
          .trim();

      const pincode =
        document
          .getElementById(
            "checkoutPincode"
          )
          .value
          .trim();

      const phone =
        document
          .getElementById(
            "checkoutPhone"
          )
          .value
          .trim();

      if (
        pincode.length !== 6 ||
        !/^\d+$/.test(pincode)
      ) {

        showToast(
          "Enter a valid 6-digit pincode"
        );

        if (button) {
          button.disabled = false;
        }

        return;

      }

      if (
        phone.replace(/\D/g, "").length <
        10
      ) {

        showToast(
          "Enter a valid phone number"
        );

        if (button) {
          button.disabled = false;
        }

        return;

      }

      const subtotal =
        cartSubtotal();

      const shipping =
        subtotal >= 1999
          ? 0
          : 99;

      const total =
        subtotal + shipping;

      /*
        IMPORTANT:
        This frontend is prepared for Razorpay,
        but real Razorpay payment creation and
        signature verification must happen on a
        secure backend/server.

        Never put Razorpay secret key here.
      */

      console.log(
        "Order ready for payment:",
        {
          customer: {
            name,
            email,
            address,
            city,
            pincode,
            phone
          },
          items: cart,
          subtotal,
          shipping,
          total
        }
      );

      setTimeout(
        () => {

          cart = [];

          saveCart();

          updateCart();

          closeOverlay(
            "checkoutOverlay"
          );

          showToast(
            "Order details received successfully"
          );

          event.target.reset();

          if (button) {

            button.disabled = false;

          }

        },
        900
      );

    }
  );


/* =========================================================
   NEWSLETTER
========================================================= */

document
  .getElementById(
    "newsletterForm"
  )
  ?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const email =
        document
          .getElementById(
            "newsletterEmail"
          )
          .value
          .trim();

      if (!email) return;

      showToast(
        "You're on the list."
      );

      event.target.reset();

    }
  );


/* =========================================================
   CLOSE BUTTONS
========================================================= */

document
  .getElementById(
    "closeSearch"
  )
  ?.addEventListener(
    "click",
    () =>
      closeOverlay(
        "searchOverlay"
      )
  );


document
  .getElementById(
    "closeProduct"
  )
  ?.addEventListener(
    "click",
    () =>
      closeOverlay(
        "productOverlay"
      )
  );


document
  .getElementById(
    "closeAccount"
  )
  ?.addEventListener(
    "click",
    () =>
      closeOverlay(
        "accountOverlay"
      )
  );


document
  .getElementById(
    "closeCheckout"
  )
  ?.addEventListener(
    "click",
    () =>
      closeOverlay(
        "checkoutOverlay"
      )
  );


/* =========================================================
   CLICK OUTSIDE OVERLAY
========================================================= */

document.addEventListener(
  "click",
  event => {

    if (
      !event.target.classList.contains(
        "overlay"
      )
    ) {
      return;
    }

    event.target.classList.remove(
      "open"
    );

    if (
      !document.querySelector(
        ".overlay.open, .cart-drawer.open"
      )
    ) {

      document.body.classList.remove(
        "no-scroll"
      );

    }

  }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !==
      "Escape"
    ) {
      return;
    }

    document
      .querySelectorAll(
        ".overlay.open"
      )
      .forEach(
        overlay =>
          overlay.classList.remove(
            "open"
          )
      );

    closeCart();

  }
);


/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    const header =
      document.getElementById(
        "header"
      );

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 50
    );

  },
  {
    passive: true
  }
);


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function initReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );

  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

    return;

  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.08
      }
    );

  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {

  document
    .querySelectorAll(
      ".btn"
    )
    .forEach(button => {

      button.addEventListener(
        "mousemove",
        event => {

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

        }
      );

      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform =
            "";

        }
      );

    });

}


/* =========================================================
   COUNTDOWN
========================================================= */

let countdownEnd =
  Date.now() +
  7 * 24 * 60 * 60 * 1000;


function updateCountdown() {

  const remaining =
    Math.max(
      countdownEnd -
      Date.now(),
      0
    );

  const totalSeconds =
    Math.floor(
      remaining / 1000
    );

  const days =
    Math.floor(
      totalSeconds /
      86400
    );

  const hours =
    Math.floor(
      (totalSeconds % 86400) /
      3600
    );

  const minutes =
    Math.floor(
      (totalSeconds % 3600) /
      60
    );

  const seconds =
    totalSeconds % 60;

  const set =
    (id, value) => {

      const element =
        document.getElementById(id);

      if (!element) return;

      element.textContent =
        String(value)
          .padStart(2, "0");

    };

  set("days", days);
  set("hours", hours);
  set("minutes", minutes);
  set("seconds", seconds);

}


setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    renderInitialProducts();

    applyShopFilters();

    updateWishlistCount();

    updateCart();

    updateCountdown();

    initReveal();

    initMagneticButtons();

    await refreshAuthUI();

    setTimeout(
      () => {

        document
          .getElementById(
            "loader"
          )
          ?.classList.add(
            "hide"
          );

      },
      700
    );

  }
);


/* =========================================================
   AUTH REDIRECT CHECK
========================================================= */

(async function checkAuthRedirect() {

  const hash =
    window.location.hash;

  if (
    hash.includes(
      "type=recovery"
    )
  ) {

    setTimeout(
      async () => {

        openOverlay(
          "accountOverlay"
        );

        showAccountView(
          "resetView"
        );

      },
      500
    );

  }

})();


/* =========================================================
   FINAL PRODUCT COUNT
========================================================= */

console.log(
  `%cFASHION GARMENTS%c ${products.length} products loaded.`,
  "font-weight:bold;",
  "font-weight:normal;"
);