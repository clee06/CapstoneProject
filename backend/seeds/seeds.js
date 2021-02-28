
exports.seed = function (knex) {
  // User Seeds
  return knex('users').insert([
    { username: 'test', password: "placeholder", nickname: "Keanu", picture: "https://www.nme.com/wp-content/uploads/2020/07/cyberpunk2077-credit-cdprojektred@2000x1270-696x442.jpg", email: "notanemail@email.com", bio: "Professional Gamer, 16 inch laptop screen", type: "admin" },
    { username: 'Sam', password: "placeholder", nickname: "Big Sam11111", picture: "https://www.nme.com/wp-content/uploads/2020/07/cyberpunk2077-credit-cdprojektred@2000x1270-696x442.jpg", email: "notanemail2@email.com", bio: "Professional Gamer, 16 inch laptop screen", type: "teacher" },
    { username: 'student1', password: "placeholder", nickname: "Keanu Steve", picture: "https://www.nme.com/wp-content/uploads/2020/07/cyberpunk2077-credit-cdprojektred@2000x1270-696x442.jpg", email: "notanemail3@email.com", bio: "Professional Gamer, 16 inch laptop screen", type: "student" },
    { username: 'student2', password: "placeholder", nickname: "Keanu", picture: "https://www.nme.com/wp-content/uploads/2020/07/cyberpunk2077-credit-cdprojektred@2000x1270-696x442.jpg", email: "notanemail4@email.com", bio: "Professional Gamer, 16 inch laptop screen", type: "student" },
    { username: 'teacher2', password: "placeholder", nickname: "Keanu", picture: "https://www.nme.com/wp-content/uploads/2020/07/cyberpunk2077-credit-cdprojektred@2000x1270-696x442.jpg", email: "notanemail5@email.com", bio: "Professional Gamer, 16 inch laptop screen", type: "teacher" },
    { username: 'student3', password: "placeholder", nickname: "Keanu", picture: "https://www.nme.com/wp-content/uploads/2020/07/cyberpunk2077-credit-cdprojektred@2000x1270-696x442.jpg", email: "notanemail6@email.com", bio: "Professional Gamer, 16 inch laptop screen", type: "student" }
  ])
    // Institutions Seeds
    .then(function () {
      return knex('institutions').insert([
        { name: 'Xccelerate', picture: "https://assets-global.website-files.com/5dbfd0c08b3107b843917e24/5eead28dde2fa774fdf2ed79_logo.png", overview: "Xccelerate was founded with the original vision of bridging the tech talent gap in Hong Kong. We enable students and companies to acquire the skills they need in Artificial Intelligence, Blockchain, Software Engineering, User Experience Design and Digital Marketing. Our mission is to provide accessible, cutting-edge tech education to empower individuals, businesses, and communities globally.", url: "https://xccelerate.co/" },
        {
          name: "BrainStation", overview: "Our cutting-edge curriculum is developed and taught by the world's best digital experts and professionals. Our classes offer a project-based learning environment, emphasizing collaboration and immediate feedback. Synapse, our custom-built, personalized learning platform provides an unrivaled learning experience.",
          picture: "https://www.honestbrandreviews.com/wp-content/uploads/2019/11/BrainStation-7-1024x213.png",
          url: "https://brainstation.io/",
        },

        {
          name: "Flatiron School", overview: "Education should be the best investment you make in your future—and at Flatiron School, we’re committed to helping you learn the skills you need to change yours for the better. Online and on our campuses across the country, we provide the skills, community, and immersive, outcomes-driven curriculum you need to launch a career in software engineering, data science, or cybersecurity.",
          picture: "https://upload.wikimedia.org/wikipedia/commons/6/61/FS_wiki.png",
          url: "https://flatironschool.com/",
        },])
    })

    // Courses Seeds
    .then(function () {
      return knex('courses').insert([
        {
          name: "Data Science & Machine Learning",
          overview:
            "This Full-Time Immersive Data Science and Machine Learning Bootcamp is designed for students with a burning desire to compound data-science knowledge in the A.I. industry. In this 16-week immersive bootcamp, you will learn the building blocks and tools that will empower you to tackle, build and deploy machine learning projects.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://xccelerate.co/course-detail/HK/FTDS",
          institutionsID: 1,
        },
        {
          name: "Full Stack Software Engineering",
          overview:
            "Our Full-Time Immersive Software Engineering Coding Bootcamp is designed for students with a burning desire to learn the most relevant coding languages and frameworks in the software development industry.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://xccelerate.co/course-detail/HK/FTSE",
          institutionsID: 1,
        },
        {
          name: "Full Stack UX Design",
          overview:
            "In this 16-week, full time immersive full-stack UX design course, you will learn the basics of UX research and design methods through a combination of in-class practical learning and real life client projects. You will also learn to use Adobe XD and other cutting-edge collaborative tools, with which you will use to complete 2 additional live client projects.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://xccelerate.co/course-detail/HK/FTUX",
          institutionsID: 1,
        },
        {
          name: "Data Science",
          overview:
            "BrainStation’s Online Data Science Bootcamp is a full-time immersive, project-based, online learning experience, designed to transform your skill set and get a job as a Data Scientist. The program's curriculum is challenging, comprehensive, and constantly updated, ensuring you are always learning the most in-demand data analytics skills, techniques, and tools used by Data Scientists.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://brainstation.io/course/online/remote-data-science-bootcamp",
          institutionsID: 2
        },
        {
          name: "Digital Leadership & Innovation",
          overview:
            "Eliminate the confusion around the disruptive technologies that are impacting businesses around the world. Understand their capabilities and how they enable new business models to drive digital transformation. Learn design thinking and how it is used to identify and execute on innovation opportunities, regardless of industry or business.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://brainstation.io/course/online/digital-leadership",
          institutionsID: 2
        },
        {
          name: "Digital Marketing",
          overview:
            "The Online Digital Marketing Bootcamp is comprehensive and project-based, ensuring you have direct experience with digital marketing strategy, search engine optimization, search engine marketing, content development and management, social media marketing, advanced analytics and reporting, and more.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url:
            "https://brainstation.io/course/online/remote-digital-marketing-bootcamp",
          institutionsID: 2
        },
        {
          name: "Product Management",
          overview:
            "In this Product Management course, learn how to identify market opportunities and user needs, allowing you to build successful products and solutions and become a Product Manager. Create a comprehensive product launch, including defining your minimum viable product, positioning, and pricing.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://brainstation.io/course/online/product-management",
          institutionsID: 2
        },
        {
          name: "User Experience Design",
          overview:
            "The UX bootcamp’s curriculum is challenging, comprehensive, and constantly updated, ensuring you are always learning cutting-edge UX/UI design concepts, skills, and tools. Led by Educators with experience in the field, you will develop and work on a fully realized mobile app, in the process building a portfolio of completed projects to help you launch your career in UX.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url:
            "https://brainstation.io/course/online/remote-user-experience-design-bootcamp",
          institutionsID: 2
        },
        {
          name: "Web Development",
          overview:
            "The program’s curriculum is challenging, comprehensive, and constantly updated, ensuring you are always learning the most in-demand web development skills, techniques, and tools. Led by Educators with experience in the field, you will develop and work on a multi-page web application, in the process building a standout portfolio of completed projects.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url:
            "https://brainstation.io/course/online/remote-web-development-bootcamp",
          institutionsID: 2
        },
        {
          name: "Cybersecurity Analytics",
          overview:
            "Learn to hack in as little as 12 weeks. Our 480-hour immersive program is designed to help you develop the skills you need for a career as a tier 1+ SOC analyst, threat intel analyst, security consultant, and compliance analyst. Passionate people with strong critical thinking, research, and analytical skills, are a good fit for this program.",
          picture:
            "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://flatironschool.com/career-courses/cybersecurity-analytics",
          institutionsID: 3,
        },
        {
          name: "Cybersecurity Engineering",
          overview:
            "Learn the tech skills you’ll need for a new career in as little as 15 weeks. This cybersecurity course in New York City is designed for students with a technical background, helping you start a career in cybersecurity engineering and launching you into the forefront of global tech growth.",
          picture:
            "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://flatironschool.com/career-courses/cybersecurity-engineering",
          institutionsID: 3,
        },
        {
          name: "Data Science",
          overview:
            "From Python to Machine Learning, our 15-week data science training program gives you the breadth and depth needed to become a well-rounded data scientist. You’ll  also leave with an understanding of how to discover new techniques as your career progresses.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://flatironschool.com/career-courses/data-science-bootcamp",
          institutionsID: 3,
        },
        {
          name: "Software Engineering",
          overview:
            "Over 15 intense weeks on campus at Flatiron School, you’ll think and build like a software engineer. In each three-week module, you’ll develop key skills that build upon one another through interactive labs, lectures, and close collaboration — shipping code and showcasing your expertise through comprehensive Portfolio Projects.",
          picture: "https://analyticsinsight.b-cdn.net/wp-content/uploads/2020/10/Webp.net-resizeimage-2-2.jpg",
          url: "https://flatironschool.com/career-courses/coding-bootcamp",
          institutionsID: 3,
        },
      ])
    })
    // Classes Seeds
    .then(function () {
      return knex('classes').insert([
        { name: "Cohort 1", status: "Complete", startdate: "Mar 23", enddate: "Aug 04", coursesID: 1 },
        { name: "Cohort 2", status: "Complete", startdate: "Aug 17", enddate: "Dec 10", coursesID: 1 },
        { name: "Cohort 3", status: "Complete", startdate: "Jan 04", enddate: "May 01", coursesID: 1 },
        { name: "Cohort 4", status: "Complete", startdate: "May 02", enddate: "Jul 29", coursesID: 1 },
        { name: "Cohort 5", status: "Complete", startdate: "Aug 17", enddate: "Dec 10", coursesID: 1 },
        { name: "Cohort 6", status: "Complete", startdate: "Jan 17", enddate: "May 10", coursesID: 1 },
        { name: "Cohort 7", status: "Complete", startdate: "May 23", enddate: "October 04", coursesID: 1 },
        { name: "Cohort 8", status: "Complete", startdate: "Mar 23", enddate: "Aug 04", coursesID: 1 },
        { name: "Cohort 9", status: "Complete", startdate: "Aug 17", enddate: "Dec 10", coursesID: 1 },
        { name: "Cohort 10", status: "Complete", startdate: "Jan 04", enddate: "May 01", coursesID: 1 },
        { name: "Cohort 11", status: "Complete", startdate: "May 02", enddate: "Jul 29", coursesID: 1 },
        { name: "Cohort 12", status: "Complete", startdate: "Aug 17", enddate: "Dec 10", coursesID: 1 },
        { name: "Cohort 13", status: "Active", startdate: "Jan 17", enddate: "May 10", coursesID: 1 },
      ])
    })
    // Notes Seeds
    .then(function () {
      return knex('notes').insert([
        { title: "note1", type: "note", text: "This is a note", privacy: false, pinned: false, usersID: 1, classesID: 1 },
      ])
    })
    // Questions Seeds
    .then(function () {
      return knex('questions').insert([
        { title: "How do I Javascript?", text: "Lorem Ipsum", votes: 10, privacy: true, classpin: false, institutionpin: false, answered: false, usersID: 1, classesID: 1 },
        { title: "Help! I can't do the thing!", text: "Lorem Ipsum", votes: 10, privacy: true, classpin: false, institutionpin: false, answered: false, usersID: 1, classesID: 1 },
        { title: 'Oh no! Something?', text: "Lorem Ipsum", votes: 10, privacy: true, classpin: false, institutionpin: false, answered: false, usersID: 1, classesID: 1 },
      ])
    })
    // Answers Seeds
    .then(function () {
      return knex('answers').insert([
        { text: 'This is an incorrect answer', votes: 2, correct: false, usersID: 2, questionsID: 1 },
        { text: 'This is an incorrect answer', votes: 5, correct: false, usersID: 2, questionsID: 1 },
        { text: 'This is the correct answer', votes: 300, correct: true, usersID: 2, questionsID: 1 },
      ])
    })
    // Atoa Seeds
    .then(function () {
      return knex('atoa').insert([
        { text: "Test", votes: 5, usersID: 1, answersID: 1 },
        { text: "Test", votes: 5, usersID: 2, answersID: 1 },
        { text: "Test", votes: 5, usersID: 3, answersID: 1 },
        { text: "Test", votes: 5, usersID: 4, answersID: 2 },
      ])
    })
    // Admins Seeds
    .then(function () {
      return knex('admins').insert([
        { usersID: 1, institutionsID: 1 },
      ])
    })
    // Teacherscourses Seeds
    .then(function () {
      return knex('teacherscourses').insert([
        { usersID: 2, coursesID: 1 },
        { usersID: 5, coursesID: 1 },
      ])
    })
    // Teachersclasses Seeds
    .then(function () {
      return knex('teachersclasses').insert([
        { usersID: 2, classesID: 1 },
        { usersID: 5, classesID: 1 },
      ])
    })
    // studentscourses Seeds
    .then(function () {
      return knex('studentscourses').insert([
        { usersID: 3, coursesID: 1 },
        { usersID: 4, coursesID: 1 },
        { usersID: 6, coursesID: 1 },
      ])
    })
    // studentsclasses Seeds
    .then(function () {
      return knex('studentsclasses').insert([
        { usersID: 3, classesID: 1 },
        { usersID: 4, classesID: 1 },
        { usersID: 6, classesID: 1 },
      ])
    })
    // teachersinstitutions Seeds
    .then(function () {
      return knex('teachersinstitutions').insert([
        { usersID: 2, institutionsID: 1 },
        { usersID: 5, institutionsID: 1 },
      ])
    })
    // studentsinstitutions Seeds
    .then(function () {
      return knex('studentsinstitutions').insert([
        { usersID: 3, institutionsID: 1 },
        { usersID: 4, institutionsID: 1 },
        { usersID: 6, institutionsID: 1 },
      ])
    })
    // tags Seeds
    .then(function () {
      return knex('tags').insert([
        { name: 'question' },
      ])
    })
    // questionstags Seeds
    .then(function () {
      return knex('questionstags').insert([
        { questionsID: 1, tagsID: 1 },
        { questionsID: 2, tagsID: 1 },
        { questionsID: 3, tagsID: 1 },
      ])
    })

  //New Seed here


};
