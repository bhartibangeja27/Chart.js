import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAPdS8b5dcjdW8rJLMWUeyIa3vNfbex26I",
  authDomain: "my-second-project-29ac5.firebaseapp.com",
  projectId: "my-second-project-29ac5",
  storageBucket: "my-second-project-29ac5.appspot.com",
  messagingSenderId: "314678734678",
  appId: "1:314678734678:web:1e6db1c673d1d842a830f7",
  measurementId: "G-D0ZF0VP5WF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");

const signin_email = document.getElementById("signin_email");
const signin_password = document.getElementById("signin_password");
const signin_btn = document.getElementById("signin_btn");

const user_email = document.getElementById("user_email");
const logout_btn = document.getElementById("logout_btn");

const auth_container = document.getElementById("auth_container");
const user_container = document.getElementById("user_container");

signup_btn.addEventListener("click", createUserAccount);
signin_btn.addEventListener("click", signIn);
logout_btn.addEventListener("click", logout);

// Auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    auth_container.style.display = "none";
    user_container.style.display = "block";
    user_email.innerText = user.email;
    fetchDataFromFirestore();
  } else {
    auth_container.style.display = "block";
    user_container.style.display = "none";
  }
});

// Auth functions
function createUserAccount() {
  createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    .then((userCredential) => {
      console.log("User Created:", userCredential.user);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signIn() {
  signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
    .then((userCredential) => {
      console.log("Signed In:", userCredential.user);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logout() {
  signOut(auth)
    .then(() => console.log("Logged out"))
    .catch((error) => alert(error.message));
}
// Chart.js section
const ctx = document.getElementById('myChart');

let myChart;
let jsonData;
fetch('data.json')
.then(function(responce){
    if(responce.ok ==true){
        return responce.json();
    }
})
.then(function(data){
    jsonData = data;
    createChart(data,'pie');
});

function setChartType(chartType){

    myChart.destroy();
    createChart(jsonData,chartType);
}

function createChart (data,type){
  myChart= new Chart(ctx, {
    type: type,
    data: {
      labels: data.map(row => row.month),
      datasets: [{
        label: '# of Votes',
        data: data.map(row => row.income ),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio:false
    }
  });
}
// Chart rendering function
function renderAllCharts() {
  const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple'];
  const dataValues = [12, 19, 3, 5, 2];
  const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)'
  ];

  // Bar Chart
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Votes',
        data: dataValues,
        backgroundColor: backgroundColors
      }]
    }
  });

  // Line Chart
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Votes',
        data: dataValues,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: false
      }]
    }
  });

  // Pie Chart
  new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Votes',
        data: dataValues,
        backgroundColor: backgroundColors
      }]
    }
  });
}

