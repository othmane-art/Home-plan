function saveGoals() {
  const goals = {
    pushups: parseInt(document.getElementById("goalPushups").value) || 0,
    squats: parseInt(document.getElementById("goalSquats").value) || 0,
    abs: parseInt(document.getElementById("goalAbs").value) || 0
  };
  localStorage.setItem("goals", JSON.stringify(goals));
  alert("Goals saved!");
  updateProgress();
}

function logWorkout() {
  const today = new Date().toISOString().split("T")[0];
  const entry = {
    date: today,
    pushups: parseInt(document.getElementById("pushups").value) || 0,
    squats: parseInt(document.getElementById("squats").value) || 0,
    abs: parseInt(document.getElementById("abs").value) || 0
  };

  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  const existing = logs.find(l => l.date === today);
  if (existing) {
    existing.pushups += entry.pushups;
    existing.squats += entry.squats;
    existing.abs += entry.abs;
  } else {
    logs.push(entry);
  }

  localStorage.setItem("logs", JSON.stringify(logs));
  alert("Workout logged!");
  updateProgress();
}

function updateProgress() {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const goals = JSON.parse(localStorage.getItem("goals")) || {};

  const thisMonth = new Date().toISOString().slice(0, 7);
  let total = { pushups: 0, squats: 0, abs: 0 };

  logs.forEach(entry => {
    if (entry.date.startsWith(thisMonth)) {
      total.pushups += entry.pushups;
      total.squats += entry.squats;
      total.abs += entry.abs;
    }
  });

  const progress = `
    <p>Pushups: ${total.pushups} / ${goals.pushups || "?"}</p>
    <p>Squats: ${total.squats} / ${goals.squats || "?"}</p>
    <p>Abdominals: ${total.abs} / ${goals.abs || "?"}</p>
  `;

  document.getElementById("progressDisplay").innerHTML = progress;
}

updateProgress(); // initial load
