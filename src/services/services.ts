export const services = [
    {
        route: "/auth",
        target: "http://localhost:3001/auth"
        // target: "http://user-microservice:3001/auth"
    },
    {
        route: "/roles",
        target: "http://localhost:3001/roles"
        // target: "http://user-microservice:3001/roles"
    },
    {
        route: "/users",
        target: "http://localhost:3001/users"
        // target: "http://user-microservice:3001/users"
    },
    {
        route: "/employee",
        target: "http://localhost:3002/employee"
        // target: "http://business-microservice:3002/employee"
    },
    {
        route: "/department",
        target: "http://localhost:3002/department"
        // target: "http://business-microservice:3002/department"
    }
]