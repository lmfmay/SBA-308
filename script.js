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

//Transform learner submission data to learnerData objects.
  for (let sub of submissions) {  
    if (!allLearners.some(el => el.id == sub.learner_id)){ //if learner doesn't exist
        learnerData.id = sub.learner_id; //create id key-value pair
        learnerData[sub.assignment_id]=sub.submission.score; //create assignment score key-value pair
        allLearners.push(learnerData); // push id and assignment score to main array
        learnerData = {}; //clear for next new learner
      } else{ 
        allLearners.forEach((learner) => { 
          if (learner.id == sub.learner_id){ //if learner id key-value already exsists
            learner[sub.assignment_id] = sub.submission.score; //create assignment score key-value in learner object
          }
        }); 
      }
  }
// for each learner, get assignment submission date
    let submissionsDateAll = []; //assignments and submission dates of all learners
    let submissionsDate = {}; //assignments and submission dates of each learner
    allLearners.forEach((learner) => { 
      submissions.forEach(submission => { //iterates through learner submissions database
        if (learner.id == submission.learner_id){ //if learner id matches submission
          submissionsDate.id = learner.id; // create id key-value in learner submission object
          submissionsDate[submission.assignment_id] = submission.submission.submitted_at; //create assignment submission date key-value in learner submission object 
        }
      })
      submissionsDateAll.push(submissionsDate); //Push submission data to array
      submissionsDate = {} //clear for next learner
    });
        

// for each assignment, get due date

    let dueDate = {}; //due dates of all assignments

// get currentDate to remove assignments that are not yet due.
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
   
    ag.assignments.forEach(element => { //for each assignment in assignment group
      dueDate[element.id] = element.due_at; //create assignment duedate key-value pair
      if (element.due_at > currentDate){ // if assignment not yet due
        allLearners.forEach(learner => { 
          delete learner[element.id]; //remove assignment property in main array for each learner
        });
      }
    });
    

// for each assignment, get points possible
    let pointsPossible = {}; // possible points of all assignements
    ag.assignments.forEach(element => {
      if (element.due_at < currentDate){ //if assignment is already due
        pointsPossible[element.id] = element.points_possible //create assignment points possible key-value pair
      }
    });

// for each learner, compare due date and submission date. if submission > due = 10% penalty
for (let i = 1; i < Object.keys(dueDate).length; i++) { //for each assignment 
  allLearners.forEach((learner) => { // pull learner id and scores for each learner 
    submissionsDateAll.forEach(submission => { // pull learner id and submission dates for each learner 
        if (submission.id == learner.id && submission[i] > dueDate[i]){ //if learner ID matches AND assignment submission date is later than due date 
          learner[i] -= (pointsPossible[i]*0.1); //deduct 10% of pointsPossible off learner score
        }
      });
    })
};


// get weighted avg for each learner
// for each learner, total scores AND possible scores for all assignments to get weighted average score.
    // e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%.
    let learnerSum = 0; //allocate memory for sum of learner scores
    let possibleSum = 0; //allocate memory for possible sum of all assignments
    allLearners.forEach((learner) => {//for each learner
      for (let points in pointsPossible){ //pull points possible for each assignment
        possibleSum += pointsPossible[points]; //add points to sum of possible points for all assignments
      }
      for (let i = 1; i < Object.keys(learner).length; i++) { //for each assignment
        learnerSum += learner[i]; //add learner assignment score to sum of learner scores
      } 
      learner.avg = learnerSum/possibleSum; //get weighted average
      learnerSum = 0; //clear for next learner
      possibleSum = 0; //clear for next learner
      })
    
// get ratio of learner scores/possible_points

  allLearners.forEach(learner => { //for each learner
    for (let i = 1; i <= Object.keys(learner).length-2; i++) { //for each assignment (length-2 to remove id and avg)
      learner[i] /= pointsPossible[i] //replace score with ratio
    }
  });

//return main array  
  return allLearners; 
}


//HELPER FUNCTIONS



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