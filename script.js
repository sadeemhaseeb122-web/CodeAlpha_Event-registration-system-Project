let jobs = [
  { id: 1, title: "Frontend Developer", location: "Lahore", salary: 80000 },
  { id: 2, title: "Backend Developer", location: "Karachi", salary: 100000 },
  { id: 3, title: "UI/UX Designer", location: "Islamabad", salary: 70000 }
];

// LOAD PAGE
window.onload = function () {
  showJobs();
  showApplications();
};

// SHOW JOBS
function showJobs() {
  let jobsDiv = document.getElementById("jobs");
  let select = document.getElementById("jobSelect");

  jobsDiv.innerHTML = "";
  select.innerHTML = "";

  jobs.forEach(job => {

    jobsDiv.innerHTML += `
      <div class="card">
        <h3>${job.title}</h3>
        <p>${job.location}</p>
        <p>${job.salary}</p>
      </div>
    `;

    select.innerHTML += `<option value="${job.id}">${job.title}</option>`;
  });
}

// APPLY JOB
function applyJob() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let jobId = document.getElementById("jobSelect").value;

  if (!name || !email) {
    alert("Fill all fields");
    return;
  }

  let apps = JSON.parse(localStorage.getItem("apps")) || [];

  apps.push({ name, email, jobId, status: "Pending" });

  localStorage.setItem("apps", JSON.stringify(apps));

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  showApplications();
}

// SHOW APPLICATIONS
function showApplications() {
  let container = document.getElementById("applications");
  container.innerHTML = "";

  let apps = JSON.parse(localStorage.getItem("apps")) || [];

  apps.forEach((a, i) => {
    container.innerHTML += `
      <div class="card">
        <h3>${a.name}</h3>
        <p>${a.email}</p>
        <p>Job ID: ${a.jobId}</p>
        <p>Status: ${a.status}</p>
        <button onclick="cancel(${i})">Cancel</button>
      </div>
    `;
  });
}

// CANCEL
function cancel(i) {
  let apps = JSON.parse(localStorage.getItem("apps")) || [];
  apps.splice(i, 1);
  localStorage.setItem("apps", JSON.stringify(apps));
  showApplications();
}