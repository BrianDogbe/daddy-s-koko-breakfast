const firebaseConfig = {
  apiKey: "AIzaSyBcKB8Hd1A19Eu1knnYTW00C2ZFlHMR1-4",
  authDomain: "daddy-s-koko-breakfast.firebaseapp.com",
  projectId: "daddy-s-koko-breakfast",
  storageBucket: "daddy-s-koko-breakfast.appspot.com",
  messagingSenderId: "92938766483",
  appId: "1:92938766483:web:e73369ae76cea381472566"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


document.addEventListener("DOMContentLoaded", function () {

  // YEAR IN FOOTER
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  // CONTACT FORM
  const contactForm = document.getElementById("contact-form");
  const contactStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      db.collection("contact_messages").add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function () {
        contactStatus.textContent = "Message sent successfully!";
        contactForm.reset();
      })
      .catch(function (error) {
        console.error("Error:", error);
        contactStatus.textContent = "Error sending message.";
      });

    });
  }



  // ORDER / RESERVATION FORM
  const reservationForm = document.getElementById("reservation-form");
  const reservationStatus = document.getElementById("reservation-status");

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("res-name").value;
      const phone = document.getElementById("res-phone").value;
      const time = document.getElementById("res-time").value;
      const size = document.getElementById("res-size").value;
      const order = document.getElementById("res-message").value;

      db.collection("orders").add({
        name: name,
        phone: phone,
        time: time,
        size: size,
        order: order,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function () {
        reservationStatus.textContent = "Order saved successfully!";
        reservationForm.reset();
      })
      .catch(function (error) {
        console.error("Error:", error);
        reservationStatus.textContent = "Error saving order.";
      });

    });
  }

});