const CURRENT_USER = localStorage.getItem("user");
if (!CURRENT_USER) {
  window.location.href = "/login.html";
}

// ===== PROFILE ICON LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  const span = document.getElementById("profileLetter");
  if (span && CURRENT_USER) {
    span.textContent = CURRENT_USER.charAt(0).toUpperCase();
  }
});




console.log("Final JS loaded");

const BASE_URL = "http://localhost:8080";

/* ================= NAVIGATION ================= */

function showSection(id) {
  document.querySelectorAll("section").forEach(s =>
    s.classList.add("hidden")
  );

  document.getElementById(id).classList.remove("hidden");

  if (id === "my") {
    loadMyComplaints();
  }
}

/* ================= DOM READY ================= */

document.addEventListener("DOMContentLoaded", () => {

  const locations = [
    "SR_BLOCK","CV_RAMAN_BLOCK","V_BLOCK","LIBRARY","FLAG_AREA",
    "FOOD_COURT","X_LAB","JC_BOSE_BLOCK","HOMI_J_BLOCK",
    "CRICKET_GROUND","BASKETBALL_GROUND",
    "GANGA_A_HOSTEL","GANGA_B_HOSTEL","GANGA_HOSTEL",
    "VEDAVATHI_HOSTEL","KRISHNA_HOSTEL","KAVERI_HOSTEL",
    "NARMADA_HOSTEL","TAPATI_HOSTEL","OTHER"
  ];

  ["lostLocation", "foundLocation", "exploreLocation"].forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = `<option value="">Select Location</option>`;

    locations.forEach(loc => {
      const opt = document.createElement("option");
      opt.value = loc;
      opt.textContent = loc.replaceAll("_", " ");
      select.appendChild(opt);
    });
  });
});

/* ================= SUBMIT LOST ================= */

async function submitLost() {
  const form = new FormData();
  form.append("itemName", lostName.value);
  form.append("location", lostLocation.value);
  form.append("mobileNumber", lostMobile.value);
  form.append("description", lostDesc.value);
  form.append("reportedBy", CURRENT_USER);

  if (lostImage.files[0]) {
    form.append("image", lostImage.files[0]);
  }

  const res = await fetch(`${BASE_URL}/api/lost`, {
    method: "POST",
    body: form
  });

  if (res.ok) {
    alert("Lost item submitted");
    showSection("my");
  } else {
    alert("Error submitting lost item");
  }
}

/* ================= SUBMIT FOUND ================= */

async function submitFound() {
  const form = new FormData();
  form.append("itemName", foundName.value);
  form.append("location", foundLocation.value);
  form.append("mobileNumber", foundMobile.value);
  form.append("description", foundDesc.value);
  form.append("reportedBy", CURRENT_USER);

  if (foundImage.files[0]) {
    form.append("image", foundImage.files[0]);
  }

  const res = await fetch(`${BASE_URL}/api/found`, {
    method: "POST",
    body: form
  });

  if (res.ok) {
    alert("Found item submitted");
    showSection("my");
  } else {
    alert("Error submitting found item");
  }
}

/* ================= EXPLORE ================= */

async function loadExplore() {
  const type = typeFilter.value;
  const location = exploreLocation.value;

  const url = type === "lost"
    ? `${BASE_URL}/api/lost`
    : `${BASE_URL}/api/found`;

  const res = await fetch(url);
  const items = await res.json();

  exploreItems.innerHTML = "";

  const filtered = location
    ? items.filter(i => i.location === location)
    : items;

  if (filtered.length === 0) {
    exploreItems.innerHTML = "<p>No items found</p>";
    return;
  }

  filtered.forEach(item => {
    exploreItems.innerHTML += `
      <div class="item-card">
        ${item.imageUrl ? `<img src="${item.imageUrl}" class="thumb" onclick="openImage('${item.imageUrl}')">` : ""}
        <b>${item.itemName}</b>
        <p><b>Location:</b> ${item.location.replaceAll("_"," ")}</p>
        <p>${item.description}</p>
        <p>Status: ${item.status}</p>
        <p>
          <b>Contact:</b>
          <a href="tel:${item.mobileNumber}">📞 ${item.mobileNumber}</a>
        </p>
      </div>
    `;
  });
}

/* ================= MY COMPLAINTS ================= */

async function loadMyComplaints() {
  loadMyLost();
  loadMyFound();
}

async function loadMyLost() {
  const res = await fetch(`${BASE_URL}/api/lost`);
  const items = await res.json();

  myLost.innerHTML = "";

  items
    .filter(i => i.reportedBy === CURRENT_USER)
    .forEach(item => myLost.innerHTML += complaintCard(item, "lost"));
}

async function loadMyFound() {
  const res = await fetch(`${BASE_URL}/api/found`);
  const items = await res.json();

  myFound.innerHTML = "";

  items
    .filter(i => i.reportedBy === CURRENT_USER)
    .forEach(item => myFound.innerHTML += complaintCard(item, "found"));
}

function complaintCard(item, type) {
  return `
    <div class="item-card">
      ${item.imageUrl ? `
        <img src="${item.imageUrl}" class="thumb"
             onclick="openImage('${item.imageUrl}')">
      ` : ``}

      <b>${item.itemName}</b>
      <p><b>Location:</b> ${item.location.replaceAll("_"," ")}</p>
      <p>${item.description || ""}</p>
      <p><b>Status:</b> ${item.status}</p>


      <button class="danger"
        onclick="deleteItem('${type}', ${item.id})">
        🗑 Delete
      </button>

      <button
        onclick="resolveItem('${type}', ${item.id})">
        ✅ Mark Resolved
      </button>
    </div>
  `;
}

/* ================= ACTIONS ================= */

async function deleteItem(type, id) {
  await fetch(`${BASE_URL}/api/${type}/${id}`, { method: "DELETE" });
  loadMyComplaints();
}

async function resolveItem(type, id) {
  await fetch(`${BASE_URL}/api/${type}/${id}/resolve`, { method: "PUT" });
  loadMyComplaints();
}

/* ================= IMAGE VIEW ================= */

function openImage(url) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `<img src="${url}" class="full-img">`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

function seeMatches(type, id) {
  localStorage.setItem("matchType", type);
  localStorage.setItem("matchId", id);

  window.location.href = "/matches.html";
}


