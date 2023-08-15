
/* ----------------------------Utility Types---------------------------------- */

/* ----------------------------Partial---------------------------------- */

interface Assignment {
    studentId: string;
    title: string;
    grade: number;
    verified?: boolean;
}



const updateAssignment = (assign: Assignment, propsToUpdate:
    Partial<Assignment>): Assignment => {
    return { ...assign, ...propsToUpdate }
}

const assign1: Assignment = {
    studentId: "com1234",
    title: "Final Project",
    grade: 0
}

//console.log(updateAssignment(assign1, { grade: 95 }))
const assignGraded: Assignment = updateAssignment(assign1, { grade: 15, title: "eng" })
console.log(assignGraded)


/* ----------------------------Required and Readonly---------------------------------- */

const recordAssignment = (assign: Required<Assignment>): Assignment => {
    //send to database, etc.
    return assign
}

const assignVerified: Readonly<Assignment> = {
    ...assignGraded, verified: true
}

recordAssignment({ ...assignGraded, verified: true })

/* ----------------------------Record---------------------------------- */

const hexColorMap: Record<string, string> = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
}

interface Grades {
    assign1: number,
    assign2: number
}

type Students = "Sara" | "Kim"
type LetterGrades = "A" | "B" | "C" | "D" | "F"



const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kim: "A"
}

const gradeData: Record<Students, Grades> = {
    Sara: {
        assign1: 85,
        assign2: 96
    },
    Kim: {
        assign1: 43,
        assign2: 78
    }
}

/* ---------------------------- Pick add Omit ---------------------------------- */

type AssignResult = Pick<Assignment, "studentId" | "grade">

const score: AssignResult = {
    studentId: "k1234",
    grade: 85
}

type AssignPreview = Omit<Assignment, "grade" | "verified">

const preview: AssignPreview = {
    studentId: "k1234",
    title: "Final Project"
}


/* ---------------------------- ExcludE and Extract ---------------------------------- */

// adjustedGrade is defined using the Exclude utility type. It creates a new type that includes all letter grades except for "F".
type adjustedGrade = Exclude<LetterGrades, "F">

//highGrades is defined using the Extract utility type. It creates a new type that includes only the letter grades "A" and "B".
type highGrades = Extract<LetterGrades, "A" | "B">

/* ---------------------------- NonNullable ---------------------------------- */

type AllPossibleGrades = "May" | "Jon" | null | undefined

type NameOnly = NonNullable<AllPossibleGrades>

/* ---------------------------- ReturnType ---------------------------------- */

//type newAssign = { title: string, points: number }

const createNewAssign = (title: string, points: number) => {
    return {
        title,
        points
    }
}

type NewAssign = ReturnType<typeof createNewAssign>

const tsAssign: NewAssign = createNewAssign("Utility Types", 100)
console.log(tsAssign)

/* ---------------------------- Parameters ---------------------------------- */

type AssignParams = Parameters<typeof createNewAssign>

const assignArgs: AssignParams = ["generics", 100]

const tsAssign2: NewAssign = createNewAssign(...assignArgs)
console.log(tsAssign2)


/* ---------------------------- Awaited - helps us with the ReturnType of a Promise  ---------------------------------- */

interface User {
    id: number,
    name: string,
    username: string,
    email: string
}

const fetchUsers = async (): Promise<User[]> => {
    const data = await fetch(
        'https://jsonplaceholder.typicode.com/users'
    ).then(res => {
        return res.json()
    }).catch(err => {
        if (err instanceof Error) console.log(err.message)
    })
    return data
}

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>

fetchUsers().then(user => console.log(user))