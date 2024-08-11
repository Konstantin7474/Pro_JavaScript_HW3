/* Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах.
 Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

Страница добавления отзыва:

Поле для ввода названия продукта.
Текстовое поле для самого отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

Страница просмотра отзывов:

Показывает список всех продуктов, о которых были оставлены отзывы.
При клике на название продукта отображается список всех отзывов по этому продукту.
Возможность удаления отзыва (при нажатии на кнопку "Удалить" 
    рядом с отзывом, данный отзыв удаляется из LocalStorage). */




document.getElementById("addReviewBtn").addEventListener("click", function () {
  const productName = document.getElementById("productName").value.trim();
  const reviewText = document.getElementById("reviewText").value.trim();

  if (productName && reviewText) {
    const reviews = JSON.parse(localStorage.getItem(productName)) || [];
    reviews.push(reviewText);
    localStorage.setItem(productName, JSON.stringify(reviews));
    alert("Отзыв добавлен!");
    document.getElementById("productName").value = "";
    document.getElementById("reviewText").value = "";
    loadProductList();
  } else {
    alert("Пожалуйста, заполните все поля");
  }
});

function loadProductList() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const productName = localStorage.key(i);
    const productItem = document.createElement("div");
    productItem.textContent = productName;
    productItem.style.cursor = "pointer";
    productItem.addEventListener("click", function () {
      loadReviewList(productName);
    });
    productList.appendChild(productItem);
  }
}

function loadReviewList(productName) {
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";
  const reviews = JSON.parse(localStorage.getItem(productName)) || [];
  reviews.forEach((review, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.textContent = review;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.addEventListener("click", function () {
      reviews.splice(index, 1);
      if (reviews.length === 0) {
        localStorage.removeItem(productName);
        loadProductList();
        reviewList.innerHTML = "";
      } else {
        localStorage.setItem(productName, JSON.stringify(reviews));
        loadReviewList(productName);
      }
    });
    reviewItem.appendChild(deleteBtn);
    reviewList.appendChild(reviewItem);
  });
}

loadProductList();
