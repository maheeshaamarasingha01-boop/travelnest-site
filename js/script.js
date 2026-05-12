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
                ${d.image}
                <h3>${d.name}</h3>
                <p>${d.country}</p>
            `;

            card.onclick = () => openModal(d);
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
}

function toggleFAQ(el) {
    const ans = el.nextElementSibling;
    ans.style.display = ans.style.display === "block" ? "none" : "block";
}