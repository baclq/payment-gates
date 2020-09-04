<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Posts_model extends CI_Model
{
	const TBL_POST = "table_baiviet";

	function __construct() {
		parent::__construct();
	}

	public function get_current_page_records($limit, $start) {
		$this->db->limit($limit, $start);
		$query = $this->db->get(self::TBL_POST);

		if ($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				$data[] = $row;
			}

			return $data;
		}

		return false;
	}

	public function get_total() {
		return $this->db->count_all(self::TBL_POST);
	}
}
