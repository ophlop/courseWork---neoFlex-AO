// Currency API script part begin

let showLeftRowInfo = false;
let currencyPairsPrice = ["USD", "CNY", "CHF", "EUR", "JPY", "TRY"];

function createCourses(currencyPairsPrice) {
  showLeftRowInfo = true;
  let loader = document.querySelector(".loader");
  loader.classList.add("hide-loader");
  let list = document.querySelector(".left-row__course-info");
  for (let i = 0; i < currencyPairsPrice.length; i++) {
    list.insertAdjacentHTML(
      "beforeend",
      `
          <div class="left-row__course-card">
            <span class="course-card__currencies">${currencyPairsPrice[i].from}:</span>
            <span class="course-card__price-course">${currencyPairsPrice[i].course}</span>
          </div>
        `
    );
  }
}

function updateCourses(currencyPairsPrice) {
  console.log("update!");
  let values = document.querySelectorAll(".course-card__price-course");
  for (let i = 0; i < currencyPairsPrice.length; i++) {
    values[i].innerHTML = currencyPairsPrice[i].course;
  }
}

function showActualCourses(currencyPairsPrice = [{ from: "USD", to: "RUB" }]) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "34eb46cf27msh7166df608a6238cp161b5ejsn0f643a99bbf7",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  let requests = currencyPairsPrice.map((el) =>
    fetch(
      `https://currency-exchange.p.rapidapi.com/exchange?from=${el}&to=RUB&q=1.0`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fetch error");
        }
        return response.json();
      })
      .then((response) => {
        el.course = response.toFixed(2);
      })
  );
  Promise.all(requests)
    .then(() => {
      if (!showLeftRowInfo) createCourses(currencyPairsPrice);
      else updateCourses(currencyPairsPrice);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

showActualCourses(currencyPairsPrice);
setInterval(() => {
  showActualCourses(currencyPairsPrice);
}, 900000);

// Currency API script part end
