<?php

class StudentModel extends CI_Model {

    function getStudentList() {
        $stdlist= $this->db->get('student');
        return $stdlist-> result();
    }

    function addStudent() {
        
        $data = array(
            'name' => $this->input->post('name'),
            'age' => $this->input->post('age'),
            'marks' => $this->input->post('marks'),
        );

        $result= $this->db->insert('student', $data);

        return $result;
    }

    function updateStudent() {
        $id= $this->input->post('id');
        $name= $this->input->post('name');
        $age= $this->input->post('age');
        $marks= $this->input->post('marks');

        $this->db->set('name', $name);
        $this->db->set('age', $age);
        $this->db->set('marks', $marks);

        $this->db->where('id', $id);

        $result= $this->db->update('student');

        return $result;
    }

    function deleteStudent() {
        //
        $id=$this->input->post('id');
		$this->db->where('id', $id);
		$result=$this->db->delete('student');
		return $result;
    }
}