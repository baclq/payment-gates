<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payment extends CI_Controller
{
	public function __construct() {
		parent::__construct();
	}

	public function index() {

	}

	public function choosePayment() {
		$data['title'] = 'hello world';
		$this->smarty->view('payments/choose_payment.tpl', $data);
	}

	public function paymentVNPay() {
		$orderInfo = array(
			'id' => 12345,
			'name' => 'Sản phẩm thanh toán online',
			'total' => 300000,
			'quantity' => 5,
			'user_id' => 20
		);
		$data['title'] = 'Thanh toán qua cổng VNPay';
		$data['order_info'] = $orderInfo;
		$this->smarty->view('payments/vnpay_index.tpl', $data);
	}



	public function paymentZaloPay() {
		$data['title'] = 'Thanh toán qua cổng VNPay';
		$this->smarty->view('payments/zalopay_index.tpl', $data);
	}

	public function paymentMomo() {
		$data['title'] = 'Thanh toán qua cổng VNPay';
		$this->smarty->view('payments/momo_index.tpl', $data);
	}

	public function paymentNganluong() {
		$data['title'] = 'Thanh toán qua cổng Ngân lượng';
		$this->smarty->view('payments/nganluong_index.tpl', $data);
	}
}
