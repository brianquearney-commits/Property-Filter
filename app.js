const $ = (id) => document.getElementById(id);
const money = (n) => "$" + n.toLocaleString();

function fillOptions(selectId, values) {
  const select = $(selectId);
  [...new Set(values)].sort().forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    select.appendChild(opt);
  });
}

function matches(p) {
  const min = parseInt($("minPrice").value, 10) || 0;
  const max = parseInt($("maxPrice").value, 10) || Infinity;
  return (
    (!$("location").value || p.location === $("location").value) &&
    (!$("type").value || p.type === $("type").value) &&
    p.price >= min &&
    p.price <= max &&
    p.beds >= Number($("beds").value) &&
    p.baths >= Number($("baths").value)
  );
}

function render() {
  const list = properties.filter(matches);
  $("count").textContent = `${list.length} of ${properties.length} properties`;
  $("results").innerHTML = list.length
    ? list
        .map(
          (p) => `<div class="card">
            <h2>${money(p.price)}</h2>
            <p>${p.address}, ${p.location}</p>
            <p>${p.type} &middot; ${p.beds} bed &middot; ${p.baths} bath</p>
          </div>`
        )
        .join("")
    : "<p>No properties match. Try loosening the filters.</p>";
}

fillOptions("location", properties.map((p) => p.location));
fillOptions("type", properties.map((p) => p.type));

$("filters").addEventListener("input", render);
$("filters").addEventListener("reset", () => setTimeout(render));
render();
