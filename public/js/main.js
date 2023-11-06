const deleteBtn = document.querySelectorAll(".del");
const purchaseItem = document.querySelectorAll("span.purchase");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deletePurchase);
});

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
