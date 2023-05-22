## Controllers README

This README provides an overview of the controllers used in the project, explaining the input parameters, context, and the structure of the return values. It also describes the relastionship between the controllers and the routes in the application.

The controllers in this project are responsible for handling the logic and processing of incoming requests for specific routes in the application. Each controller is associated with a particular route, and it defines how the incoming data should be handled and how the response should be generated.
The routers are defined using the router code. The router maps the HTTP methods(GET, POST, PUT, DELETE) and the corresponding URL paths to the approproate controller functions. It specifies the input validation schemas for the requests and the output validation schemas for the responses.

Here is how the controllers and routes are connected:

1. The router defines the routes and maps them to the corresponding controllers. For exemple:

- The create route (POST /course-lib/create) is associated with the createCourseLib controller.
- The getMany route (GET /course-lib-getMany) is associated with the getAllCoursesLib controller.
- The getOne route (GET /course-lib/getOne/{courseLibId}) is associated with the getOneCourseLib controller.
- The updateCourseLib route(PUT /course-lib/update/{courseLibId}) is associated with the updateCourseLib controller.
- The delete route(DELETE /course-lib/delete/{courseLibId}) is associated with the deleteCourseLib controller.

2. Each controller function is responsible for handling the logic and processing of the corresponding route. It receives the input data, which is validated against the defined input validation schema. The controller uses the input data and the context(provided through the ctx parameter) to perform the necessary operations, such as creating, retrieving, updating, or deleting course_lib resources.

3. The controllers return an object that follows the structure defined in the output validation schema. The returned object that follows the structure defined in the output validation schema. The returned object inclueds information about the success or failure of the operation, the HTTP status code, a descriptive message, and the relevant course_lib resource or error information.

By understanding the relastionshipbetween the controllers and the routes, you as a developer can navigate through the codebase and undestand how the different parts of the application are connected. The input and output validation schemas should provide a clear undestanding of the expected data formats and the structure of the responses.

Here is a exemple of one of the controllers and the structure:

## Controller: `createCourseLib`

Description:
This controller is responsible for creating a new `course_lib` resource.

## Route:

- Endpoint: `POST /course-lib/create`

## Input:

- `input` (CourseLibInputSchema): An object containing the input data for creating the `course_lib` resource. It includes the following fields:
- `title`(string): The title of the `course_lib`
- `description`(string): The description of the `course_lib`
- `content`(string): The description of the `course_lib`
- `ctx`(IContext): The context of the `course_lib` object providning access to the necessary resources and services.

## Return:

The controller returns an object with the following structure:

- `success`(boolean): Indicates wheter the operation was successful.
- `code`(number): The HTTP status code for the response.
- `message`(string): A descriptive message about the result of the operation.
- `course_lib`(Course_lib): The created `course_lib` resource.

## Controller: `getOneCourseLib`

# Description

This controller retrieves a singel `course_lib` resource based on the provided `course_libId`.

# Route

- Endpoint: `GET /course-lib/getOne/{courseLibId}`
- `input` (CourseLibIdSchema): An object containing `courseLibId` used to fetch the corresponding `course_lib` resource.
- `ctx`(IContext): The contextoobject providing access to the necessary resources and services.

## Return:

The controller return an object with the following structure:

- `success`(boolean): Indicates wheter the operation was successful.
- `code`(number): The HTTP status code for the response.
- `message`(string): A descriptive message about the result of the operation.
- `course_lib`(Course_lib): The created `course_lib` resource.

## Controller: `getAllCoursesLib`

# Description

This controller retrieves all `course_lib` resources.

# Route

- Endpoint: `GET /course-lib/getMany`

## Input

- `ctx` (IContext): The context object providing access to the necessary resources and services.

## Return:

The controller return an object with the following structure:

- `success`(boolean): Indicates wheter the operation was successful.
- `code`(number): The HTTP status code for the response.
- `message`(string): A descriptive message about the result of the operation.
- `course_lib`(Course_lib): The created `course_lib` resource.

## Controller `updatedCourseLib`

# Description

This controller updates an existing `course_lib` resources based on the provided `courseLibId`.

# Route

- Endpoint: `PUT /course-lib/update/{courseLibId}`

## Input

- `input` (UpdateCourseLibInputSchema): An object containing the `courseLibId`and the updated data for the `course_lib` resource. The `body` field is an object with the following optional fields.
- `title`(string): The title of the `course_lib`
- `description`(string): The updated description of the `course_lib`
- `content`(string): The updated content of the `course_lib`
- `ctx`(IContext): The context object providing access to the necessary resources and services.

## Return:

The controller returns an object with the following structure:

- `success`(boolean): Indicates wheter the operation was successful.
- `code`(number): The HTTP status code for the response.
- `message`(string): A descriptive message about the result of the operation.
- `course_lib`(Course_lib): The created `course_lib` resource.

## Controller: `deleteCourseLib`

# Description

This controller deletes an existing `course_lib` resources based on the provided `course_lib`.

# Route

- Endpoint: `DELETE /course-lib/delete/{courseLibId}`

## Input

- `input`(CourseLibIdSchema): An object containing the `courseLibId` used to identify the `course_lib` resource to delete.
- `ctx` (IContext): The context object providing access to the necessary resources and services.

## Return:

The controller returns an object with the following structure:

- `success`(boolean): Indicates wheter the operation was successful.
- `code`(number): The HTTP status code for the response.
- `message`(string): A descriptive message about the result of the operation.
- `course_lib`(Course_lib): The created `course_lib` resource.
