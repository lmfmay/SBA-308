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

  
  //REQUIRED OUTPUT
//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);


// DEPENDENCIES

// course id in assignment group has to match id in course info. if not, throw an error.

// account for exception handling:
  // What if points_possible is 0? You cannot divide by zero.
  // What if a value that you are expecting to be a number is instead a string? 

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
        
    console.log(submissionsDateAll)

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
    
    console.log(dueDate)



// for each assignment, get points possible
    let pointsPossible = {};
    ag.assignments.forEach(element => {
      pointsPossible[element.id] = element.points_possible
    });
    console.log(pointsPossible)

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
// for each learner, total scores AND possible scores for all assignments to get weighted average score - 'avg'.
    // e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%.
    

// [
//   { '1': 47, '2': 135, '3': 400, id: 125 },
//   { '1': 39, '2': 125, id: 132 }
// ]

// get ratio of learner scores/possible_points
for (let i = 1; i < Object.keys(dueDate).length; i++) {
  allLearners.forEach(learner => {
    learner[i] /= pointsPossible[i]
});
}

return allLearners;
}
console.log(getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions))

  //const allLearners = [] //allocate memory for array of learner objects in final output
//   let learnerData = {}; //allocate memory for learner object in final output

//   let uniqueIDs = getLearnerID(LearnerSubmissions);
//   // console.log(allLearners)
  
//   getAssignmentScore(AssignmentGroup,LearnerSubmissions)
// //FUNCTIONS

//   function getLearnerID(submissions) { //get values of unique learner ids from submission data
//     let uniqueLearnerID = []; //store unique id numbers
//     for (let i of submissions) { // for each obj in submissions...
//         if (uniqueLearnerID.indexOf(i.learner_id) == -1) { //if ID value is not in uniqueLearnerID
//             uniqueLearnerID.push (i.learner_id); //get value of learner_id and push to uniqueLearnerID for subsequent comparisons
//             learnerData.id = i.learner_id; //create learner data object with id key and learner_id value
//             allLearners.push(learnerData) //push key-value pair to allLearners parent array
//             learnerData = {}; //clear learnerData object for next iteration
//         } else continue; //if ID value already in uniqueLearnerID, continue loop to search for unique ids
//     }
//     return uniqueLearnerID
//   }


//   function getAvgScore(assignments,submissions) {
// // for each learner, total scores AND possible scores for all assignments to get weighted average score - 'avg'.
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%.
//     getAssignmentScore(assignments,submissions)

//   }

//   //HELPER FUNCTIONS
//   function getAssignmentScore(assignmentGrp,submissions) {} // get score in learner submission/points_possible for each assignment
    
     
    
//     function assignmentDueDate(assignmentGrp){
//         let assignmentKey = []
//         let dueDate = []
//         for (assignment of assignmentGrp.assignments) {
//             assignmentKey.push(assignment.id); //save assignment id to array for later use
//             dueDate.push(assignment.due_at); //save duedate to array for later use
//         }
//         let dueDateobj = {}
//         for (let i = 0; i < assignmentKey.length; i++) { //create object with assignment id as keys and due date as values.
//             dueDateobj[assignmentKey[i]] = dueDate[i]; 
//         }
//         return dueDateobj
//     }
//     // console.log(assignmentDueDate(AssignmentGroup));

//     function submissionsbyLearner(uniqueIDs,submissions){       
//         //let learner = getLearnerID(submissions); //get list of unique learner IDs
//         let submissionsByID = {}; //assignments and submission dates of each learner
//         for (id of uniqueIDs){ //for each learner, create key-value of assignments:submission date
//             submissionsByID[id] = {};//create object with id value as key
//             for (submission of submissions) {
//                 if (submission.learner_id == id){ //if submission matches unique id
//                     submissionsByID[id][submission.assignment_id] = submission.submission.submitted_at; //add submission date to assignment key and add key-value pair to id key
//                 } else continue;   
//             }      
//         }
//         return submissionsByID
//     }

    // console.log(submissionsbyLearner(uniqueIDs,LearnerSubmissions));



    // function isLate (submissionsbyLearner,assignmentDueDate) {
    //     for (const key in assignmentDueDate) {
    //         if (key == )
    //     }

        // assign array to log assignment with id, due date and points keyvalue pairs.
        // for each obj, add new key value pair. obj.penalty = 'obj.points_possible*0.1
        // for each obj in submissionsbyID

            // if obj.due_at < submissionsbyID
        // if assignment due date is before submission date, minus 10% of points possible from that assignment.
    //}
// console.log(isLate(submissionsbyLearner(uniqueIDs,LearnerSubmissions),assignmentDueDate(AssignmentGroup)))
        
        
        // let submitDateobj = {}
        // for (let i = 0; i < assignmentKey.length; i++) { //create object with assignment id as keys and due date as values.
        //     submitDateobj[assignmentKey[i]] = submitDate[i]; 
        // }
        // return submitDateobj
    





// score relevant to assignment id in learner submissions has to match points_possible key in assignment object in assigment group