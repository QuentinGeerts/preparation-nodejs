const studentController = require("../controllers/studentController")
const homeController = require("./../controllers/homeController")

const routes = {
  "/": (request, response) => {
    homeController.index(request, response)
  },

  "/student": (request, response) => {
    studentController.student_list(request, response)
  },

  "/student/add": (request, response) => {
    if (request.method === "GET") {
      studentController.student_create_get(request, response)
    }
    else if (request.method === "POST") {
      studentController.student_create_post(request, response)
    }
  }
}

module.exports = routes