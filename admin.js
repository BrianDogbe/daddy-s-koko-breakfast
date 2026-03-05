// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChhwhaN2KPZUn1qOJaIp92TBY2Y1ucYrc",
  authDomain: "daddy-s-koko-breakfast.firebaseapp.com",
  projectId: "daddy-s-koko-breakfast",
  storageBucket: "daddy-s-koko-breakfast.appspot.com",
  messagingSenderId: "92938766483",
  appId: "1:92938766483:web:e73369ae76cea381472566"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let previousOrderCount = 0;

document.addEventListener("DOMContentLoaded", function() {

  const loginPage = document.getElementById("login-page");
  const adminPanel = document.getElementById("admin-panel");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const ordersList = document.getElementById("orders-list");
  const sound = document.getElementById("notification-sound");

  // LOGIN
  loginBtn.addEventListener("click", function() {
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        loginPage.style.display = "none";
        adminPanel.style.display = "block";
        listenOrders();
      })
      .catch(error => {
        alert("Login failed: " + error.message);
      });
  });

  // LOGOUT
  logoutBtn.addEventListener("click", function() {
    auth.signOut().then(() => {
      adminPanel.style.display = "none";
      loginPage.style.display = "block";
    });
  });

  // MARK READY
  window.markReady = function(id) {
    db.collection("orders").doc(id).update({
      status: "Ready"
    });
  }

  // LISTEN TO ORDERS
  function listenOrders() {
    db.collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        ordersList.innerHTML = "";

        snapshot.docs.forEach(doc => {
          const order = doc.data();
          const row = document.createElement("tr");

          // Inside listenOrders() function, replace row.innerHTML with:

         row.innerHTML = `
          <td data-label="Name">${order.name}</td>
          <td data-label="Phone">${order.phone}</td>
          <td data-label="Pickup Time">${order.time}</td>
          <td data-label="Meals">${order.size}</td>
          <td data-label="Order">${order.order}</td>
          <td data-label="Status">${order.status || "Pending"}</td>
          <td data-label="Action"><button onclick="markReady('${doc.id}')">Mark Ready</button></td>
         `;
          ordersList.appendChild(row);
        });

        // Play notification for new orders
        if(snapshot.docs.length > previousOrderCount) {
          if(sound) sound.play().catch(e => console.log("Sound blocked:", e));
        }

        previousOrderCount = snapshot.docs.length;
      });
  }


});
