<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Users_model extends CI_Model
{
	public function getUser($id = 0)
	{
		return $this->db->select('*')
			->from('table_user')
			->where('id', (int)$id)
			->get()
			->row_array();
	}

}
