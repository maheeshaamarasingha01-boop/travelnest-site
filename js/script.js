document.addEventListener("DOMContentLoaded", () => {

    /* QUOTES */
    const quotes = [
        "Travel is the only thing you buy that makes you richer.",
        "The world is a book...",
        "Life is short...",
        "Adventure is worthwhile."
    ];

    let index = 0;
    const quoteElement = document.getElementById("quote");

    function changeQuote() {
        if (quoteElement) {
            index = (index + 1) % quotes.length;
            quoteElement.textContent = quotes[index];
        }
    }

    setInterval(changeQuote, 3000);

    /* DESTINATION DAY */
    function getDestinationOfDay() {
        return destinations[new Date().getDate() % destinations.length];
    }

    const box = document.getElementById("destinationBox");
    if (box && destinations) {
        const d = getDestinationOfDay();
        box.innerHTML = `
            <h3>${d.name}</h3>
            ${d.image}
            <p>${d.description}</p>
        `;
    }

    /* CARDS */
    const container = document.getElementById("cardContainer");

    function show(data) {
        if (!container) return;

        container.innerHTML = "";

        data.forEach(d => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
    <img src="${dest.image}" alt="${dest.name}">
    <h3>${dest.name}</h3>
    <p>${dest.country}</p>
`;
            card.onclick = () => openModal(dest);
            container.appendChild(card);
        });
    }

    if (container && destinations) show(destinations);

    /* SEARCH */
    const search = document.getElementById("search");
    if (search) {
        search.oninput = () => {
            const val = search.value.toLowerCase();
            show(destinations.filter(d =>
                d.name.toLowerCase().includes(val)
            ));
        };
    }

});


/* NEWSLETTER */
function saveEmail() {
    const email = document.getElementById("email").value;
    if (!email.includes("@")) return alert("Invalid email");
    localStorage.setItem("email", email);
    alert("Saved!");
}


/* BUDGET */
function calculateBudget() {
    const d = destinationInput.value;
    const days = +daysInput.value;
    const daily = +budgetInput.value;

    if (!d || !days || !daily) return alert("Fill all");

    const total = days * daily;

    document.getElementById("resultBox").innerHTML = `
        <h2>${d}</h2>
        <p>Total: $${total}</p>
        <button onclick="saveTrip('${d}', ${total})">Save</button>
    `;
}

function saveTrip(d, t) {
    let arr = JSON.parse(localStorage.getItem("trips")) || [];
    arr.push({ d, t });
    localStorage.setItem("trips", JSON.stringify(arr));
    alert("Saved");
}


/* RANDOM GENERATOR */
function generateTrip() {

    const type = document.getElementById("type").value;
    const budget = document.getElementById("budget").value;

    let filtered = destinations;

    if (budget) {
        filtered = filtered.filter(d =>
            (budget === "low" && d.cost.low < 60) ||
            (budget === "medium" && d.cost.medium < 200) ||
            (budget === "high")
        );
    }

    if (filtered.length === 0) {
        alert("No destinations match!");
        return;
    }

    const dest = filtered[Math.floor(Math.random() * filtered.length)];

    document.getElementById("randomResult").innerHTML = `
        <h2>${dest.name}</h2>
        ${dest.image}
        <p>${dest.description}</p>

        <button onclick="generateTrip()">🎲 Again</button>
        <button onclick="saveWishlist('${dest.name}')">❤️ Save</button>
    `;
}

function saveWishlist(name) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(name);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added!");
}


/* MOOD */
function playSound(type) {
    ["beach", "forest", "city"].forEach(id => {
        const a = document.getElementById(id);
        a.pause();
        a.currentTime = 0;
    });
    document.getElementById(type).play();
}

function addPlace() {
    const input = document.getElementById("placeInput");
    const place = input.value;
    if (!place) return;

    let places = JSON.parse(localStorage.getItem("places")) || [];
    places.push(place);
    localStorage.setItem("places", JSON.stringify(places));

    displayPlaces();
    input.value = "";
}

function displayPlaces() {
    const list = document.getElementById("placeList");
    if (!list) return;

    let places = JSON.parse(localStorage.getItem("places")) || [];
    list.innerHTML = "";

    places.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p;
        list.appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", displayPlaces);
function openModal(dest) {

    const modal = document.getElementById("modal");
    const modalDetails = document.getElementById("modalDetails");

    modal.style.display = "block";

    modalDetails.innerHTML = `
        <h2>${dest.name}, ${dest.country}</h2>
        <img src="${dest.image}" width="100%">
        <p>${dest.description}</p>

        <h4>Attractions:</h4>
        <ul>
            ${dest.attractions.map(a => `<li>${a}</li>`).join("")}
        </ul>

        <h4>Cost per day:</h4>
        <p>Low: $${dest.cost.low}</p>
        <p>Medium: $${dest.cost.medium}</p>
        <p>High: $${dest.cost.high}</p>
    `;
}
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeModal");

    if (closeBtn && modal) {
        closeBtn.onclick = () => modal.style.display = "none";

        window.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});

/* FEEDBACK */
function submitForm(e) {
    e.preventDefault();

    const name = name.value;
    const email = email.value;
    const message = message.value;

    if (!name || !email || !message) {
        alert("Fill all fields");
        return;
    }

    let feedback = JSON.parse(localStorage.getItem("feedback")) || [];
    feedback.push({ name, email, message });
    localStorage.setItem("feedback", JSON.stringify(feedback));

    confirmMsg.textContent = "✅ Message sent!";
    document.querySelector("form").reset();

}

function toggleFAQ(el) {
    const ans = el.nextElementSibling;
    ans.style.display = ans.style.display === "block" ? "none" : "block";
}