from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    job_roles = [
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Data Analyst",
        "Data Scientist",
        "Machine Learning Engineer",
        "DevOps Engineer",
        "Cloud Engineer",
        "AI Engineer"
    ]

    skills = [
        "Python", "Java", "JavaScript", "HTML", "CSS",
        "React", "Flask", "SQL", "Docker", "AWS",
        "Machine Learning", "Data Analysis"
    ]

    results = []

    for job in job_roles:
        matched = random.sample(skills, 5)
        missing = [s for s in skills if s not in matched]
        ats = random.randint(60, 95)

        results.append({
            "role": job,
            "ats_score": ats,
            "matched_skills": matched,
            "missing_skills": missing[:4]
        })

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)