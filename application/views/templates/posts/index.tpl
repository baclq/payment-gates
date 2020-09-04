{include file="common/header.tpl"}
<div class="container">
	<div class="row">
		<div class="col-12 col-md-12">
			<h3>{$title}</h3>
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">First</th>
						<th scope="col">Last</th>
						<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Larry</td>
						<td>the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</table>
{*			{$results|@print_r}*}

			<h3>Tổng số dòng: {$total_rows}</h3>

			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên</th>
						<th scope="col">Ngày tạo</th>
						<th scope="col">Lượt xem</th>
					</tr>
				</thead>
				<tbody>
				{foreach $results as $result}
					<tr>
						<th scope="row">1</th>
						<td>{$result->ten_vi}</td>
						<td>{$result->ngaytao}</td>
						<td>{$result->luotxem}</td>
					</tr>
				{/foreach}
				<tr>
					<td>
						{$links}
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
{include file="common/footer.tpl"}
