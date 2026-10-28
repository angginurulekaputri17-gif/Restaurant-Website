const dishes = [
  {
    name: "Creamy Alfredo Pasta",
    description: "White sauce pasta with herbs",
    price: 12.99,
    image: "photo-1473093295043-cdd812d0e601",
  },
  {
    name: "Grilled Chicken Steak",
    description: "Served with vegetables and sauce",
    price: 15.99,
    image: "photo-1532550907401-a500c9a57435",
  },
  {
    name: "Margherita Pizza",
    description: "Classic cheese pizza",
    price: 11.99,
    image: "photo-1579751626657-72bc17010498",
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate with ice cream",
    price: 7.99,
    image: "photo-1606313564200-e75d5e30476c",
  },
];

const foodGrid = document.getElementById("foodGrid");
const cartSummary = document.getElementById("cartSummary");

let cartCount = 0;
let cartTotal = 0;

function renderDishes() {
  foodGrid.innerHTML = dishes
    .map(
      (dish, index) => `
    <article class="food-card">
      <img
        src="https://images.unsplash.com/${dish.image}?auto=format&fit=crop&w=600&q=80"
        alt="${dish.name}"
        loading="lazy"
      >
      <div class="food-info">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <div class="food-bottom">
          <span class="price">$${dish.price.toFixed(2)}</span>
          <button class="add-btn" data-index="${index}"
            aria-label="Add ${dish.name} to order">+</button>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

foodGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-btn");
  if (!button) return;

  const dish = dishes[Number(button.dataset.index)];
  cartCount++;
  cartTotal += dish.price;

  cartSummary.textContent = `${cartCount} item(s) added · Total: $${cartTotal.toFixed(2)}`;
});

document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("navLinks");
  const isOpen = nav.classList.toggle("open");

  document
    .getElementById("menuToggle")
    .setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
    document
      .getElementById("menuToggle")
      .setAttribute("aria-expanded", "false");
  });
});

const dateInput = document.getElementById("reservationDate");
const today = new Date();
const localDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

dateInput.min = localDate;

document
  .getElementById("reservationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = data.get("name");
    const date = data.get("date");
    const guests = data.get("guests");

    document.getElementById("formMessage").textContent =
      `Thank you, ${name}! Your reservation request for ${guests} guest(s) on ${date} has been prepared. Please contact the restaurant to confirm your booking.`;

    form.reset();
    dateInput.min = localDate;
  });

document.getElementById("year").textContent = new Date().getFullYear();

renderDishes();
