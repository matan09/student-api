import axios from 'axios'
import { response } from 'express'
const base_url = '/api/students'

export default {

    getAllStudent(){
        return axios.get(base_url).then( response => {
            return response.data
        })
    },

    addStudent(student) {
        return axios.post(base_url, student).then( response => {
            return response.data
        })
    },

    updateStudent(student) {
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data 
        })
    },
    deleteStudent(student) {
        return axios.delete(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    }
}