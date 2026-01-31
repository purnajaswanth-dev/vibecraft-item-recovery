const USER = localStorage.getItem("user");
if (!USER) {
  window.location.href = "/login.html";
}

const BASE_URL = "http://localhost:8080";

// Avatar letter
document.getElementById("avatar").innerText =
  USER.charAt(0).toUpperCase();

// Load items
loadMyItems();

async function loadMyItems() {
  const lost = await fetch(`${BASE_URL}/api/lost`).then(r => r.json());
  const found = await fetch(`${BASE_URL}/api/found`).then(r => r.json());

  const myLost = lost
    .filter(i => i.reportedBy === USER)
    .map(i => ({ ...i, type: "lost" }));

  const myFound = found
    .filter(i => i.reportedBy === USER)
    .map(i => ({ ...i, type: "found" }));

  const myItems = [...myLost, ...myFound];

  const box = document.getElementById("myItems");
  box.innerHTML = "";

  if (myItems.length === 0) {
    box.innerHTML = "<p>No items found</p>";
    return;
  }

  myItems.forEach(item => {
    box.innerHTML += `
      <div class="item-card profile-card">
        <h3>${item.itemName}</h3>
        <p><b>Type:</b> ${item.type.toUpperCase()}</p>
        <p><b>Location:</b> ${item.location.replaceAll("_", " ")}</p>
        <p><b>Status:</b> ${item.status}</p>

        <button class="match-btn"
          onclick="openMatches('${item.type}', ${item.id})">
          See Possible Matches
        </button>
      </div>
    `;
  });
}

function openMatches(type, id) {
  localStorage.setItem("matchType", type);
  localStorage.setItem("matchId", id);
  window.location.href = "/matches.html";
}
