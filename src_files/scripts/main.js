// Currency API script part begin
let coine = "USD";
let coineTwo = "RUB";
let json;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key":
      "34eb46cf27msh7166df608a6238cp161b5ejsn0f643a99bbf7",
    "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
  },
};
let currencyPairsPrice = ["USD", "EUR", "CNY", "CHF", "JPY", "TRY"];

let renderDIVParent = document.querySelector(".left-row__course-info");
for (let i = 0; i < currencyPairsPrice.length; i++) {
  let renderDIVChild = document.createElement('div')
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  renderDIVChild.classList.add("left-row__course-card")
  span1.classList.add("course-card__currencies");
  span2.classList.add("course-card__price-course");
  span1.innerHTML = `${currencyPairsPrice[i]}:`;
  span2.innerHTML = `${fetch(
    `https://currency-exchange.p.rapidapi.com/exchange?from=${currencyPairsPrice[i]}&to=${coineTwo}&q=1.0`,
    options
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      span2.innerHTML = `${data.toFixed(2)}`;
    })}`;
  renderDIVChild.appendChild(span1);
  renderDIVChild.appendChild(span2);
  renderDIVParent.appendChild(renderDIVChild)
}
// Currency API script part end