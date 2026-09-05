const cursos = [

    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: false
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },

    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }

];


const courseCards = document.querySelector("#courseCards");

const totalCredits = document.querySelector("#totalCredits");


function displayCourses(filter = "all") {

    const filteredCourses =
        filter === "all"
            ? cursos
            : cursos.filter(course =>
                course.subject === filter
            );


    courseCards.innerHTML = "";


    filteredCourses.forEach(course => {

        const card = document.createElement("div");

        card.className =
            `course-card ${course.completed ? "completed" : ""}`;


        card.innerHTML = `

            <div>
                ${course.subject} ${course.number}
            </div>

            <small>
                ${course.title}
            </small>

            ${
                course.completed
                    ? '<div class="check">✓ Concluído</div>'
                    : ""
            }

        `;


        courseCards.appendChild(card);

    });


    totalCredits.textContent =
        filteredCourses.reduce(
            (total, course) =>
                total + course.credits,
            0
        );

}


const filterButtons =
    document.querySelectorAll(".filter");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        displayCourses(
            button.dataset.filter
        );

    });

});


displayCourses();