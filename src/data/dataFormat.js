const sampleProjects = [{
        description: "This is really the best project description I could come up with",
        end: null,
        id: 1,
        missions: [],
        name: "The Best Project",
        personnel: [],
        start: null,
        user: {
            avatar_path: "https://pathtoawesomeavatar.com",
            aws_cognito_id: null,
            email: "donis@awesome.com",
            first_name: "Don",
            id: 1,
            last_name: "Awesome",
            phone_number: "123456789"
        },
        user_id: 1
    },
    {
        description: "Some more gobbeldy gook project description",
        end: null,
        id: 3,
        missions: [],
        name: "AAP2 - Another Awesome Project",
        personnel: [
            {
                id: 2,
                project_id: 3
            },
            {
                id: 1,
                project_id: 3
            }
        ],
        start: null,
        user: {
            avatar_path: "https://pathtoawesomeavatar.com",
            aws_cognito_id: null,
            email: "donis@awesome.com",
            first_name: "Don",
            id: 1,
            last_name: "Awesome",
            phone_number: "123456789"
        },
        user_id: 1
    }
]


let defaultPersonnel = 
    {
        id: 0,
        name: '',
        email: '',
        phone: '',
        description: '',
        avatar: ''
    }

let defaultSensor = 
    {
        id: 0,
        name: '',
        description: '',
        // more 
    }

let defaultUAV = 
    {
        id: 0,
        name: '',
        description: '',
        model: ''
        // more         
    }

let defaultRoles = [
    {
        id: 0,
        title: '',
        description: '',
        instructions: ''
        // other info
    }
]