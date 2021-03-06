const router = require('express').Router()

const{
    getAllTeachers,
    createTeacher,
    updateTeacherById,
    deleteAllTeacher,
    deleteTeacherById,
    getTeacherById,
    getTeacherByUsernameAndPassword
} = require("../controllers/teachers")
const {response_generator} = require('../middleware')

router.get('/', async(req, res) => {
    const data = await getAllTeachers()
    const stat = data.status =="OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.post('/', async(req, res) => {
    const data = await createTeacher(req.body)
    const stat = data.status =="OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.delete('/', async(req, res) => {
    const data = await deleteAllTeacher()
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.get('/:teacher_id', async (req, res) => {
    const data = await getTeacherById(req.params.teacher_id)
    const stat = data.status == "OK" ? 200 : 500
    
    return response_generator(stat, data, res)
})

router.post('/username', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const message = await getTeacherByUsernameAndPassword(username, password);
    const statusCode = message.status == "OK" ? 200:500;

    return response_generator(statusCode, message, res);
})

router.put('/:teacher_id', async (req, res) => {
    const data = await updateTeacherById(req.params.teacher_id, req.body)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

router.delete('/:teacher_id', async (req, res) => {
    const data = await deleteTeacherById(req.params.teacher_id)
    const stat = data.status == "OK" ? 200 : 500

    return response_generator(stat, data, res)
})

module.exports = router