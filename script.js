document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addJob();
});

function addJob() {
    const title = document.getElementById('jobTitle').value;
    const salary = document.getElementById('salary').value;
    const date = document.getElementById('date').value;

    const job = { title, salary, date };
    
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    
    document.getElementById('jobForm').reset();
    displayJobs();
}

function displayJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';

    jobs.forEach((job, index) => {
        const li = document.createElement('li');
        li.textContent = `${job.title} - ₹${job.salary} - ${job.date}`;

        // Create Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editJob(index);
        
        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteJob(index);
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        jobList.appendChild(li);
    });
}

function editJob(index) {
    const jobs = JSON.parse(localStorage.getItem('jobs'));
    const job = jobs[index];

    const newTitle = prompt('Edit job title:', job.title);
    const newSalary = prompt('Edit job salary:', job.salary);
    const newDate = prompt('Edit job date:', job.date);

    if (newTitle && newSalary && newDate) {
        jobs[index] = { title: newTitle, salary: newSalary, date: newDate };
        localStorage.setItem('jobs', JSON.stringify(jobs));
        displayJobs();
    }
}

function deleteJob(index) {
    if (confirm('Are you sure you want to delete this job?')) {
        let jobs = JSON.parse(localStorage.getItem('jobs'));
        jobs.splice(index, 1);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        displayJobs();
    }
}

function searchJobs() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';

    jobs.forEach((job) => {
        if (job.title.toLowerCase().includes(searchTerm)) {
            const li = document.createElement('li');
            li.textContent = `${job.title} - ₹${job.salary} - ${job.date}`;
            jobList.appendChild(li);
        }
    });
}

displayJobs();