import data from "./assets/data.json";

const roleExploration = document.querySelector(".role-exploration");
const containerWrapper = document.querySelector(".container_wrapper");
const threadBuild = document.querySelector("#threadbuild");
const JouneryBoard = document.querySelector("#jounery-board");

if (roleExploration) {
  roleExploration.innerHTML = `
        <h2>${data.tasks[0].task_title}</h2>
        <p>${data.tasks[0].task_description}</p>
      `;
}

// Generate HTML for assets
function generateAssetsHTML(assets) {
  const container = document.getElementById("assets-container");
  container.innerHTML = ""; // Clear previous content

  const listElement = document.createElement("li");
  listElement.textContent = data.tasks[0].task_title;
  listElement.className = "list-element";
  container.appendChild(listElement);
  assets.forEach((asset) => {
    const assetItem = document.createElement("ul");
    assetItem.className = "asset-item-list";

    assetItem.innerHTML = `
      <li class="item-title">${asset.asset_title}</li>
    `;

    container.appendChild(assetItem);
  });
}

// Handle logo click to show/hide assets container
document.getElementById("logo").addEventListener("click", function () {
  const assetsContainer = document.getElementById("assets-container");
  const arrow = document.getElementById("logo");

  assetsContainer.classList.toggle("hidden");
  JouneryBoard.classList.toggle("hidden");
  JouneryBoard.classList.toggle("display-block");
  assetsContainer.classList.toggle("visible");

  arrow.classList.toggle("rotated");
});

// Initialize with JSON data
generateAssetsHTML(data.tasks[0].assets);

const tasks = data.tasks[0].assets;

for (let item of tasks) {
  const newItem = document.createElement("div");

  // Set attributes and innerHTML
  newItem.setAttribute("data-id", item.asset_id);
  newItem.setAttribute(
    "id",
    item.asset_title.replace(/\s+/g, "-").toLowerCase()
  ); // Sanitize the title for use as an ID
  newItem.className = "assets-item"; // Replace 'common-class' with the actual class name you want

  let content = "";

  if (item.asset_type === "display_asset") {
    if (item.asset_content_type === "video") {
      content = `<iframe class="asset-video" src="${item.asset_content}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (item.asset_content_type === "article") {
      content = `<a class="asset-article-link" href="${item.asset_content}" target="_blank"></a>`;
    }
  }

  newItem.innerHTML = `
      <p class="asset-title">${item.asset_title} <span class="info" title=${item.asset_title}>i</span></p>
      <p class="asset-descriptions"><b>Description:</b> ${item.asset_description}</p>
      ${content}
    `;

  // Append to the container
  containerWrapper.appendChild(newItem);
}
