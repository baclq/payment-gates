<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller
{
	public function __construct() {
		parent::__construct();
	}

	public function index() {
		$this->smarty->assign('title', 'Test Smarty');
		$this->smarty->assign(array(
			'message' => 'It works!',
			'php_version' => phpversion()
		));

//		$this->smarty->display('templates/test.tpl');

//		var_dump($this->smarty);
//		exit;

//		$this->smarty->display('templates/test.tpl');


//		$this->smarty->display('templates/test.tpl');
		$this->smarty->view('test.tpl');
	}

	public function show()
	{
		$data['title'] = 'hello world';
		$this->smarty->view('example.tpl', $data);
	}


}
