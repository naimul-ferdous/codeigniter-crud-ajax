$(document).ready(function () {
	listStudents();
	var table = $("#studentListing").dataTable({
		bPaginate: false,
		bInfo: false,
		bFilter: false,
		bLengthChange: false,
		pageLength: 4,
	});

	function listStudents() {
		$.ajax({
			type: "AJAX",
			url: "index.php/student/show",
			async: false,
			dataType: "json",
			success: function (data) {
				var html = "";
				var i;
				for (i = 0; i < data.length; i++) {
					html +=
						'<tr id="' +
						data[i].id +
						'">' +
						"<td>" +
						data[i].name +
						"</td>" +
						"<td>" +
						data[i].age +
						"</td>" +
						"<td>" +
						data[i].marks +
						"</td>" +
						'<td style="text-align: right">' +
						'<a href="javascript:void(0)" class="btn btn-info btn-sm editRecord" data-id="' +
						data[i].id +
						'" data-name="' +
						data[i].name +
						'" data-age="' +
						data[i].age +
						'" data-marks="' +
						data[i].marks +
						'">Edit</a>' +
						" " +
						'<a href="javascript:void(0)" class="btn btn-danger btn-sm deleteRecord" data-id="' +
						data[i].id +
						'" >Delete</a>' +
						"</td>" +
						"</tr>";
				}

				$("#listRecords").html(html);
			},
		});
	}
	// submit save form
	$("#saveStdForm").submit("click", function () {
		var stdName = $("#name").val();
		var stdAge = $("#age").val();
		var stdMarks = $("#marks").val();

		$.ajax({
			type: "POST",
			url: "index.php/student/save",
			dataType: "JSON",
			data: {
				name: stdName,
				age: stdAge,
				marks: stdMarks,
			},
			success: function (data) {
				$("#name").val("");
				$("#age").val("");
				$("#marks").val("");
				$("#addStdModal").modal("hide");
				Message.Success("save");
				listStudents();
			},
		});
		return false;
	});

	//edit form modal
	$("#listRecords").on("click", ".editRecord", function () {
		$("#editStdModal").modal("show");
		$("#stdId").val($(this).data("id"));
		$("#stdName").val($(this).data("name"));
		$("#stdAge").val($(this).data("age"));
		$("#stdMarks").val($(this).data("marks"));
	});

	//submit edit form
	$("#editStdForm").on("submit", function () {
		var stdId = $("#stdId").val();
		var stdName = $("#stdName").val();
		var stdAge = $("#stdAge").val();
		var stdMarks = $("#stdMarks").val();

		$.ajax({
			type: "POST",
			url: "index.php/student/update",
			dataType: "JSON",
			data: {
				id: stdId,
				name: stdName,
				age: stdAge,
				marks: stdMarks,
			},
			success: function (data) {
				$("#stdId").val("");
				$("#stdName").val("");
				$("#stdAge").val("");
				$("#stdMarks").val("");
				$("#editStdModal").modal("hide");
				Message.Success("update");
				listStudents();
			},
		});
		return false;
	});

	//delete form modal
	$("#listRecords").on("click", ".deleteRecord", function () {
		$("#deleteStdId").val($(this).data("id"));
		$("#deleteStdModal").modal("show");
	});

	//submit delete form modal
	$("#deleteStdForm").on("submit", function () {
		var delStdId = $("#deleteStdId").val();
		$.ajax({
			type: "POST",
			url: "index.php/student/delete",
			dataType: "JSON",
			data: {
				id: delStdId,
			},
			success: function (data) {
				$("#" + delStdId).remove();
				$("#deleteStdId").val("");
				$("#deleteStdModal").modal("hide");
				Message.Success("delete");
				listStudents();
			},
		});

		return false;
	});
});
