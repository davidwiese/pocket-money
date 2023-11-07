const deleteBtn = document.querySelectorAll(".del");
const deleteAllBtn = document.getElementById("deleteAll");
const purchaseItem = document.querySelectorAll("span.purchase");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deletePurchase);
});

deleteAllBtn.addEventListener("click", deleteAllPurchases);

async function deletePurchase() {
  const purchaseId = this.parentNode.dataset.id;
  try {
    const response = await fetch("purchases/deletePurchase", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        purchaseIdFromJSFile: purchaseId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function deleteAllPurchases() {
  try {
    const response = await fetch("purchases/deleteAll", {
      method: "delete",
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
