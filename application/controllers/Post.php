<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Post extends CI_Controller
{
	public function __construct() {
		parent::__construct();
		$this->load->library('pagination');
	}

	public function index() {
		$this->load->model('Posts_model');

		// init params
		$params = array();
		$params['title'] = 'hello world';
		$limit_per_page = 10;
		$start_index = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
		$total_records = $this->Posts_model->get_total();

		if ($total_records > 0) {
			// get current page records
			$params["results"] = $this->Posts_model->get_current_page_records($limit_per_page, $start_index);

			$config['base_url'] = base_url() . 'post/index';
			$config['total_rows'] = $total_records;
			$config['per_page'] = $limit_per_page;
			$config["uri_segment"] = 3;

			$this->pagination->initialize($config);

			$params['total_rows'] = $total_records;
			// build paging links
			$params["links"] = $this->pagination->create_links();
		}

		$this->smarty->view('posts/index.tpl', $params);
	}
}
