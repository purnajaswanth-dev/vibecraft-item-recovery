const BASE_URL = "http://localhost:8080";

const type = localStorage.getItem("matchType");
const id = localStorage.getItem("matchId");

if (!type || !id) {
  alert("No match data found");
  window.location.href = "/";
}

loadMatches();

async function loadMatches() {
  const res = await fetch(`${BASE_URL}/api/match/${type}/${id}`);
  const data = await res.json();

  const myItemBox = document.getElementById("myItem");
  const resultBox = document.getElementById("matchResults");

  myItemBox.innerHTML = "";
  resultBox.innerHTML = "";

  const myItem = data.selectedItem;
  const matches = data.matches;

  // ✅ SHOW SELECTED ITEM (CORRECT ONE)
  myItemBox.innerHTML = `
    <div class="item-card highlight">
      <h3>${myItem.itemName}</h3>
      <p><b>Location:</b> ${myItem.location.replaceAll("_"," ")}</p>
      <p><b>Status:</b> ${myItem.status}</p>
    </div>
  `;

  if (matches.length === 0) {
    resultBox.innerHTML = "<p>No matches found</p>";
    return;
  }

  // ✅ SHOW MATCHES
  matches.forEach(m => {
    const score = m.score;

    let colorClass =
      score >= 70 ? "match-green" :
      score >= 40 ? "match-yellow" :
      "match-red";

    resultBox.innerHTML += `
      <div class="item-card ${colorClass}">
        <b>${m.item.itemName}</b>
        <p>Location: ${m.item.location.replaceAll("_"," ")}</p>
        <p><b>${score}% match</b></p>
      </div>
    `;
  });
}
