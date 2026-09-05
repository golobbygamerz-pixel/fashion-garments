/* =========================================================
   FASHION GARMENTS
   STORE + CART + WISHLIST + SUPABASE AUTH
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL = "https://llehrynfkntrvndbqwsn.supabase.co";
const SUPABASE_KEY = "sb_publishable_RiKV4zUAposqKWbtbMr9IQ_M9cT5Zcy";

const supabaseClient =
  window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    category: "Oversized",
    price: 1499,
    oldPrice: 1899,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    description: "A relaxed everyday silhouette with premium comfort and a clean finish."
  },
  {
    id: 2,
    name: "Studio Cream Tee",
    category: "T-Shirts",
    price: 1299,
    oldPrice: null,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1000&q=85",
    description: "Minimal cream tee designed for effortless everyday styling."
  },
  {
    id: 3,
    name: "Archive Grey Hoodie",
    category: "Hoodies",
    price: 2499,
    oldPrice: 2999,
    badge: "DROP 01",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
    description: "Heavyweight relaxed hoodie with a timeless archive-inspired silhouette."
  },
  {
    id: 4,
    name: "Form Oversized Shirt",
    category: "Oversized",
    price: 2199,
    oldPrice: null,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=85",
    description: "A modern oversized shirt built around clean lines and easy movement."
  },
  {
    id: 5,
    name: "Essential Black Tee",
    category: "T-Shirts",
    price: 1299,
    oldPrice: null,
    badge: "",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85",
    description: "The everyday black tee. Simple, versatile and made to repeat."
  },
  {
    id: 6,
    name: "Washed Street Hoodie",
    category: "Hoodies",
    price: 2699,
    oldPrice: null,
    badge: "LIMITED",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=85",
    description: "Washed finish hoodie with an elevated streetwear attitude."
  },
  {
    id: 7,
    name: "Daily Boxy Tee",
    category: "T-Shirts",
    price: 1399,
    oldPrice: null,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=85",
    description: "Boxy everyday fit with a modern proportion and soft hand feel."
  },
  {
    id: 8,
    name: "Relaxed Signature Hoodie",
    category: "Hoodies",
    price: 2899,
    oldPrice: 3299,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
    description: "Relaxed premium hoodie designed as an everyday signature piece."
  }
];


/* =========================================================
   STORAGE
========================================================= */

let cart = [];
let wishlist = [];

try {
  cart = JSON.parse(localStorage.getItem("thriftyCart")) || [];
} catch {
  cart = [];
}

try {
  wishlist = JSON.parse(localStorage.getItem("thriftyWishlist")) || [];
} catch {
  wishlist = [];
}


/* =========================================================
   HELPERS
========================================================= */

const $ = (id) => document.getElementById(id);

const money = (value) =>
  "₹" + Number(value).toLocaleString("en-IN");

function saveCart() {
  localStorage.setItem("thriftyCart", JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem("thriftyWishlist", JSON.stringify(wishlist));
}

function showToast(message) {
  const toast = $("toast");
  const text = $("toastText");

  if (!toast) return;

  if (text) text.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function openOverlay(id) {
  const overlay = $(id);

  if (!overlay) return;

  overlay.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeOverlay(id) {
  const overlay = $(id);

  if (!overlay) return;

  overlay.classList.remove("open");

  if (
    !document.querySelector(".overlay.open") &&
    !document.querySelector(".cart-drawer.open")
  ) {
    document.body.classList.remove("no-scroll");
  }
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

  const liked = wishlist.includes(product.id);

  return `
    <article class="product-card reveal">

      <div
        class="product-image"
        data-product="${product.id}">

        ${
          product.badge
            ? `<div class="product-badge">${product.badge}</div>`
            : ""
        }

        <button
          class="wishlist-heart ${liked ? "active" : ""}"
          data-wishlist="${product.id}"
          aria-label="Wishlist">

          <svg viewBox="0 0 24 24" width="17" height="17"
               fill="none"
               stroke="currentColor"
               stroke-width="1.5">

            <path d="M20.8 8.7c0 5.4-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z"></path>

          </svg>

        </button>

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy">

        <button
          class="quick-add"
          data-add="${product.id}">
          QUICK ADD +
        </button>

      </div>

      <div class="product-info">

        <h3>${product.name}</h3>

        <div class="product-meta">

          <span>${product.category}</span>

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

  const container = $(containerId);

  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <p style="grid-column:1/-1;color:#77746e;padding:40px 0;">
        No products found.
      </p>
    `;
    return;
  }

  container.innerHTML = list.map(productCard).join("");

  requestAnimationFrame(() => {
    container.querySelectorAll(".reveal").forEach(el => {
      setTimeout(() => el.classList.add("visible"), 40);
    });
  });
}


/* =========================================================
   INITIAL PRODUCTS
========================================================= */

function renderInitialProducts() {
  renderProducts(products.slice(0, 4), "newProducts");
  renderProducts(products, "shopProducts");
}

renderInitialProducts();


/* =========================================================
   PRODUCT CLICK EVENTS
========================================================= */

document.addEventListener("click", (event) => {

  const addButton = event.target.closest("[data-add]");

  if (addButton) {
    event.stopPropagation();

    const id = Number(addButton.dataset.add);

    addToCart(id);

    return;
  }


  const wishButton = event.target.closest("[data-wishlist]");

  if (wishButton) {
    event.stopPropagation();

    const id = Number(wishButton.dataset.wishlist);

    toggleWishlist(id);

    return;
  }


  const productImage = event.target.closest(".product-image");

  if (
    productImage &&
    !event.target.closest("[data-add]") &&
    !event.target.closest("[data-wishlist]")
  ) {
    const id = Number(productImage.dataset.product);

    openProduct(id);
  }

});


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {

  const index = wishlist.indexOf(id);

  if (index >= 0) {
    wishlist.splice(index, 1);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist");
  }

  saveWishlist();

  updateWishlistCount();

  renderInitialProducts();
}

function updateWishlistCount() {

  const count = $("wishlistCount");

  if (count) {
    count.textContent = wishlist.length;
  }
}

updateWishlistCount();


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProduct(id) {

  const product = products.find(p => p.id === id);

  if (!product) return;

  const modal = $("productModalContent");

  if (!modal) return;

  modal.innerHTML = `

    <div class="product-modal-content">

      <div class="modal-product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="modal-product-info">

        <p class="eyebrow">${product.category}</p>

        <h2>${product.name}</h2>

        <div class="modal-price">
          ${money(product.price)}
          ${
            product.oldPrice
              ? `<del style="color:#77746e;font-size:13px;margin-left:8px;">
                   ${money(product.oldPrice)}
                 </del>`
              : ""
          }
        </div>

        <p class="modal-description">
          ${product.description}
        </p>

        <div class="size-title">
          SELECT SIZE
        </div>

        <div class="sizes">
          <button class="size-btn">S</button>
          <button class="size-btn active">M</button>
          <button class="size-btn">L</button>
          <button class="size-btn">XL</button>
        </div>

        <button
          class="btn btn-dark full"
          id="modalAddToCart"
          data-id="${product.id}">
          ADD TO BAG
          <span>↗</span>
        </button>

      </div>

    </div>
  `;

  openOverlay("productOverlay");
}


/* =========================================================
   MODAL SIZE
========================================================= */

document.addEventListener("click", (event) => {

  const size = event.target.closest(".size-btn");

  if (!size) return;

  const parent = size.parentElement;

  parent.querySelectorAll(".size-btn")
    .forEach(btn => btn.classList.remove("active"));

  size.classList.add("active");
});


document.addEventListener("click", (event) => {

  const button = event.target.closest("#modalAddToCart");

  if (!button) return;

  const id = Number(button.dataset.id);

  const size =
    document.querySelector(".size-btn.active")?.textContent || "M";

  addToCart(id, size);

  closeOverlay("productOverlay");
});


/* =========================================================
   CART
========================================================= */

function addToCart(id, size = "M") {

  const product = products.find(p => p.id === id);

  if (!product) return;

  const existing = cart.find(
    item => item.id === id && item.size === size
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

  showToast(`${product.name} added to bag`);
}


function removeFromCart(index) {

  if (index < 0 || index >= cart.length) return;

  cart.splice(index, 1);

  saveCart();

  updateCart();
}


function changeQuantity(index, amount) {

  if (!cart[index]) return;

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();

  updateCart();
}


function cartSubtotal() {

  return cart.reduce((total, item) => {

    const product = products.find(p => p.id === item.id);

    if (!product) return total;

    return total + product.price * item.quantity;

  }, 0);
}


function updateCart() {

  const container = $("cartItems");
  const count = $("cartCount");
  const total = $("cartTotal");
  const shippingMessage = $("shippingMessage");
  const shippingProgress = $("shippingProgress");

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cartSubtotal();

  if (count) count.textContent = itemCount;

  if (total) total.textContent = money(subtotal);

  if (container) {

    if (!cart.length) {

      container.innerHTML = `
        <div class="empty-cart">
          <div>
            <strong>Your bag is empty.</strong>
            <span>Add something you love.</span>
          </div>
        </div>
      `;

    } else {

      container.innerHTML = cart.map((item, index) => {

        const product = products.find(p => p.id === item.id);

        if (!product) return "";

        return `
          <div class="cart-item">

            <img src="${product.image}" alt="${product.name}">

            <div>

              <h4>${product.name}</h4>

              <small>
                ${item.size} · ${money(product.price)}
              </small>

              <div class="quantity">

                <button
                  data-minus="${index}">
                  −
                </button>

                <span>${item.quantity}</span>

                <button
                  data-plus="${index}">
                  +
                </button>

              </div>

              <button
                class="remove"
                data-remove="${index}">
                Remove
              </button>

            </div>

            <strong>
              ${money(product.price * item.quantity)}
            </strong>

          </div>
        `;

      }).join("");

    }

  }


  if (shippingMessage && shippingProgress) {

    const freeShipping = 1999;

    if (!cart.length) {

      shippingMessage.textContent =
        "Add ₹1,999 to unlock free shipping.";

      shippingProgress.style.width = "0%";

    } else if (subtotal >= freeShipping) {

      shippingMessage.textContent =
        "You unlocked free shipping ✓";

      shippingProgress.style.width = "100%";

    } else {

      const remaining = freeShipping - subtotal;

      shippingMessage.textContent =
        `Add ${money(remaining)} to unlock free shipping.`;

      shippingProgress.style.width =
        `${Math.min((subtotal / freeShipping) * 100, 100)}%`;

    }

  }
}


document.addEventListener("click", (event) => {

  const plus = event.target.closest("[data-plus]");

  if (plus) {
    changeQuantity(Number(plus.dataset.plus), 1);
    return;
  }

  const minus = event.target.closest("[data-minus]");

  if (minus) {
    changeQuantity(Number(minus.dataset.minus), -1);
    return;
  }

  const remove = event.target.closest("[data-remove]");

  if (remove) {
    removeFromCart(Number(remove.dataset.remove));
  }

});


updateCart();


/* =========================================================
   CART OPEN / CLOSE
========================================================= */

$("cartBtn")?.addEventListener("click", () => {

  $("cartDrawer")?.classList.add("open");
  $("cartBackdrop")?.classList.add("open");

  document.body.classList.add("no-scroll");

});


function closeCart() {

  $("cartDrawer")?.classList.remove("open");
  $("cartBackdrop")?.classList.remove("open");

  if (!document.querySelector(".overlay.open")) {
    document.body.classList.remove("no-scroll");
  }

}

$("closeCart")?.addEventListener("click", closeCart);
$("cartBackdrop")?.addEventListener("click", closeCart);


/* =========================================================
   SEARCH
========================================================= */

$("searchBtn")?.addEventListener("click", () => {

  openOverlay("searchOverlay");

  setTimeout(() => {
    $("searchInput")?.focus();
  }, 250);

});


$("closeSearch")?.addEventListener(
  "click",
  () => closeOverlay("searchOverlay")
);


$("searchInput")?.addEventListener("input", (event) => {

  const query =
    event.target.value.trim().toLowerCase();

  const results = $("searchResults");

  if (!results) return;

  if (!query) {
    results.innerHTML = "";
    return;
  }

  const matches = products.filter(product =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query)
  );

  results.innerHTML = matches.length
    ? matches.map(product => `
        <div
          class="search-result"
          data-search-product="${product.id}">

          <img
            src="${product.image}"
            alt="${product.name}">

          <div>
            <strong>${product.name}</strong>
            <div style="font-size:10px;color:#77746e;margin-top:4px;">
              ${product.category} · ${money(product.price)}
            </div>
          </div>

        </div>
      `).join("")
    : `
      <p style="color:#77746e;font-size:12px;padding:15px 0;">
        No products found.
      </p>
    `;

});


document.addEventListener("click", (event) => {

  const result =
    event.target.closest("[data-search-product]");

  if (!result) return;

  const id = Number(result.dataset.searchProduct);

  closeOverlay("searchOverlay");

  openProduct(id);

});


/* =========================================================
   FILTERS
========================================================= */

let activeFilter = "all";

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelectorAll(".filter")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    activeFilter = button.dataset.filter || "all";

    applyShopFilters();

  });

});


$("sortSelect")?.addEventListener("change", applyShopFilters);


function applyShopFilters() {

  let list = [...products];

  if (activeFilter !== "all") {

    list = list.filter(
      product => product.category === activeFilter
    );

  }

  const sort = $("sortSelect")?.value;

  if (sort === "low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    list.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  renderProducts(list, "shopProducts");

}


/* =========================================================
   CATEGORY CARDS
========================================================= */

document.querySelectorAll(".category-card").forEach(card => {

  card.addEventListener("click", () => {

    const category = card.dataset.category;

    if (!category) return;

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

  });

});


/* =========================================================
   MOBILE MENU
========================================================= */

$("mobileMenuBtn")?.addEventListener("click", () => {

  $("mobileMenu")?.classList.toggle("open");

});


document.querySelectorAll("#mobileMenu a").forEach(link => {

  link.addEventListener("click", () => {

    $("mobileMenu")?.classList.remove("open");

  });

});


/* =========================================================
   ACCOUNT
========================================================= */

function showAccountView(viewId) {

  const views = [
    "loginView",
    "signupView",
    "forgotView",
    "resetView",
    "accountLoggedIn"
  ];

  views.forEach(id => {

    const element = $(id);

    if (!element) return;

    element.hidden = id !== viewId;

  });

}


function accountMessage(id, message, type = "") {

  const element = $(id);

  if (!element) return;

  element.textContent = message;

  element.className =
    `account-message ${type}`.trim();

}


function showLogin() {

  showAccountView("loginView");

  accountMessage("loginMessage", "");

}


function showSignup() {

  showAccountView("signupView");

  accountMessage("signupMessage", "");

}


function showForgot() {

  showAccountView("forgotView");

  accountMessage("forgotMessage", "");

}


$("accountBtn")?.addEventListener("click", async () => {

  openOverlay("accountOverlay");

  await refreshAccountUI();

});


$("mobileAccount")?.addEventListener("click", async () => {

  $("mobileMenu")?.classList.remove("open");

  openOverlay("accountOverlay");

  await refreshAccountUI();

});


$("closeAccount")?.addEventListener(
  "click",
  () => closeOverlay("accountOverlay")
);


$("showSignupBtn")?.addEventListener(
  "click",
  showSignup
);


$("showLoginBtn")?.addEventListener(
  "click",
  showLogin
);


$("forgotPasswordBtn")?.addEventListener(
  "click",
  showForgot
);


$("backToLoginBtn")?.addEventListener(
  "click",
  showLogin
);


/* =========================================================
   SIGN UP
========================================================= */

$("signupForm")?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const name =
      $("signupName")?.value.trim();

    const email =
      $("signupEmail")?.value.trim();

    const password =
      $("signupPassword")?.value;

    if (!name || !email || !password) return;

    if (password.length < 6) {

      accountMessage(
        "signupMessage",
        "Password must be at least 6 characters.",
        "error"
      );

      return;
    }

    const button =
      event.target.querySelector("button[type='submit']");

    if (button) button.disabled = true;

    accountMessage(
      "signupMessage",
      "Creating your account..."
    );

    try {

      const { data, error } =
        await supabaseClient.auth.signUp({

          email,
          password,

          options: {
            data: {
              full_name: name
            }
          }

        });

      if (error) throw error;

      if (!data.session) {

        accountMessage(
          "signupMessage",
          "Account created. Check your email to confirm your account, then login.",
          "success"
        );

      } else {

        accountMessage(
          "signupMessage",
          "Account created successfully.",
          "success"
        );

        setTimeout(() => {
          refreshAccountUI();
        }, 500);

      }

    } catch (error) {

      accountMessage(
        "signupMessage",
        error.message || "Could not create account.",
        "error"
      );

    } finally {

      if (button) button.disabled = false;

    }

  }
);


/* =========================================================
   LOGIN
========================================================= */

$("loginForm")?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const email =
      $("loginEmail")?.value.trim();

    const password =
      $("loginPassword")?.value;

    if (!email || !password) return;

    const button =
      event.target.querySelector("button[type='submit']");

    if (button) button.disabled = true;

    accountMessage(
      "loginMessage",
      "Signing you in..."
    );

    try {

      const { error } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

      if (error) throw error;

      accountMessage(
        "loginMessage",
        "Login successful.",
        "success"
      );

      await refreshAccountUI();

    } catch (error) {

      accountMessage(
        "loginMessage",
        error.message || "Login failed.",
        "error"
      );

    } finally {

      if (button) button.disabled = false;

    }

  }
);


/* =========================================================
   FORGOT PASSWORD
========================================================= */

$("forgotForm")?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const email =
      $("forgotEmail")?.value.trim();

    if (!email) return;

    const button =
      event.target.querySelector("button[type='submit']");

    if (button) button.disabled = true;

    accountMessage(
      "forgotMessage",
      "Sending reset link..."
    );

    try {

      const redirectTo =
        window.location.origin +
        window.location.pathname;

      const { error } =
        await supabaseClient.auth.resetPasswordForEmail(
          email,
          {
            redirectTo
          }
        );

      if (error) throw error;

      accountMessage(
        "forgotMessage",
        "Reset link sent. Check your email.",
        "success"
      );

    } catch (error) {

      accountMessage(
        "forgotMessage",
        error.message || "Could not send reset link.",
        "error"
      );

    } finally {

      if (button) button.disabled = false;

    }

  }
);


/* =========================================================
   PASSWORD RESET
========================================================= */

$("resetForm")?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const password =
      $("resetPassword")?.value;

    const confirm =
      $("resetPasswordConfirm")?.value;

    if (password !== confirm) {

      accountMessage(
        "resetMessage",
        "Passwords do not match.",
        "error"
      );

      return;
    }

    if (password.length < 6) {

      accountMessage(
        "resetMessage",
        "Password must be at least 6 characters.",
        "error"
      );

      return;
    }

    const button =
      event.target.querySelector("button[type='submit']");

    if (button) button.disabled = true;

    accountMessage(
      "resetMessage",
      "Updating password..."
    );

    try {

      const { error } =
        await supabaseClient.auth.updateUser({
          password
        });

      if (error) throw error;

      accountMessage(
        "resetMessage",
        "Password updated successfully.",
        "success"
      );

      $("resetForm").reset();

      setTimeout(() => {
        showLogin();
      }, 1200);

    } catch (error) {

      accountMessage(
        "resetMessage",
        error.message || "Could not update password.",
        "error"
      );

    } finally {

      if (button) button.disabled = false;

    }

  }
);


/* =========================================================
   LOGOUT
========================================================= */

$("logoutBtn")?.addEventListener(
  "click",
  async () => {

    const { error } =
      await supabaseClient.auth.signOut();

    if (error) {

      showToast(error.message);

      return;
    }

    showLogin();

    $("loginForm")?.reset();

    showToast("Logged out");

  }
);


/* =========================================================
   ACCOUNT UI
========================================================= */

async function refreshAccountUI() {

  try {

    const {
      data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session?.user) {

      showLogin();

      return;

    }

    const user = session.user;

    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "Customer";

    if ($("accountName")) {
      $("accountName").textContent = name;
    }

    if ($("accountEmail")) {
      $("accountEmail").textContent =
        user.email || "";
    }

    showAccountView("accountLoggedIn");

  } catch {

    showLogin();

  }

}


/* =========================================================
   AUTH STATE
========================================================= */

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    if (event === "PASSWORD_RECOVERY") {

      openOverlay("accountOverlay");

      showAccountView("resetView");

      return;
    }

    if (event === "SIGNED_IN" && session?.user) {

      const name =
        session.user.user_metadata?.full_name ||
        session.user.user_metadata?.name ||
        "Customer";

      if ($("accountName")) {
        $("accountName").textContent = name;
      }

      if ($("accountEmail")) {
        $("accountEmail").textContent =
          session.user.email || "";
      }

      showAccountView("accountLoggedIn");

    }

    if (event === "SIGNED_OUT") {

      showLogin();

    }

  }
);


/* =========================================================
   INITIAL AUTH CHECK
========================================================= */

refreshAccountUI();


/* =========================================================
   CHECKOUT
========================================================= */

$("checkoutBtn")?.addEventListener(
  "click",
  async () => {

    if (!cart.length) {

      showToast("Your bag is empty");

      return;
    }

    const {
      data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session?.user) {

      closeCart();

      openOverlay("accountOverlay");

      showLogin();

      accountMessage(
        "loginMessage",
        "Please login before checkout.",
        "error"
      );

      return;
    }

    openCheckout();

  }
);


function openCheckout() {

  renderCheckout();

  closeCart();

  openOverlay("checkoutOverlay");

}


function renderCheckout() {

  const items = $("checkoutItems");

  if (!items) return;

  const subtotal = cartSubtotal();

  const shipping =
    subtotal >= 1999 ? 0 : 99;

  const total =
    subtotal + shipping;

  items.innerHTML = cart.map(item => {

    const product =
      products.find(p => p.id === item.id);

    if (!product) return "";

    return `
      <div class="checkout-product">
        <span>
          ${product.name} × ${item.quantity}
        </span>

        <span>
          ${money(product.price * item.quantity)}
        </span>
      </div>
    `;

  }).join("");

  if ($("checkoutSubtotal")) {
    $("checkoutSubtotal").textContent =
      money(subtotal);
  }

  if ($("checkoutShipping")) {
    $("checkoutShipping").textContent =
      shipping === 0
        ? "FREE"
        : money(shipping);
  }

  if ($("checkoutTotal")) {
    $("checkoutTotal").textContent =
      money(total);
  }

}


$("closeCheckout")?.addEventListener(
  "click",
  () => closeOverlay("checkoutOverlay")
);


/* =========================================================
   CHECKOUT FORM
========================================================= */

$("checkoutForm")?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    if (!cart.length) {

      showToast("Your bag is empty");

      return;
    }

    const button =
      event.target.querySelector("button[type='submit']");

    if (button) button.disabled = true;

    if (button) {
      button.innerHTML = "PROCESSING...";
    }

    /*
      RAZORPAY NOT ADDED YET.

      Real Razorpay payments should be created and verified
      through a backend/server. Do not put Razorpay secret
      keys inside this frontend file.
    */

    setTimeout(() => {

      cart = [];

      saveCart();

      updateCart();

      closeOverlay("checkoutOverlay");

      if ($("checkoutForm")) {
        $("checkoutForm").reset();
      }

      showToast(
        "Order details received. Payment integration coming next."
      );

      if (button) {
        button.disabled = false;
        button.innerHTML = "PLACE ORDER <span>↗</span>";
      }

    }, 900);

  }
);


/* =========================================================
   NEWSLETTER
========================================================= */

$("newsletterForm")?.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    const input =
      event.target.querySelector("input");

    if (!input?.value) return;

    showToast("You're on the list ✓");

    event.target.reset();

  }
);


/* =========================================================
   SCROLL HEADER
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    const header = $("header");

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  },
  { passive: true }
);


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function initReveal() {

  const elements =
    document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {

    elements.forEach(el =>
      el.classList.add("visible")
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  elements.forEach(el =>
    observer.observe(el)
  );

}

initReveal();


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

document.addEventListener("mousemove", (event) => {

  const button =
    event.target.closest(".btn");

  if (!button) return;

  const rect =
    button.getBoundingClientRect();

  const x =
    event.clientX -
    (rect.left + rect.width / 2);

  const y =
    event.clientY -
    (rect.top + rect.height / 2);

  button.style.transform =
    `translate(${x * 0.06}px, ${y * 0.06}px)`;

});


document.addEventListener("mouseleave", () => {

  document
    .querySelectorAll(".btn")
    .forEach(button => {
      button.style.transform = "";
    });

});


/* =========================================================
   COUNTDOWN
========================================================= */

const dropDate =
  new Date(
    Date.now() +
    7 * 24 * 60 * 60 * 1000
  );


function updateCountdown() {

  const now = new Date();

  let difference =
    dropDate.getTime() -
    now.getTime();

  if (difference < 0) {
    difference = 0;
  }

  const days =
    Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

  const hours =
    Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

  const minutes =
    Math.floor(
      (difference / (1000 * 60)) % 60
    );

  const seconds =
    Math.floor(
      (difference / 1000) % 60
    );

  if ($("days")) {
    $("days").textContent =
      String(days).padStart(2, "0");
  }

  if ($("hours")) {
    $("hours").textContent =
      String(hours).padStart(2, "0");
  }

  if ($("minutes")) {
    $("minutes").textContent =
      String(minutes).padStart(2, "0");
  }

  if ($("seconds")) {
    $("seconds").textContent =
      String(seconds).padStart(2, "0");
  }

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   OVERLAY CLICK + ESCAPE
========================================================= */

document.querySelectorAll(".overlay").forEach(
  overlay => {

    overlay.addEventListener(
      "click",
      event => {

        if (event.target === overlay) {

          overlay.classList.remove("open");

          if (
            !document.querySelector(".cart-drawer.open")
          ) {
            document.body.classList.remove(
              "no-scroll"
            );
          }

        }

      }
    );

  }
);


document.addEventListener("keydown", event => {

  if (event.key !== "Escape") return;

  document
    .querySelectorAll(".overlay.open")
    .forEach(overlay => {
      overlay.classList.remove("open");
    });

  closeCart();

  document.body.classList.remove("no-scroll");

});


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    $("loader")?.classList.add("hide");

  }, 500);

});