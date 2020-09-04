<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller
{
	public function __construct() {
		parent::__construct();
		$this->load->model('users_model');
	}

	public function index()
	{
		$this->load->view('users/index');
	}

	public function show($id = 3)
	{
		var_dump($id);
		$user = $this->users_model->getUser($id);
		$data = array('title' => 'My Title',
			'heading' => 'My Heading',
			'user' => $user);
//		var_dump($user);
//		exit('Hiển thị $user');
		$this->load->view('users/show', $data);
	}
}
