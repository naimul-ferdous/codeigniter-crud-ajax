<?php
class Student extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model('StudentModel');
    }

    function index() {
        $this->load->view('stdList');
    }

    function show() {
        $data= $this->StudentModel->getStudentList();
        echo json_encode($data);
    }

    function save() {
        $data= $this->StudentModel->addStudent();
        echo json_encode($data);
    }

    function update() {
        $data= $this->StudentModel->updateStudent();
        echo json_encode($data);
    }

    function delete() {
        $data= $this->StudentModel->deleteStudent();
        echo json_encode($data);
    }
}