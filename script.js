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


  const allLearners = [] //allocate memory for array of learner objects in final output
  let learnerData = {}; //allocate memory for learner object in final output

  getLearnerID(LearnerSubmissions);
  console.log(allLearners)
  
  getAssignmentScore(AssignmentGroup,LearnerSubmissions)
//FUNCTIONS

  function getLearnerID(submissions) { //get values of unique learner ids from submission data
    let uniqueLearnerID = []; //store unique id numbers
    for (let i of submissions) { // for each obj in submissions...
        if (uniqueLearnerID.indexOf(i.learner_id) == -1) { //if ID value is not in uniqueLearnerID
            uniqueLearnerID.push (i.learner_id); //get value of learner_id and push to uniqueLearnerID for subsequent comparisons
            learnerData.id = i.learner_id; //create learner data object with id key and learner_id value
            allLearners.push(learnerData) //push key-value pair to allLearners parent array
            learnerData = {}; //clear learnerData object for next iteration
        } else continue; //if ID value already in uniqueLearnerID, continue loop to search for unique ids
    }
    return uniqueLearnerID
  }


  function getAvgScore(assignments,submissions) {
// for each learner, total scores AND possible scores for all assignments to get weighted average score - 'avg'.
    // e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%.
    getAssignmentScore(assignments,submissions)

  }

  //HELPER FUNCTIONS
  function getAssignmentScore(assignmentGrp,submissions) { // get score in learner submission/points_possible for each assignment
    
     
    
    function assignmentDueDate(assignmentGrp){
        let assignmentKey = []
        let dueDate = []
        for (assignment of assignmentGrp.assignments) {
            assignmentKey.push(assignment.id); //save assignment id to array for later use
            dueDate.push(assignment.due_at); //save duedate to array for later use
        }
        let dueDateobj = {}
        for (let i = 0; i < assignmentKey.length; i++) { //create object with assignment id as keys and due date as values.
            dueDateobj[assignmentKey[i]] = dueDate[i]; 
        }
        return dueDateobj
    }

    function submissionDatebyLearner(submissions){
        // for each unique ID in unique learner id,
        //for submission of learnerSubmissions
        // if submission.learner_id == unique id
            // get assignment id, get submission date, get score. (create variables to save each value)

        
        getLearnerID(submissions) //match learner id to assignment id and submission date
        let assignmentKey = []
        let submitDate = []
        
        
        }
        for (submission of submissions) {
            assignmentKey.push(submission.assignment_id); //save assignment id to array for later use
            submitDate.push(submission.submission.submitted_at); //save submitdate to array for later use
        }
        let submitDateobj = {}
        for (let i = 0; i < assignmentKey.length; i++) { //create object with assignment id as keys and due date as values.
            submitDateobj[assignmentKey[i]] = submitDate[i]; 
        }
        return submitDateobj
    }

    console.log(submissionDate(LearnerSubmissions));


// if assignment due date is after/on submission date, add assignment id to learner data assignment scores + avg scores. else, ignore.
// if assignment due date is before submission date, minus 10% of points possible from that assignment.
// score relevant to assignment id in learner submissions has to match points_possible key in assignment object in assigment group
  