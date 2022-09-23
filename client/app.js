// Elements
const form = document.querySelector(".keywords-form");
const keywordsInput = document.getElementById("keywords-form__text-input");
const addBtn = document.getElementById("keywords-form__add-btn");
const keywordsList = document.querySelector(".keywords__list");
const resetBtn = document.getElementById("keywords-form__reset-btn");
const resultsBody = document.querySelector(".results__body");
const resultsTable = document.querySelector(".results__table");
const keywordsContainer = document.querySelector(".keywords");
const loader = document.getElementById("loader");

let addedKeywords = [];

// Event listeners
form.addEventListener("submit", handleSubmit);
addBtn.addEventListener("click", handleAddKeyword);
resetBtn.addEventListener("click", handleReset);

resultsTable.style.display = "none";
keywordsContainer.style.display = "none";
loader.style.display = "none";

// Functions
async function handleSubmit(e) {
  e.preventDefault();

  resultsTable.style.display = "none";

  if (addedKeywords.length === 0) {
    alert("Please enter at least one keyword.");
    return;
  }

  resultsBody.innerHTML = "";

  const files = document.getElementById("keywords-form__file-input").files;

  const formData = new FormData();

  Object.keys(files).forEach((key) => {
    formData.append(files[key].name, files[key]);
  });
  formData.append("keywords", JSON.stringify(addedKeywords));

  console.log([...formData]);

  try {
    loader.style.display = "inline";

    // const response = await fetch("http://localhost:3000", {
    //   method: "POST",
    //   body: formData,
    // });

    const response = await fetch(
      "https://applicant-tracking-system.herokuapp.com",
      {
        method: "POST",
        body: formData,
      }
    );

    loader.style.display = "none";

    const results = await response.json();

    results.forEach((result) => {
      createResultElement(result);
    });

    resultsTable.style.display = "block";
  } catch (error) {
    console.log(error);
  }
}

function createResultElement(result) {
  const element = document.createElement("tr");
  element.classList.add("results__item");

  element.innerHTML = `<td><div class="email">${result.email}</div></td><td class="percentage">${result.percentage}</td>`;

  resultsBody.appendChild(element);
}

function handleAddKeyword(e) {
  e.preventDefault();

  if (!keywordsInput.value) {
    alert("Please have at least one keyword.");
    return;
  }

  keywordsContainer.style.display = "block";

  newKeywords = keywordsInput.value
    .split(",")
    .map((keyword) => keyword.toLowerCase().trim());

  uniqueNewKeywords = [...new Set(newKeywords)];

  uniqueNewKeywords = uniqueNewKeywords.filter(
    (keyword) => !addedKeywords.includes(keyword)
  );

  addedKeywords = addedKeywords.concat(uniqueNewKeywords);

  uniqueNewKeywords.forEach((keyword) => {
    createKeywordElement(keyword);
  });

  keywordsInput.value = "";
}

function createKeywordElement(keyword) {
  const element = document.createElement("li");
  element.classList.add("keywords__item");

  element.innerHTML = `<span class="keywords__text">${keyword}<button class="keywords__delete-btn"><i class="fa-solid fa-xmark"></i></button></span>
  `;

  keywordsList.appendChild(element);

  const keywordDeleteBtn = element.querySelector(".keywords__delete-btn");
  keywordDeleteBtn.addEventListener("click", handleDeleteKeyword);
}

function handleDeleteKeyword(e) {
  e.preventDefault();

  const element = e.currentTarget.parentElement.parentElement;

  console.log(element.innerText);

  addedKeywords = addedKeywords.filter(
    (keyword) => keyword != element.innerText
  );

  console.log(addedKeywords);

  keywordsList.removeChild(element);
}

function handleReset(e) {
  e.preventDefault();
  form.reset();
  addedKeywords = [];
  keywordsList.innerHTML = "";
  keywordsInput.value = "";
  resultsBody.innerHTML = "";
  resultsTable.style.display = "none";
  keywordsContainer.style.display = "none";
}
