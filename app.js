const products = [
  {
    id: "whey",
    name: "Whey Isolate 90",
    category: "Протеїн",
    weight: "900 г",
    price: 1890,
    flavor: "Ваніль",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc298c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "casein",
    name: "Night Casein",
    category: "Протеїн",
    weight: "750 г",
    price: 1640,
    flavor: "Шоколад",
    image:
      "https://images.unsplash.com/photo-1579722820308-d74e571700a3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gainer",
    name: "Mass Architect",
    category: "Гейнер",
    weight: "2 кг",
    price: 2190,
    flavor: "Печиво",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "creatine",
    name: "Creatine Mono",
    category: "Креатин",
    weight: "300 г",
    price: 690,
    flavor: "Без смаку",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bcaa",
    name: "BCAA 2:1:1",
    category: "Амінокислоти",
    weight: "400 г",
    price: 980,
    flavor: "Лайм",
    image:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pre",
    name: "Pulse Pre-Workout",
    category: "Передтреник",
    weight: "300 г",
    price: 1290,
    flavor: "Енергетик",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "omega",
    name: "Omega-3 Ultra",
    category: "БАДи",
    weight: "120 капс.",
    price: 790,
    flavor: "Риб’ячий жир",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "multi",
    name: "Daily Multi",
    category: "БАДи",
    weight: "90 таб.",
    price: 540,
    flavor: "Комплекс",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "d3",
    name: "Vitamin D3 5000",
    category: "БАДи",
    weight: "60 капс.",
    price: 390,
    flavor: "D3 + K2",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8705?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "collagen",
    name: "Collagen Peptides",
    category: "БАДи",
    weight: "500 г",
    price: 1120,
    flavor: "Нейтральний",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "zinc",
    name: "ZMA Night",
    category: "БАДи",
    weight: "90 капс.",
    price: 470,
    flavor: "Цинк + магній",
    image:
      "https://images.unsplash.com/photo-1584017913487-ebf4b1c0d2f0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "electro",
    name: "Hydra Electrolytes",
    category: "Відновлення",
    weight: "20 стіків",
    price: 430,
    flavor: "Цитрус",
    image:
      "https://images.unsplash.com/photo-1553531889-56cc480ac5cb?auto=format&fit=crop&w=900&q=80",
  },
];

const qtyState = Object.fromEntries(products.map((p) => [p.id, 1]));
let activeCategory = "Усі";
let checkoutProduct = null;

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const overlay = document.getElementById("overlay");
const success = document.getElementById("success");

const formatUah = (value) =>
  new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(value);

const categories = ["Усі", ...new Set(products.map((p) => p.category))];

function renderFilters() {
  filters.innerHTML = categories
    .map(
      (cat) =>
        `<button class="chip ${cat === activeCategory ? "active" : ""}" data-cat="${cat}">${cat}</button>`
    )
    .join("");
}

function renderGrid() {
  const list =
    activeCategory === "Усі"
      ? products
      : products.filter((p) => p.category === activeCategory);

  grid.innerHTML = list
    .map((p) => {
      const qty = qtyState[p.id];
      return `
        <article class="card">
          <img src="${p.image}" alt="${p.name}" />
          <div class="card-body">
            <p class="meta">${p.category} · ${p.weight}</p>
            <h3>${p.name}</h3>
            <p class="meta">${p.flavor}</p>
            <p class="price">${formatUah(p.price)}</p>
            <div class="card-footer">
              <div class="qty">
                <button type="button" data-delta="-1" data-id="${p.id}">−</button>
                <span>${qty}</span>
                <button type="button" data-delta="1" data-id="${p.id}">+</button>
              </div>
              <button class="buy" data-buy="${p.id}">Купити</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function openCheckout(id) {
  checkoutProduct = products.find((p) => p.id === id);
  document.getElementById("checkoutImage").src = checkoutProduct.image;
  document.getElementById("checkoutImage").alt = checkoutProduct.name;
  document.getElementById("checkoutCategory").textContent =
    checkoutProduct.category;
  document.getElementById("checkoutName").textContent = checkoutProduct.name;
  document.getElementById("checkoutWeight").textContent =
    `${checkoutProduct.weight} · ${checkoutProduct.flavor}`;
  updateCheckoutTotals();
  overlay.classList.add("is-open");
}

function updateCheckoutTotals() {
  if (!checkoutProduct) return;
  const qty = qtyState[checkoutProduct.id];
  document.getElementById("checkoutQty").textContent = qty;
  document.getElementById("checkoutTotal").textContent = formatUah(
    checkoutProduct.price * qty
  );
}

filters.addEventListener("click", (e) => {
  const cat = e.target.dataset.cat;
  if (!cat) return;
  activeCategory = cat;
  renderFilters();
  renderGrid();
});

grid.addEventListener("click", (e) => {
  const delta = Number(e.target.dataset.delta);
  const id = e.target.dataset.id;
  const buyId = e.target.dataset.buy;

  if (id && delta) {
    qtyState[id] = Math.max(1, Math.min(20, qtyState[id] + delta));
    renderGrid();
  }

  if (buyId) openCheckout(buyId);
});

overlay.addEventListener("click", (e) => {
  const delta = Number(e.target.dataset.checkoutDelta);
  if (delta && checkoutProduct) {
    qtyState[checkoutProduct.id] = Math.max(
      1,
      Math.min(20, qtyState[checkoutProduct.id] + delta)
    );
    updateCheckoutTotals();
    renderGrid();
  }
  if (e.target === overlay) overlay.classList.remove("is-open");
});

document.getElementById("closeCheckout").addEventListener("click", () => {
  overlay.classList.remove("is-open");
});

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const qty = qtyState[checkoutProduct.id];
  overlay.classList.remove("is-open");
  document.getElementById("successText").textContent =
    `${data.name}, замовлення на ${checkoutProduct.name} × ${qty} (${formatUah(checkoutProduct.price * qty)}) прийнято. Напишемо на ${data.email} та зателефонуємо на ${data.phone}.`;
  success.classList.add("is-open");
  e.target.reset();
});

function closeSuccess() {
  success.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("closeSuccess").addEventListener("click", closeSuccess);
success.addEventListener("click", (e) => {
  if (e.target === success) closeSuccess();
});

renderFilters();
renderGrid();
