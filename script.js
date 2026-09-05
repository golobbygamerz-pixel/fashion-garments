/* =========================================
   FASHION GARMENTS
   E-COMMERCE ENGINE + SUPABASE AUTH
========================================= */


/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
  "https://llehrynfkntrvndbqwsn.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_RiKV4zUAposqKWbtbMr9IQ_M9cT5Zcy";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================================
   PRODUCTS
========================================= */

const products = [

  {
    id: 1,
    name: "Essential Oversized Tee",
    category: "Oversized",
    price: 1499,
    oldPrice: 1899,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    description:
      "Heavyweight everyday tee with a relaxed oversized silhouette."
  },

  {
    id: 2,
    name: "Studio Cream Tee",
    category: "T-Shirts",
    price: 1299,
    oldPrice: null,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85",
    description:
      "Clean minimal tee crafted for everyday styling."
  },

  {
    id: 3,
    name: "Archive Grey Hoodie",
    category: "Hoodies",
    price: 2499,
    oldPrice: 2999,
    badge: "DROP 01",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
    description:
      "Premium heavyweight hoodie with an effortless relaxed fit."
  },

  {
    id: 4,
    name: "Form Oversized Shirt",
    category: "Oversized",
    price: 2199,
    oldPrice: null,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85",
    description:
      "Contemporary oversized shirt designed for layered looks."
  },

  {
    id: 5,
    name: "Essential Black Tee",
    category: "T-Shirts",
    price: 1299,
    oldPrice: null,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
    description:
      "A clean black essential with a premium everyday fit."
  },

  {
    id: 6,
    name: "Washed Street Hoodie",
    category: "Hoodies",
    price: 2699,
    oldPrice: null,
    badge: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
    description:
      "Washed finish, relaxed proportions and everyday comfort."
  },

  {
    id: 7,
    name: "Daily Boxy Tee",
    category: "T-Shirts",
    price: 1399,
    oldPrice: null,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85",
    description:
      "Boxy contemporary tee built for modern everyday wardrobes."
  },

  {
    id: 8,
    name: "Relaxed Signature Hoodie",
    category: "Hoodies",
    price: 2899,
    oldPrice: 3299,
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=85",
    description:
      "Soft premium hoodie with signature relaxed proportions."
  }

];


/* =========================================
   STATE
========================================= */

let cart =
  JSON.parse(
    localStorage.getItem("thriftyCart")
  ) || [];

let wishlist =
  JSON.parse(
    localStorage.getItem("thriftyWishlist")
  ) || [];

let activeFilter = "All";

let currentSession = null;


/* =========================================
   DOM
========================================= */

const shopProducts =
  document.getElementById("shopProducts");

const newProducts =
  document.getElementById("newProducts");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartBackdrop =
  document.getElementById("cartBackdrop");

const cartItems =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const cartCount =
  document.getElementById("cartCount");

const wishlistCount =
  document.getElementById("wishlistCount");

const toast =
  document.getElementById("toast");

const searchOverlay =
  document.getElementById("searchOverlay");

const productOverlay =
  document.getElementById("productOverlay");

const accountOverlay =
  document.getElementById("accountOverlay");

const checkoutOverlay =
  document.getElementById("checkoutOverlay");


/* =========================================
   MONEY
========================================= */

function money(value) {

  return "₹" +
    value.toLocaleString("en-IN");

}


/* =========================================
   SAVE STATE
========================================= */

function saveState() {

  localStorage.setItem(
    "thriftyCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "thriftyWishlist",
    JSON.stringify(wishlist)
  );

}


/* =========================================
   PRODUCT CARD
========================================= */

function productCard(product) {

  const liked =
    wishlist.includes(product.id);

  return `

    <article class="product-card reveal">

      <div
        class="product-image"
        onclick="openProduct(${product.id})"
      >

        ${
          product.badge
            ? `<span class="product-badge">
                ${product.badge}
              </span>`
            : ""
        }

        <button
          class="wishlist-heart ${liked ? "active" : ""}"
          onclick="
            event.stopPropagation();
            toggleWishlist(${product.id});
          "
        >
          ${liked ? "♥" : "♡"}
        </button>

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <button
          class="quick-add"
          onclick="
            event.stopPropagation();
            addToCart(${product.id});
          "
        >
          ADD TO BAG +
        </button>

      </div>

      <div class="product-info">

        <h3>
          ${product.name}
        </h3>

        <div class="product-meta">

          <span>
            ${product.category}
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


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {

  let list =
    [...products];

  if (activeFilter !== "All") {

    list =
      list.filter(
        p =>
          p.category ===
          activeFilter
      );

  }

  const sortSelect =
    document.getElementById(
      "sortSelect"
    );

  if (sortSelect) {

    const sort =
      sortSelect.value;

    if (sort === "low") {

      list.sort(
        (a, b) =>
          a.price - b.price
      );

    }

    if (sort === "high") {

      list.sort(
        (a, b) =>
          b.price - a.price
      );

    }

  }

  if (shopProducts) {

    shopProducts.innerHTML =
      list.map(productCard).join("");

  }

  if (newProducts) {

    newProducts.innerHTML =
      products
        .slice(0, 4)
        .map(productCard)
        .join("");

  }

  observeReveal();

}


/* =========================================
   WISHLIST
========================================= */

function toggleWishlist(id) {

  if (
    wishlist.includes(id)
  ) {

    wishlist =
      wishlist.filter(
        item => item !== id
      );

    showToast(
      "Removed from wishlist"
    );

  } else {

    wishlist.push(id);

    showToast(
      "Added to wishlist"
    );

  }

  saveState();

  if (wishlistCount) {

    wishlistCount.textContent =
      wishlist.length;

  }

  renderProducts();

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(
  id,
  size = "M"
) {

  const product =
    products.find(
      p => p.id === id
    );

  if (!product) return;

  const existing =
    cart.find(
      item =>
        item.id === id &&
        item.size === size
    );

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id,
      size,
      quantity: 1
    });

  }

  saveState();

  updateCart();

  showToast(
    `${product.name} added to your bag`
  );

  openCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

  const quantity =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  if (cartCount) {

    cartCount.textContent =
      quantity;

  }

  if (!cartItems) return;

  if (!cart.length) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <div>

          <strong>
            Your bag is empty.
          </strong>

          <p>
            Find something you love.
          </p>

        </div>

      </div>

    `;

    if (cartTotal) {

      cartTotal.textContent =
        "₹0";

    }

    updateShipping(0);

    return;

  }

  let total = 0;

  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return "";

      const itemTotal =
        product.price *
        item.quantity;

      total += itemTotal;

      return `

        <div class="cart-item">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

          <div>

            <h4>
              ${product.name}
            </h4>

            <small>
              Size: ${item.size}
            </small>

            <div class="quantity">

              <button
                onclick="
                  changeQuantity(
                    ${item.id},
                    '${item.size}',
                    -1
                  )
                "
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                onclick="
                  changeQuantity(
                    ${item.id},
                    '${item.size}',
                    1
                  )
                "
              >
                +
              </button>

            </div>

            <button
              class="remove"
              onclick="
                removeFromCart(
                  ${item.id},
                  '${item.size}'
                )
              "
            >
              Remove
            </button>

          </div>

          <strong>
            ${money(itemTotal)}
          </strong>

        </div>

      `;

    }).join("");

  if (cartTotal) {

    cartTotal.textContent =
      money(total);

  }

  updateShipping(total);

}


/* =========================================
   QUANTITY
========================================= */

function changeQuantity(
  id,
  size,
  amount
) {

  const item =
    cart.find(
      item =>
        item.id === id &&
        item.size === size
    );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item =>
          !(
            item.id === id &&
            item.size === size
          )
      );

  }

  saveState();

  updateCart();

}


/* =========================================
   REMOVE CART
========================================= */

function removeFromCart(
  id,
  size
) {

  cart =
    cart.filter(
      item =>
        !(
          item.id === id &&
          item.size === size
        )
    );

  saveState();

  updateCart();

  showToast(
    "Removed from bag"
  );

}


/* =========================================
   SHIPPING
========================================= */

function updateShipping(total) {

  const target = 1999;

  const progress =
    Math.min(
      (total / target) * 100,
      100
    );

  const progressElement =
    document.getElementById(
      "shippingProgress"
    );

  const message =
    document.getElementById(
      "shippingMessage"
    );

  if (progressElement) {

    progressElement.style.width =
      progress + "%";

  }

  if (message) {

    if (total >= target) {

      message.textContent =
        "🎉 You unlocked FREE shipping!";

    } else {

      message.textContent =
        `Add ${money(target - total)} more for FREE shipping.`;

    }

  }

}


/* =========================================
   CART OPEN / CLOSE
========================================= */

function openCart() {

  if (!cartDrawer) return;

  cartDrawer.classList.add("open");

  cartBackdrop.classList.add("open");

  document.body.classList.add(
    "no-scroll"
  );

}


function closeCart() {

  if (!cartDrawer) return;

  cartDrawer.classList.remove("open");

  cartBackdrop.classList.remove("open");

  document.body.classList.remove(
    "no-scroll"
  );

}


document
  .getElementById("cartBtn")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


cartBackdrop.addEventListener(
  "click",
  closeCart
);


/* =========================================
   PRODUCT MODAL
========================================= */

function openProduct(id) {

  const product =
    products.find(
      p => p.id === id
    );

  if (!product) return;

  productOverlay.classList.add(
    "open"
  );

  document
    .getElementById(
      "productModalContent"
    )
    .innerHTML = `

      <div class="product-modal-content">

        <div class="modal-product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
          >

        </div>


        <div class="modal-product-info">

          <p class="eyebrow">
            ${product.category}
          </p>

          <h2>
            ${product.name}
          </h2>

          <div class="modal-price">
            ${money(product.price)}
          </div>

          <p class="modal-description">
            ${product.description}
          </p>

          <div class="size-title">
            SELECT SIZE
          </div>

          <div class="sizes">

            <button
              class="size-btn"
              data-size="S"
            >
              S
            </button>

            <button
              class="size-btn active"
              data-size="M"
            >
              M
            </button>

            <button
              class="size-btn"
              data-size="L"
            >
              L
            </button>

            <button
              class="size-btn"
              data-size="XL"
            >
              XL
            </button>

          </div>

          <button
            class="btn btn-dark full"
            id="modalAdd"
          >
            Add to Bag
            <span>→</span>
          </button>

        </div>

      </div>

    `;


  let selectedSize = "M";


  document
    .querySelectorAll(".size-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".size-btn"
            )
            .forEach(
              b =>
                b.classList.remove(
                  "active"
                )
            );

          button.classList.add(
            "active"
          );

          selectedSize =
            button.dataset.size;

        }
      );

    });


  document
    .getElementById("modalAdd")
    .addEventListener(
      "click",
      () => {

        addToCart(
          product.id,
          selectedSize
        );

        productOverlay.classList.remove(
          "open"
        );

      }
    );

}


document
  .getElementById("closeProduct")
  .addEventListener(
    "click",
    () => {

      productOverlay.classList.remove(
        "open"
      );

    }
  );


/* =========================================
   SEARCH
========================================= */

document
  .getElementById("searchBtn")
  .addEventListener(
    "click",
    () => {

      searchOverlay.classList.add(
        "open"
      );

      setTimeout(
        () =>
          document
            .getElementById(
              "searchInput"
            )
            .focus(),
        300
      );

    }
  );


document
  .getElementById("closeSearch")
  .addEventListener(
    "click",
    () => {

      searchOverlay.classList.remove(
        "open"
      );

    }
  );


document
  .getElementById("searchInput")
  .addEventListener(
    "input",
    e => {

      const value =
        e.target.value
          .toLowerCase()
          .trim();

      const resultsElement =
        document.getElementById(
          "searchResults"
        );

      if (!value) {

        resultsElement.innerHTML =
          "";

        return;

      }

      const results =
        products.filter(
          product =>
            product.name
              .toLowerCase()
              .includes(value) ||

            product.category
              .toLowerCase()
              .includes(value)
        );

      resultsElement.innerHTML =
        results.length

          ? results.map(
              product => `

                <div
                  class="search-result"
                  onclick="
                    openProduct(${product.id});
                    searchOverlay.classList.remove('open');
                  "
                >

                  <img
                    src="${product.image}"
                    alt="${product.name}"
                  >

                  <div>

                    <strong>
                      ${product.name}
                    </strong>

                    <p>
                      ${money(product.price)}
                    </p>

                  </div>

                </div>

              `
            ).join("")

          : `<p>No products found.</p>`;

    }
  );


/* =========================================
   ACCOUNT MODAL
========================================= */

function openAccount() {

  accountOverlay.classList.add(
    "open"
  );

  if (currentSession) {

    showAccountView(
      "accountLoggedIn"
    );

  } else {

    showAccountView(
      "loginView"
    );

  }

}


document
  .getElementById("accountBtn")
  .addEventListener(
    "click",
    openAccount
  );


document
  .getElementById("mobileAccount")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "mobileMenu"
        )
        .classList.remove(
          "open"
        );

      openAccount();

    }
  );


document
  .getElementById("closeAccount")
  .addEventListener(
    "click",
    () => {

      accountOverlay.classList.remove(
        "open"
      );

    }
  );


/* =========================================
   ACCOUNT VIEWS
========================================= */

function showAccountView(
  viewId
) {

  document
    .querySelectorAll(
      ".account-view"
    )
    .forEach(view => {

      view.hidden =
        view.id !== viewId;

    });

}


/* =========================================
   ACCOUNT MESSAGE
========================================= */

function setMessage(
  elementId,
  message,
  type = ""
) {

  const element =
    document.getElementById(
      elementId
    );

  if (!element) return;

  element.textContent =
    message;

  element.className =
    "account-message";

  if (type) {

    element.classList.add(
      type
    );

  }

}


/* =========================================
   LOADING BUTTON
========================================= */

function setButtonLoading(
  button,
  loading,
  loadingText,
  normalText
) {

  if (!button) return;

  button.disabled =
    loading;

  button.textContent =
    loading
      ? loadingText
      : normalText;

}


/* =========================================
   SHOW SIGNUP
========================================= */

document
  .getElementById(
    "showSignupBtn"
  )
  .addEventListener(
    "click",
    () => {

      showAccountView(
        "signupView"
      );

      setMessage(
        "loginMessage",
        ""
      );

    }
  );


/* =========================================
   SHOW LOGIN
========================================= */

document
  .getElementById(
    "showLoginBtn"
  )
  .addEventListener(
    "click",
    () => {

      showAccountView(
        "loginView"
      );

      setMessage(
        "signupMessage",
        ""
      );

    }
  );


/* =========================================
   FORGOT PASSWORD
========================================= */

document
  .getElementById(
    "forgotPasswordBtn"
  )
  .addEventListener(
    "click",
    () => {

      const loginEmail =
        document.getElementById(
          "loginEmail"
        ).value.trim();

      document
        .getElementById(
          "forgotEmail"
        ).value =
        loginEmail;

      showAccountView(
        "forgotView"
      );

      setMessage(
        "forgotMessage",
        ""
      );

    }
  );


document
  .getElementById(
    "backToLoginBtn"
  )
  .addEventListener(
    "click",
    () => {

      showAccountView(
        "loginView"
      );

      setMessage(
        "forgotMessage",
        ""
      );

    }
  );


/* =========================================
   REAL LOGIN
========================================= */

document
  .getElementById("loginForm")
  .addEventListener(
    "submit",
    async e => {

      e.preventDefault();

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

      const button =
        document.getElementById(
          "loginSubmit"
        );


      setMessage(
        "loginMessage",
        ""
      );

      setButtonLoading(
        button,
        true,
        "Logging in...",
        "Login ↗"
      );


      try {

        const {
          data,
          error
        } =
          await supabaseClient.auth
            .signInWithPassword({

              email,
              password

            });


        if (error) {

          throw error;

        }


        currentSession =
          data.session;


        updateAccountUI(
          currentSession
        );


        showToast(
          "Welcome back ✦"
        );


        accountOverlay.classList.remove(
          "open"
        );


        document
          .getElementById(
            "loginForm"
          )
          .reset();


      } catch (error) {

        setMessage(
          "loginMessage",
          getAuthErrorMessage(
            error
          ),
          "error"
        );

      } finally {

        setButtonLoading(
          button,
          false,
          "Logging in...",
          "Login ↗"
        );

      }

    }
  );


/* =========================================
   REAL SIGNUP
========================================= */

document
  .getElementById("signupForm")
  .addEventListener(
    "submit",
    async e => {

      e.preventDefault();

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

      const button =
        document.getElementById(
          "signupSubmit"
        );


      setMessage(
        "signupMessage",
        ""
      );


      if (password.length < 6) {

        setMessage(
          "signupMessage",
          "Password must be at least 6 characters.",
          "error"
        );

        return;

      }


      setButtonLoading(
        button,
        true,
        "Creating...",
        "Create Account ↗"
      );


      try {

        const {
          data,
          error
        } =
          await supabaseClient.auth
            .signUp({

              email,
              password,

              options: {

                data: {

                  full_name:
                    name

                }

              }

            });


        if (error) {

          throw error;

        }


        if (
          data.session
        ) {

          currentSession =
            data.session;

          updateAccountUI(
            currentSession
          );

          showToast(
            "Account created ✦"
          );

          accountOverlay.classList.remove(
            "open"
          );

        } else {

          setMessage(
            "signupMessage",
            "Account created. Check your email to confirm your account, then log in.",
            "success"
          );

        }


      } catch (error) {

        setMessage(
          "signupMessage",
          getAuthErrorMessage(
            error
          ),
          "error"
        );

      } finally {

        setButtonLoading(
          button,
          false,
          "Creating...",
          "Create Account ↗"
        );

      }

    }
  );


/* =========================================
   FORGOT PASSWORD
========================================= */

document
  .getElementById("forgotForm")
  .addEventListener(
    "submit",
    async e => {

      e.preventDefault();

      const email =
        document
          .getElementById(
            "forgotEmail"
          )
          .value
          .trim();

      const button =
        document.getElementById(
          "forgotSubmit"
        );


      setMessage(
        "forgotMessage",
        ""
      );


      setButtonLoading(
        button,
        true,
        "Sending...",
        "Send Reset Link ↗"
      );


      try {

        const redirectUrl =
          window.location.origin +
          window.location.pathname;


        const {
          error
        } =
          await supabaseClient.auth
            .resetPasswordForEmail(
              email,
              {
                redirectTo:
                  redirectUrl
              }
            );


        if (error) {

          throw error;

        }


        setMessage(
          "forgotMessage",
          "Reset link sent. Check your email and follow the link to create a new password.",
          "success"
        );


      } catch (error) {

        setMessage(
          "forgotMessage",
          getAuthErrorMessage(
            error
          ),
          "error"
        );

      } finally {

        setButtonLoading(
          button,
          false,
          "Sending...",
          "Send Reset Link ↗"
        );

      }

    }
  );


/* =========================================
   RESET PASSWORD
========================================= */

document
  .getElementById("resetForm")
  .addEventListener(
    "submit",
    async e => {

      e.preventDefault();

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


      if (
        password.length < 6
      ) {

        setMessage(
          "resetMessage",
          "Password must be at least 6 characters.",
          "error"
        );

        return;

      }


      try {

        const {
          error
        } =
          await supabaseClient.auth
            .updateUser({

              password

            });


        if (error) {

          throw error;

        }


        setMessage(
          "resetMessage",
          "Password updated successfully. You can now log in with your new password.",
          "success"
        );


        document
          .getElementById(
            "resetForm"
          )
          .reset();


        setTimeout(
          async () => {

            await supabaseClient.auth
              .signOut();

            currentSession =
              null;

            showAccountView(
              "loginView"
            );

          },
          1800
        );


      } catch (error) {

        setMessage(
          "resetMessage",
          getAuthErrorMessage(
            error
          ),
          "error"
        );

      }

    }
  );


/* =========================================
   LOGOUT
========================================= */

document
  .getElementById("logoutBtn")
  .addEventListener(
    "click",
    async () => {

      const {
        error
      } =
        await supabaseClient.auth
          .signOut();


      if (error) {

        showToast(
          "Unable to logout"
        );

        return;

      }


      currentSession =
        null;


      showAccountView(
        "loginView"
      );


      document
        .getElementById(
          "loginForm"
        )
        .reset();


      showToast(
        "Logged out successfully"
      );

    }
  );


/* =========================================
   UPDATE ACCOUNT UI
========================================= */

function updateAccountUI(
  session
) {

  currentSession =
    session || null;


  if (!session) {

    showAccountView(
      "loginView"
    );

    return;

  }


  const user =
    session.user;


  const metadata =
    user.user_metadata || {};


  const name =
    metadata.full_name ||
    metadata.name ||
    "Customer";


  const email =
    user.email ||
    "";


  const accountName =
    document.getElementById(
      "accountName"
    );

  const accountEmail =
    document.getElementById(
      "accountEmail"
    );


  if (accountName) {

    accountName.textContent =
      name;

  }


  if (accountEmail) {

    accountEmail.textContent =
      email;

  }


  showAccountView(
    "accountLoggedIn"
  );

}


/* =========================================
   AUTH ERROR HANDLER
========================================= */

function getAuthErrorMessage(
  error
) {

  const message =
    error?.message ||
    "Something went wrong. Please try again.";


  if (
    message
      .toLowerCase()
      .includes(
        "invalid login credentials"
      )
  ) {

    return "Incorrect email or password.";

  }


  if (
    message
      .toLowerCase()
      .includes(
        "email not confirmed"
      )
  ) {

    return "Please confirm your email before logging in.";

  }


  if (
    message
      .toLowerCase()
      .includes(
        "user already registered"
      )
  ) {

    return "This email is already registered. Try logging in.";

  }


  return message;

}


/* =========================================
   SUPABASE SESSION
========================================= */

async function initializeAuth() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth
        .getSession();


    if (error) {

      console.error(
        "Supabase session error:",
        error
      );

      return;

    }


    currentSession =
      data.session;


    updateAccountUI(
      currentSession
    );


  } catch (error) {

    console.error(
      "Auth initialization error:",
      error
    );

  }


  supabaseClient.auth
    .onAuthStateChange(
      (event, session) => {

        currentSession =
          session;


        if (
          event ===
          "PASSWORD_RECOVERY"
        ) {

          accountOverlay.classList.add(
            "open"
          );

          showAccountView(
            "resetView"
          );

          return;

        }


        updateAccountUI(
          session
        );

      }
    );

}


/* =========================================
   CHECKOUT
========================================= */

document
  .getElementById(
    "checkoutBtn"
  )
  .addEventListener(
    "click",
    () => {

      if (!cart.length) {

        showToast(
          "Your bag is empty"
        );

        return;

      }


      closeCart();

      renderCheckout();

      checkoutOverlay.classList.add(
        "open"
      );

    }
  );


/* =========================================
   RENDER CHECKOUT
========================================= */

function renderCheckout() {

  let total = 0;


  const checkoutItems =
    document.getElementById(
      "checkoutItems"
    );


  checkoutItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return "";

      const subtotal =
        product.price *
        item.quantity;


      total += subtotal;


      return `

        <div class="checkout-product">

          <span>
            ${product.name}
            × ${item.quantity}
          </span>

          <strong>
            ${money(subtotal)}
          </strong>

        </div>

      `;

    }).join("");


  document
    .getElementById(
      "checkoutSubtotal"
    )
    .textContent =
    money(total);


  document
    .getElementById(
      "checkoutTotal"
    )
    .textContent =
    money(total);

}


/* =========================================
   CLOSE CHECKOUT
========================================= */

document
  .getElementById(
    "closeCheckout"
  )
  .addEventListener(
    "click",
    () => {

      checkoutOverlay.classList.remove(
        "open"
      );

    }
  );


/* =========================================
   CHECKOUT DEMO
========================================= */

document
  .getElementById(
    "checkoutForm"
  )
  .addEventListener(
    "submit",
    e => {

      e.preventDefault();


      document
        .getElementById(
          "checkoutContent"
        )
        .innerHTML = `

          <div
            style="
              text-align:center;
              padding:80px 10px;
            "
          >

            <div
              style="
                font-size:50px;
                margin-bottom:20px;
              "
            >
              ✓
            </div>

            <p class="eyebrow">
              ORDER RECEIVED
            </p>

            <h2>
              You're officially<br>
              <em>FASHION GARMENTS.</em>
            </h2>

            <p
              style="
                color:#777;
                max-width:400px;
                margin:20px auto 30px;
                line-height:1.7;
                font-size:13px;
              "
            >
              Your order has been received.
              Payment gateway integration can
              be connected separately for live payments.
            </p>

            <button
              class="btn btn-dark"
              onclick="location.reload()"
            >
              Continue Shopping ↗
            </button>

          </div>

        `;


      cart = [];

      saveState();

      updateCart();

    }
  );


/* =========================================
   FILTERS
========================================= */

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".filter"
          )
          .forEach(
            b =>
              b.classList.remove(
                "active"
              )
          );


        button.classList.add(
          "active"
        );


        activeFilter =
          button.dataset.filter;


        renderProducts();

      }
    );

  });


/* =========================================
   SORT
========================================= */

document
  .getElementById(
    "sortSelect"
  )
  .addEventListener(
    "change",
    renderProducts
  );


/* =========================================
   CATEGORIES
========================================= */

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


        activeFilter =
          category;


        document
          .querySelectorAll(
            ".filter"
          )
          .forEach(
            button => {

              button.classList.toggle(
                "active",
                button.dataset.filter ===
                  category
              );

            }
          );


        document
          .getElementById(
            "shop"
          )
          .scrollIntoView({
            behavior: "smooth"
          });


        renderProducts();

      }
    );

  });


/* =========================================
   SCROLL TO SHOP
========================================= */

function scrollToShop() {

  document
    .getElementById("shop")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================
   MOBILE MENU
========================================= */

document
  .getElementById(
    "mobileMenuBtn"
  )
  .addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "mobileMenu"
        )
        .classList.toggle(
          "open"
        );

    }
  );


/* =========================================
   NEWSLETTER
========================================= */

document
  .getElementById(
    "newsletterForm"
  )
  .addEventListener(
    "submit",
    e => {

      e.preventDefault();

      showToast(
        "You're on the list ✦"
      );

      e.target.reset();

    }
  );


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(
  message
) {

  if (!toast) return;

  toast
    .querySelector("p")
    .textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () =>
        toast.classList.remove(
          "show"
        ),
      2500
    );

}


/* =========================================
   HEADER SCROLL
========================================= */

window.addEventListener(
  "scroll",
  () => {

    const header =
      document.getElementById(
        "header"
      );

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  }
);


/* =========================================
   REVEAL ANIMATION
========================================= */

function observeReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal:not(.observed)"
    );


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

              entry.target.classList.add(
                "observed"
              );

            }

          }
        );

      },
      {
        threshold: .12
      }
    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* =========================================
   MAGNETIC BUTTONS
========================================= */

document.addEventListener(
  "mousemove",
  e => {

    document
      .querySelectorAll(
        ".magnetic"
      )
      .forEach(button => {

        const rect =
          button.getBoundingClientRect();


        const x =
          e.clientX -
          rect.left -
          rect.width / 2;


        const y =
          e.clientY -
          rect.top -
          rect.height / 2;


        if (
          Math.abs(x) <
            rect.width &&
          Math.abs(y) <
            rect.height
        ) {

          button.style.transform =
            `translate(${x * .08}px,${y * .08}px)`;

        } else {

          button.style.transform =
            "";

        }

      });

  }
);


/* =========================================
   COUNTDOWN
========================================= */

let dropEnd =
  Date.now() +
  (((4 * 24) + 12) *
    60 *
    60 *
    1000);


function updateCountdown() {

  const distance =
    dropEnd -
    Date.now();


  if (
    distance <= 0
  ) return;


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (
        distance /
        (1000 * 60 * 60)
      ) % 24
    );


  const minutes =
    Math.floor(
      (
        distance /
        (1000 * 60)
      ) % 60
    );


  const seconds =
    Math.floor(
      (
        distance /
        1000
      ) % 60
    );


  const daysElement =
    document.getElementById(
      "days"
    );

  const hoursElement =
    document.getElementById(
      "hours"
    );

  const minutesElement =
    document.getElementById(
      "minutes"
    );

  const secondsElement =
    document.getElementById(
      "seconds"
    );


  if (daysElement) {

    daysElement.textContent =
      String(days)
        .padStart(2, "0");

  }


  if (hoursElement) {

    hoursElement.textContent =
      String(hours)
        .padStart(2, "0");

  }


  if (minutesElement) {

    minutesElement.textContent =
      String(minutes)
        .padStart(2, "0");

  }


  if (secondsElement) {

    secondsElement.textContent =
      String(seconds)
        .padStart(2, "0");

  }

}


setInterval(
  updateCountdown,
  1000
);


/* =========================================
   OVERLAY CLICK
========================================= */

[
  searchOverlay,
  productOverlay,
  accountOverlay,
  checkoutOverlay
].forEach(
  overlay => {

    overlay.addEventListener(
      "click",
      e => {

        if (
          e.target ===
          overlay
        ) {

          overlay.classList.remove(
            "open"
          );

        }

      }
    );

  }
);


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
  "keydown",
  e => {

    if (
      e.key !== "Escape"
    ) return;


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


/* =========================================
   INITIALIZE
========================================= */

window.addEventListener(
  "load",
  async () => {

    setTimeout(
      () => {

        const loader =
          document.getElementById(
            "loader"
          );

        if (loader) {

          loader.classList.add(
            "hide"
          );

        }

      },
      800
    );


    wishlistCount.textContent =
      wishlist.length;


    updateCart();

    renderProducts();

    observeReveal();

    updateCountdown();

    await initializeAuth();

  }
);