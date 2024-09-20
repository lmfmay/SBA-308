// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

// MAIN PROGRAMME

console.log(getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions))

function getLearnerData(course, ag, submissions) {
  let allLearners = [];
  let learnerData = {};
// catch error if course ID in assignment group doesn't match course info.
  try {
    if(course.id !== ag.course_id){
      throw (`Assignment group does not belong to Course ID`)
    }
  } catch (error) {console.log(error)}

//Transform learner submission data to learner objects.
  for (let sub of submissions) {  
    if (!allLearners.some(el => el.id == sub.learner_id)){ //if learner doesn't exist
        learnerData.id = sub.learner_id;
        learnerData[sub.assignment_id]=sub.submission.score;
        allLearners.push(learnerData);
        learnerData = {};
      } else{ //if learner exists
        allLearners.forEach((learner) => { 
          if (learner.id == sub.learner_id){
            learner[sub.assignment_id] = sub.submission.score;
          }
        }); 
      }
  }
// for each learner, get assignment submission date
    let submissionsDateAll = []; //assignments and submission dates of all learners
    let submissionsDate = {}; //assignments and submission dates of each learner
    allLearners.forEach((learner) => { 
      submissions.forEach(submission => {
        if (learner.id == submission.learner_id){
          submissionsDate.id = learner.id;
          submissionsDate[submission.assignment_id] = submission.submission.submitted_at;
        }
      })
      submissionsDateAll.push(submissionsDate);
      submissionsDate = {}
    });
        

// for each assignment, get due date
    let dueDate = {};
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
   
    ag.assignments.forEach(element => {
      dueDate[element.id] = element.due_at;
      if (element.due_at > currentDate){
        allLearners.forEach(learner => {
          delete learner[element.id];
        });
      }
    });
    

// for each assignment, get points possible
    let pointsPossible = {};
    ag.assignments.forEach(element => {
      if (element.due_at < currentDate){
        pointsPossible[element.id] = element.points_possible
      }
    });

// for each learner, compare due date and submission date
// submission > due = penalty
// submission <= due = nothing happens

for (let i = 1; i < Object.keys(dueDate).length; i++) {
  allLearners.forEach((learner) => {
    submissionsDateAll.forEach(submission => {      
        if (submission.id == learner.id && submission[i] > dueDate[i]){
          learner[i] -= (pointsPossible[i]*0.1);
        }         
      });
    })
};


// get weighted avg for each learner
// for each learner, total scores AND possible scores for all assignments to get weighted average score.
    // e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%.
    let learnerSum = 0;
    let possibleSum = 0;
    allLearners.forEach((learner) => {
      for (let points in pointsPossible){
        possibleSum += pointsPossible[points];
      }
      for (let i = 1; i < Object.keys(learner).length; i++) {
        learnerSum += learner[i];
      } 
      learner.avg = learnerSum/possibleSum;
      learnerSum = 0;
      possibleSum = 0;
      })
    
// get ratio of learner scores/possible_points
for (let i = 1; i < Object.keys(dueDate).length; i++) {
  allLearners.forEach(learner => {
    learner[i] /= pointsPossible[i]
});
}

return allLearners;
}



//FUNCTIONS



//EXPECTED RESULTS
// const result = [
//   {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
//   }
// ];

// account for exception handling:
  // What if points_possible is 0? You cannot divide by zero.
  // What if a value that you are expecting to be a number is instead a string? 