document.getElementById("resumeForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh

    const selectedJob = document.getElementById("job").value;
    if (!selectedJob) {
        alert("Please select a job role");
        return;
    }

    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {
        // Filter results to only the selected job
        const filtered = data.filter(job => job.role === selectedJob);
        showResults(filtered);
    })
    .catch(error => {
        console.error(error);
        alert("Error connecting to backend");
    });
});

function showResults(data) {
    const output = document.getElementById("output");
    output.innerHTML = "<h3>Job Match Result</h3>";

    if (!Array.isArray(data) || data.length === 0) {
        output.innerHTML += "<p>No results found for selected job</p>";
        return;
    }

    data.forEach(job => {
        output.innerHTML += `
            <hr>
            <p><b>Job Role:</b> ${job.role}</p>
            <p><b>ATS Score:</b> ${job.ats_score}%</p>
            <p><b>Matched Skills:</b> ${job.matched_skills.join(", ")}</p>
            <p><b>Missing Skills:</b> ${job.missing_skills.join(", ")}</p>
        `;
    });
}
