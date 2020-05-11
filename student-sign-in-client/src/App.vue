<template>
  <div id="app">
  <newStudentForm v-on:student-added="newStudentAdded"></newStudentForm>

  <studentTable v-bind:students="students"
  v-on:student-present="studentArrivedOrLeft"
  v-on:delete-student="studentDeleted">
  </StudentTable>

  <studentMessage v-bind:message="message" v-bind:name="name"></studentMessage>
  </div>
</template>

<script>
import newStudentForm from './components/newStudentForm.vue'
import studentMessage from './components/studentMessage.vue'
import studentTable from './components/studentTable.vue'
export default {
  name: 'App',
  components: {
    newStudentForm,
    studentMessage,
    studentTable
  },
  
  mounted() {
    this.updateStudents()
  },
  
  data() {
    return{
      students: [],
      message:'',
      name:''
      
    }
  },
  
  methods: {
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( student => {
        this.updateStudents()
      }).cath( err => {
        let msg = err.response.data/join(', ')
        alert('Error adding student.\n' + msg)
      })
    }, 
    studentArrivedOrLeft(student) {
    this.$student_api.updateStudent(student).then( () => {
      this.message = student.present ? 'welcome,' : 'Goodbye'
      this.name = student.name
      this.updateStudents()
    })
    
  },
  studentDeleted(student) {
   this.$student_api.deleteStudent(student.id).then( () => {
     this.updateStudents()
   })
   },
   updateStudents() {
      this.$student_api.getAllStudent().then( students => {
        this.students = students
      })
  }
    
  }
}
</script>

<style>

</style>